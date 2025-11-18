import { useState } from 'react';
import './App.css';

const basicKeypad = [
  'AC',
  '±',
  '%',
  '/',
  '7',
  '8',
  '9',
  '*',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '0',
  '.',
  '=',
];

const scientificKeypad = [
  // Row 1: Trigonometric functions
  'sin',
  'cos',
  'tan',
  '/',
  // Row 2: Inverse trigonometric
  'asin',
  'acos',
  'atan',
  '*',
  // Row 3: Logarithms and powers
  'log',
  'ln',
  'x²',
  '-',
  // Row 4: Roots and exponentials
  '√',
  'x^y',
  'e^x',
  '+',
  // Row 5: Constants and factorial
  '10^x',
  'π',
  'e',
  '!',
  // Row 6: Clear and utility
  'AC',
  '±',
  '%',
  '7',
  // Row 7: Number pad
  '8',
  '9',
  '4',
  '5',
  // Row 8: Number pad
  '6',
  '1',
  '2',
  '3',
  // Row 9: Bottom row
  '0',
  '.',
  '=',
];

const operatorKeys = new Set(['/', '*', '-', '+', 'x^y']);
const utilityKeys = new Set(['AC', '±', '%']);
const scientificKeys = new Set([
  'sin',
  'cos',
  'tan',
  'asin',
  'acos',
  'atan',
  'log',
  'ln',
  'x²',
  '√',
  'e^x',
  '10^x',
  'π',
  'e',
  '!',
]);

const formatResult = (value) => {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const result = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');

  return result.length > 12 ? Number(value.toPrecision(9)).toString() : result;
};

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(true);
  const [scientificMode, setScientificMode] = useState(false);

  const clearAll = () => {
    setDisplayValue('0');
    setStoredValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const inputDigit = (digit) => {
    if (displayValue === 'Error' || overwrite) {
      setDisplayValue(digit);
      setOverwrite(false);
      return;
    }

    if (displayValue === '0') {
      setDisplayValue(digit);
      return;
    }

    if (displayValue.length >= 12) {
      return;
    }

    setDisplayValue((prev) => prev + digit);
  };

  const inputDecimal = () => {
    if (displayValue === 'Error' || overwrite) {
      setDisplayValue('0.');
      setOverwrite(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue((prev) => `${prev}.`);
    }
  };

  const toggleSign = () => {
    if (displayValue === 'Error') {
      return;
    }

    setDisplayValue((prev) => {
      if (prev === '0') {
        return prev;
      }
      return prev.startsWith('-') ? prev.slice(1) : `-${prev}`;
    });
  };

  const applyPercent = () => {
    if (displayValue === 'Error') {
      return;
    }

    const value = parseFloat(displayValue);
    if (Number.isNaN(value)) {
      return;
    }

    const result = value / 100;
    setDisplayValue(formatResult(result));
    setOverwrite(true);
  };

  const factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const applyScientificFunction = (func) => {
    if (displayValue === 'Error') {
      return;
    }

    const value = parseFloat(displayValue);
    if (Number.isNaN(value)) {
      return;
    }

    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(value * (Math.PI / 180)); // Convert to radians
        break;
      case 'cos':
        result = Math.cos(value * (Math.PI / 180));
        break;
      case 'tan':
        result = Math.tan(value * (Math.PI / 180));
        break;
      case 'asin':
        if (value < -1 || value > 1) {
          result = NaN;
        } else {
          result = Math.asin(value) * (180 / Math.PI); // Convert to degrees
        }
        break;
      case 'acos':
        if (value < -1 || value > 1) {
          result = NaN;
        } else {
          result = Math.acos(value) * (180 / Math.PI);
        }
        break;
      case 'atan':
        result = Math.atan(value) * (180 / Math.PI);
        break;
      case 'log':
        if (value <= 0) {
          result = NaN;
        } else {
          result = Math.log10(value);
        }
        break;
      case 'ln':
        if (value <= 0) {
          result = NaN;
        } else {
          result = Math.log(value);
        }
        break;
      case 'x²':
        result = value * value;
        break;
      case '√':
        if (value < 0) {
          result = NaN;
        } else {
          result = Math.sqrt(value);
        }
        break;
      case 'e^x':
        result = Math.exp(value);
        break;
      case '10^x':
        result = Math.pow(10, value);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '!':
        result = factorial(Math.abs(Math.floor(value)));
        break;
      default:
        return;
    }

    setDisplayValue(formatResult(result));
    setOverwrite(true);
  };

  const performCalculation = (nextValue) => {
    if (operator === null || storedValue === null) {
      return nextValue;
    }

    switch (operator) {
      case '+':
        return storedValue + nextValue;
      case '-':
        return storedValue - nextValue;
      case '*':
        return storedValue * nextValue;
      case '/':
        return nextValue === 0 ? NaN : storedValue / nextValue;
      case 'x^y':
        return Math.pow(storedValue, nextValue);
      default:
        return nextValue;
    }
  };

  const selectOperator = (nextOperator) => {
    if (displayValue === 'Error') {
      return;
    }

    const currentValue = parseFloat(displayValue);
    if (storedValue !== null && !overwrite) {
      const result = performCalculation(currentValue);
      const formatted = formatResult(result);
      setDisplayValue(formatted);
      setStoredValue(Number.isFinite(result) ? result : null);
      setOperator(Number.isFinite(result) ? nextOperator : null);
      setOverwrite(true);
      return;
    }

    setStoredValue(currentValue);
    setOperator(nextOperator);
    setOverwrite(true);
  };

  const evaluate = () => {
    if (displayValue === 'Error' || operator === null || storedValue === null) {
      return;
    }

    const currentValue = parseFloat(displayValue);
    const result = performCalculation(currentValue);
    const formatted = formatResult(result);
    setDisplayValue(formatted);
    setStoredValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleButtonPress = (label) => {
    if (/\d/.test(label)) {
      inputDigit(label);
      return;
    }

    // Handle constants (π and e)
    if (label === 'π' || label === 'e') {
      applyScientificFunction(label);
      return;
    }

    // Handle scientific functions
    if (scientificKeys.has(label)) {
      applyScientificFunction(label);
      return;
    }

    switch (label) {
      case '.':
        inputDecimal();
        break;
      case 'AC':
        clearAll();
        break;
      case '±':
        toggleSign();
        break;
      case '%':
        applyPercent();
        break;
      case '=':
        evaluate();
        break;
      default:
        selectOperator(label);
    }
  };

  const currentKeypad = scientificMode ? scientificKeypad : basicKeypad;

  return (
    <div className="app-shell">
      <main className={`calculator ${scientificMode ? 'scientific' : ''}`} role="application" aria-label={scientificMode ? 'Scientific calculator' : 'Simple calculator'}>
        <div className="calculator-header">
          <button
            type="button"
            className={`mode-toggle ${scientificMode ? 'active' : ''}`}
            onClick={() => setScientificMode(!scientificMode)}
            aria-label={scientificMode ? 'Switch to basic mode' : 'Switch to scientific mode'}
          >
            {scientificMode ? 'Basic' : 'Scientific'}
          </button>
        </div>
        <div className="display" aria-live="polite" data-testid="display">
          {displayValue}
        </div>
        <div className="keypad">
          {currentKeypad.map((label, index) => {
            const type = operatorKeys.has(label)
              ? 'operator'
              : utilityKeys.has(label)
              ? 'utility'
              : scientificKeys.has(label)
              ? 'scientific'
              : label === '='
              ? 'equals'
              : 'digit';

            return (
              <button
                key={`${label}-${index}`}
                type="button"
                className={`key key-${type} ${label === '0' ? 'key-wide' : ''}`}
                onClick={() => handleButtonPress(label)}
                aria-label={`Button ${label}`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="helper-text">
          {scientificMode
            ? 'Scientific mode: Use trigonometric, logarithmic, and power functions.'
            : 'Use the keypad or your mouse to calculate quickly.'}
        </p>
      </main>
    </div>
  );
}

export default App;

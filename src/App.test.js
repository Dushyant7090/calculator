import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const clickButton = (label) => {
  fireEvent.click(screen.getByRole('button', { name: `Button ${label}` }));
};

test('performs a basic calculation', () => {
  render(<App />);
  const display = screen.getByTestId('display');

  clickButton('7');
  clickButton('+');
  clickButton('3');
  clickButton('=');

  expect(display).toHaveTextContent('10');
});

test('clears the display back to zero', () => {
  render(<App />);
  clickButton('9');
  clickButton('AC');

  expect(screen.getByTestId('display')).toHaveTextContent('0');
});

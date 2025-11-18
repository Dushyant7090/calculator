# Calculator App

A modern, feature-rich calculator application built with React and JavaScript. This calculator supports both basic arithmetic operations and advanced scientific calculations.

![Calculator App](https://img.shields.io/badge/React-19.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Basic Calculator Mode
- ✅ Basic arithmetic operations (addition, subtraction, multiplication, division)
- ✅ Decimal number support
- ✅ Percentage calculations
- ✅ Sign toggle (±)
- ✅ Clear function (AC)
- ✅ Error handling for invalid operations

### Scientific Calculator Mode
- ✅ **Trigonometric Functions**: sin, cos, tan (degrees)
- ✅ **Inverse Trigonometric**: asin, acos, atan (returns degrees)
- ✅ **Logarithmic Functions**: log (base 10), ln (natural log)
- ✅ **Power Functions**: x² (square), x^y (power), √ (square root)
- ✅ **Exponential Functions**: e^x, 10^x
- ✅ **Constants**: π (pi), e (Euler's number)
- ✅ **Factorial**: ! (for integers up to 170)

## Screenshots

### Basic Mode
The calculator starts in basic mode with standard arithmetic operations.

### Scientific Mode
Click the "Scientific" button to access advanced mathematical functions.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dushyant7090/calculator.git
cd calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode with hot-reloading.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run preview`
Preview the production build locally.

## Usage

### Basic Operations
1. Enter a number
2. Select an operator (+, -, *, /)
3. Enter the second number
4. Press `=` to get the result

### Scientific Functions
1. Click the "Scientific" button to switch modes
2. Enter a number
3. Click a scientific function button (e.g., sin, cos, log)
4. The result is displayed immediately

### Power Operation (x^y)
1. Enter the base number
2. Click `x^y`
3. Enter the exponent
4. Press `=` to calculate

## Project Structure

```
calculator/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main calculator component
│   ├── App.css         # Calculator styles
│   ├── App.test.js     # Unit tests
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Technologies Used

- **React** 19.2.0 - UI library
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with modern features
- **Create React App** - Build tooling

## Features in Detail

### Error Handling
- Division by zero shows "Error"
- Invalid inputs for functions (e.g., log of negative number) show "Error"
- Square root of negative numbers shows "Error"

### Number Formatting
- Results are formatted to remove trailing zeros
- Large numbers are displayed in scientific notation when needed
- Maximum display length: 12 characters

### Responsive Design
- Works on desktop and mobile devices
- Modern, dark-themed UI
- Smooth animations and transitions

## Testing

Run the test suite:
```bash
npm test
```

Current test coverage includes:
- Basic arithmetic operations
- Clear functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Dushyant7090**

- GitHub: [@Dushyant7090](https://github.com/Dushyant7090)

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons and styling inspired by modern calculator designs

---

⭐ If you find this project helpful, please consider giving it a star!

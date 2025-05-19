# Calculator Project

This project implements a simple web-based calculator with a display and a numeric keypad. The calculator is built using React and demonstrates various front-end development concepts, including state management with a custom hook, component composition, testing with Jest and React Testing Library, and component documentation with Storybook.

## Features Implemented:

*   **Basic Arithmetic Operations:** Supports Addition (+), Subtraction (-), Multiplication (*), and Division (÷).
*   **Input Handling:**
    *   Numbers pressed on the keypad are displayed and concatenated on the screen.
    *   Pressing an operation key stores the current number and operation, clearing the display for the next input.
    *   Subsequent operation presses calculate and display the intermediate result before setting the new operation.
    *   The Equality (=) button calculates and displays the final result.
*   **Special Functions:**
    *   **Decimal Point (.):** Allows for floating-point number input and calculations.
    *   **Toggle Sign (+/-):** Converts the current number on the display between positive and negative.
    *   **Delete (DEL):** Removes the last digit from the current number.
    *   **All Clear (AC):** Resets the calculator state, clearing the display and any stored values.
*   **Display Constraints & Error Handling:**
    *   Limits the display to a maximum of 9 characters (including decimal point and negative sign).
    *   Displays "ERROR" for negative results.
    *   Displays "ERROR" for results greater than 999,999,999.
    *   Displays "ERROR" for division by zero.
*   **Technical Implementation Details:**
    *   Logic is managed using a custom React hook (`useCalculator`).
    *   Component files are kept concise, each not exceeding 20 lines of code.
    *   Includes comprehensive unit tests covering various scenarios, runnable via `npm run test`.
    *   Provides component documentation and isolated development environments using Storybook, runnable via `npm run storybook`.
    *   Adheres to standard JavaScript practices with a custom ESLint rule prohibiting semicolons.
    *   Includes a lint script (`npm run lint`) to verify code style compliance across all JS and JSX files.

## Getting Started

Follow these instructions to set up and run the Calculator proyect:

### Development Environment
1. Clone the repository:
   ```bash
   git clone https://github.com/GerardoFdez7/Calculator-Proy1.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Production Environment

To run the application in production mode:

```bash
npm run build
npm run start
```

### Testing
To run the unit tests:
```bash
npm run test
```

### Component Documentation

To explore our component library and documentation:

```bash
npm run storybook
```

> [!NOTE]
> Storybook provides an isolated environment to develop and test UI components.


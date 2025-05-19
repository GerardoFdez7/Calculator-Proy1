import React from 'react'
import './App.css'
import Display from './components/Display'
import ButtonPanel from './components/ButtonPanel' // Import ButtonPanel
import useCalculator from './hooks/useCalculator'

function App() {
  const {
    currentOperand,
    previousOperand,
    operation,
    handleButtonClick,
  } = useCalculator()

  return (
    <>
    <div className="calculator-grid">
      <Display
        previousOperand={previousOperand}
        currentOperand={currentOperand}
        operation={operation}
      />
      <ButtonPanel onButtonClick={handleButtonClick} />
    </div>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          <a href="https://github.com/GerardoFdez7/Calculator-Proy1.git" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </>
  )
}

export default App

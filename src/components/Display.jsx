import React from 'react'
import './Display.css'

const Display = ({ previousOperand, currentOperand, operation }) => {
  return (
    <div className="output">
      <div data-testid="previous-operand" className="previous-operand">
        {previousOperand} {operation}
      </div>
      <div data-testid="current-operand" className="current-operand">
        {currentOperand}
      </div>
    </div>
  )
}

export default Display
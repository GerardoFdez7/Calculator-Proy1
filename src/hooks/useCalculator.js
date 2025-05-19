import { useState } from "react"

const MAX_DIGITS = 9

const useCalculator = () => {
  const [currentOperand, setCurrentOperand] = useState("")
  const [previousOperand, setPreviousOperand] = useState("")
  const [operation, setOperation] = useState(null)
  const [overwrite, setOverwrite] = useState(false)

  const formatOperand = (operand) => {
    if (operand === "ERROR") return "ERROR"
    if (operand === "") return ""
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return integer
    return `${integer}.${decimal}`
  }

  const evaluate = () => {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        if (current === 0) return "ERROR"
        computation = prev / current
        break
      default:
        return currentOperand
    }

    const resultString = computation.toString()

    if (computation < 0) return "ERROR"
    if (resultString.replace("-", "").length > MAX_DIGITS) return "ERROR"
    if (computation > 999999999) return "ERROR"

    // Handle precision for decimals, ensuring total length doesn't exceed MAX_DIGITS
    if (resultString.includes(".")) {
      const [intPart, decPart] = resultString.split(".")
      if (intPart.length >= MAX_DIGITS) return "ERROR"
      const availableDecimalPlaces = MAX_DIGITS - intPart.length - 1
      if (availableDecimalPlaces < 0) return intPart.slice(0, MAX_DIGITS)
      return `${intPart}.${decPart.slice(0, availableDecimalPlaces)}`
    }

    return resultString
  }

  const addDigit = (digit) => {
    if (overwrite) {
      setCurrentOperand(digit === "." ? "0." : digit)
      setOverwrite(false)
      return
    }

    if (currentOperand === "ERROR") {
      setCurrentOperand(digit === "." ? "0." : digit)
      return
    }

    if (digit === "." && currentOperand.includes(".")) return

    if (
      digit !== "." &&
      currentOperand.replace("-", "").replace(".", "").length >= MAX_DIGITS
    ) {
      return
    }

    if (currentOperand === "0" && digit === "0") return
    if (currentOperand === "0" && digit !== ".") {
      setCurrentOperand(digit)
      return
    }
    if (currentOperand === "-0" && digit === "0") return
    if (currentOperand === "-0" && digit !== "." && digit !== ".") {
      // "-0" + "5" -> "-5"
      setCurrentOperand(`-${digit}`)
      return
    }

    if (digit === ".") {
      if (currentOperand === "") {
        setCurrentOperand("0.")
        return
      }
      if (currentOperand === "-") {
        setCurrentOperand("-0.")
        return
      }
    }
    setCurrentOperand(`${currentOperand}${digit}`)
  }

  const chooseOperation = (selectedOperation) => {
    if (currentOperand === "ERROR" && selectedOperation !== "-") return 

    if (currentOperand === "" && previousOperand === "") {
      if (selectedOperation === "-") {
        setCurrentOperand("-")
        setOperation(null)
        setOverwrite(false)
        return
      }
      return
    }

    if (
      currentOperand === "" &&
      selectedOperation === "-" &&
      operation !== null
    ) {
      setCurrentOperand("-")
      setOverwrite(false)
      return
    }

    if (currentOperand === "" && operation !== null && currentOperand !== "-") {
      setOperation(selectedOperation)
      return
    }

    if (previousOperand !== "") {
      const result = evaluate()
      if (result === "ERROR") {
        setCurrentOperand("ERROR")
        setPreviousOperand("")
        setOperation(null)
        setOverwrite(true)
        return
      }
      setPreviousOperand(result)
    } else {
      if (currentOperand !== "-" && currentOperand !== "") {
        setPreviousOperand(currentOperand)
      } else if (
        currentOperand === "" &&
        previousOperand === "" &&
        selectedOperation !== "-"
      ) {
        return
      }
    }

    setOperation(selectedOperation)
    setCurrentOperand(
      currentOperand === "-" && previousOperand === currentOperand ? "-" : ""
    )
    setOverwrite(false)
  }

  const clear = () => {
    setCurrentOperand("")
    setPreviousOperand("")
    setOperation(null)
    setOverwrite(false)
  }

  const deleteDigit = () => {
    if (overwrite) {
      setCurrentOperand("")
      setOverwrite(false)
      return
    }
    if (currentOperand === "ERROR") {
      clear()
      return
    }
    if (currentOperand === "") return
    setCurrentOperand(currentOperand.slice(0, -1))
  }

  const calculate = () => {
    if (
      operation == null ||
      previousOperand === "" ||
      currentOperand === "" ||
      currentOperand === "-"
    ) {
      return
    }
    if (currentOperand === "ERROR" || previousOperand === "ERROR") {
      setCurrentOperand("ERROR")
      setPreviousOperand("")
      setOperation(null)
      setOverwrite(true)
      return
    }

    const result = evaluate()
    setPreviousOperand("")
    setCurrentOperand(result)
    setOperation(null)
    setOverwrite(true)
  }

  const toggleSign = () => {
    if (currentOperand === "ERROR" || currentOperand === "") return
    if (currentOperand.startsWith("-")) {
      setCurrentOperand(currentOperand.substring(1))
    } else {
      if (currentOperand.length < MAX_DIGITS) {
        setCurrentOperand(`-${currentOperand}`)
      }
    }
  }

  const handleButtonClick = (label) => {
    if (
      currentOperand === "ERROR" &&
      ![
        "AC",
        "DEL",
        ".",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ].includes(label)
    ) {
      return
    }

    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(label)
    ) {
      addDigit(label)
    } else if (["+", "-", "*", "÷"].includes(label)) {
      chooseOperation(label)
    } else if (label === "=") {
      calculate()
    } else if (label === "AC") {
      clear()
    } else if (label === "DEL") {
      deleteDigit()
    } else if (label === "+/-") {
      toggleSign()
    }
  }

  return {
    currentOperand: formatOperand(currentOperand),
    previousOperand: formatOperand(previousOperand),
    operation,
    addDigit,
    chooseOperation,
    clear,
    deleteDigit,
    calculate,
    toggleSign,
    handleButtonClick,
  }
}

export default useCalculator

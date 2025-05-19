/* eslint-disable */
import { renderHook, act } from "@testing-library/react"
import useCalculator from "./useCalculator"

describe("useCalculator", () => {
  // Helper to simulate button clicks via handleButtonClick
  const clickButtons = (result, labels) => {
    labels.forEach((label) => {
      act(() => result.current.handleButtonClick(label))
    })
  }
  it("should add digits correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "2"])
    expect(result.current.currentOperand).toBe("12")
  })

  it("should perform addition correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["5", "+", "3", "="])
    expect(result.current.currentOperand).toBe("8")
  })

  it("should perform subtraction correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "0", "-", "3", "="])
    expect(result.current.currentOperand).toBe("7")
  })

  it("should perform multiplication correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["7", "*", "6", "="])
    expect(result.current.currentOperand).toBe("42")
  })

  it("should perform division correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["8", "÷", "4", "="])
    expect(result.current.currentOperand).toBe("2")
  })

  it("should handle division by zero", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["9", "÷", "0", "="])
    expect(result.current.currentOperand).toBe("ERROR")
  })

  it("should clear the display", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "2", "3", "+", "4", "5", "6", "AC"])
    expect(result.current.currentOperand).toBe("")
    expect(result.current.previousOperand).toBe("")
    expect(result.current.operation).toBe(null)
  })

  it("should not exceed max digits (9 numeric characters)", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "2", "3", "4", "5", "6", "7", "8", "9"])
    expect(result.current.currentOperand).toBe("123456789")
    clickButtons(result, ["0"]) // 10th digit
    expect(result.current.currentOperand).toBe("123456789")
    clickButtons(result, [
      "AC",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      ".",
      "9",
    ])
    expect(result.current.currentOperand).toBe("12345678.9")
    clickButtons(result, ["0"]) // 9 digits + dot + 1 digit = 10 numeric chars effectively
    expect(result.current.currentOperand).toBe("12345678.9") // Should not add
  })

  it("should allow inputting 9 digits then a decimal point", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."])
    expect(result.current.currentOperand).toBe("123456789.")
    clickButtons(result, ["1"]) // Try to add digit after 9 digits and a dot
    expect(result.current.currentOperand).toBe("123456789.") // Should not add
  })

  it("should display ERROR for negative results", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["3", "-", "5", "="])
    expect(result.current.currentOperand).toBe("ERROR")
  })

  it("should display ERROR for results > 999999999", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, [
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "+",
      "1",
      "=",
    ])
    expect(result.current.currentOperand).toBe("ERROR")
  })

  it("should handle decimal points correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", ".", "2"])
    expect(result.current.currentOperand).toBe("1.2")
    clickButtons(result, ["."]) // Second decimal point
    expect(result.current.currentOperand).toBe("1.2") // Should ignore second decimal

    clickButtons(result, ["AC", "."]) // Start with decimal
    expect(result.current.currentOperand).toBe("0.")
    clickButtons(result, ["5"])
    expect(result.current.currentOperand).toBe("0.5")
  })

  it("should toggle sign correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["5", "+/-"])
    expect(result.current.currentOperand).toBe("-5")
    clickButtons(result, ["+/-"])
    expect(result.current.currentOperand).toBe("5")
    clickButtons(result, ["AC", "-", "5", "+/-"]) // Toggle sign of negative number input
    expect(result.current.currentOperand).toBe("5")
  })

  it("should handle DEL operation correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "2", "3", "DEL"])
    expect(result.current.currentOperand).toBe("12")
    clickButtons(result, ["DEL"])
    expect(result.current.currentOperand).toBe("1")
    clickButtons(result, ["DEL"])
    expect(result.current.currentOperand).toBe("")
    clickButtons(result, ["DEL"]) // Delete on empty
    expect(result.current.currentOperand).toBe("")
  })

  it("should handle operations in sequence", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["2", "+", "3", "*"]) // Should calculate 2+3=5, then set 5 as prev
    expect(result.current.previousOperand).toBe("5")
    expect(result.current.currentOperand).toBe("")
    expect(result.current.operation).toBe("*")
    clickButtons(result, ["4", "="])
    expect(result.current.currentOperand).toBe("20")
  })

  it("should start new calculation after equals", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "+", "2", "="]) // 3
    expect(result.current.currentOperand).toBe("3")
    clickButtons(result, ["4"]) // Start new number
    expect(result.current.currentOperand).toBe("4")
    expect(result.current.previousOperand).toBe("")
    expect(result.current.operation).toBe(null)
  })

  it("should use result as first operand if operator pressed after equals", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "+", "2", "="]) // 3
    expect(result.current.currentOperand).toBe("3")
    clickButtons(result, ["*"]) // Use 3 as previousOperand
    expect(result.current.previousOperand).toBe("3")
    expect(result.current.operation).toBe("*")
    expect(result.current.currentOperand).toBe("")
    clickButtons(result, ["5", "="])
    expect(result.current.currentOperand).toBe("15")
  })

  it("should handle starting input with '-' for negative numbers", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["-"])
    expect(result.current.currentOperand).toBe("-")
    clickButtons(result, ["5"])
    expect(result.current.currentOperand).toBe("-5")
    clickButtons(result, ["+", "2", "="])
    expect(result.current.currentOperand).toBe("-3") // -5 + 2 = -3 (ERROR due to negative result)
    expect(result.current.currentOperand).toBe("ERROR")
  })

  it("should handle starting input with '-' then an operation", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["-", "5", "-"]) // -5 is previous, op is -
    expect(result.current.previousOperand).toBe("-5")
    expect(result.current.operation).toBe("-")
    expect(result.current.currentOperand).toBe("")
    clickButtons(result, ["2", "="]) // -5 - 2 = -7 (ERROR)
    expect(result.current.currentOperand).toBe("ERROR")
  })

  describe("ERROR state handling", () => {
    it("pressing number after ERROR should start new number", () => {
      const { result } = renderHook(() => useCalculator())
      clickButtons(result, ["1", "÷", "0", "="]) // ERROR
      expect(result.current.currentOperand).toBe("ERROR")
      clickButtons(result, ["5"])
      expect(result.current.currentOperand).toBe("5")
      expect(result.current.previousOperand).toBe("")
      expect(result.current.operation).toBe(null)
    })

    it("pressing '.' after ERROR should start new number with '0.'", () => {
      const { result } = renderHook(() => useCalculator())
      clickButtons(result, ["1", "÷", "0", "="]) // ERROR
      expect(result.current.currentOperand).toBe("ERROR")
      clickButtons(result, ["."])
      expect(result.current.currentOperand).toBe("0.")
    })

    it("pressing 'AC' after ERROR should clear", () => {
      const { result } = renderHook(() => useCalculator())
      clickButtons(result, ["1", "÷", "0", "="]) // ERROR
      clickButtons(result, ["AC"])
      expect(result.current.currentOperand).toBe("")
      expect(result.current.previousOperand).toBe("")
      expect(result.current.operation).toBe(null)
    })

    it("pressing 'DEL' after ERROR should clear", () => {
      const { result } = renderHook(() => useCalculator())
      clickButtons(result, ["1", "÷", "0", "="]) // ERROR
      clickButtons(result, ["DEL"])
      expect(result.current.currentOperand).toBe("")
      expect(result.current.previousOperand).toBe("")
      expect(result.current.operation).toBe(null)
    })

    it("most operators should do nothing after ERROR (except if it's '-' to start a new negative number)", () => {
      const { result } = renderHook(() => useCalculator())
      clickButtons(result, ["1", "÷", "0", "="]) // ERROR
      expect(result.current.currentOperand).toBe("ERROR")
      clickButtons(result, ["+"])
      expect(result.current.currentOperand).toBe("ERROR") // No change
      clickButtons(result, ["*"])
      expect(result.current.currentOperand).toBe("ERROR") // No change
      clickButtons(result, ["÷"])
      expect(result.current.currentOperand).toBe("ERROR") // No change
      clickButtons(result, ["="])
      expect(result.current.currentOperand).toBe("ERROR") // No change
      clickButtons(result, ["+/-"])
      expect(result.current.currentOperand).toBe("ERROR") // No change

      // However, pressing '-' after error should allow starting a new negative number
      clickButtons(result, ["-"])
      expect(result.current.currentOperand).toBe("-")
      expect(result.current.previousOperand).toBe("")
      expect(result.current.operation).toBe(null)
    })
  })

  it("should correctly handle multiple operations before equals", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, [
      "1",
      "0",
      "+",
      "5",
      "-",
      "3",
      "*",
      "2",
      "÷",
      "4",
      "=",
    ]) // (10+5-3)*2/4 = 12*2/4 = 24/4 = 6
    expect(result.current.currentOperand).toBe("6")
  })

  it("should handle leading zeros correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["0", "0", "0"])
    expect(result.current.currentOperand).toBe("0")
    clickButtons(result, ["5"])
    expect(result.current.currentOperand).toBe("5") // Replaces leading 0
    clickButtons(result, ["AC", "0", ".", "5"])
    expect(result.current.currentOperand).toBe("0.5")
  })

  it("should handle negative number input correctly", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["-"])
    expect(result.current.currentOperand).toBe("-")
    clickButtons(result, ["5"])
    expect(result.current.currentOperand).toBe("-5")
    clickButtons(result, ["AC", "5", "+/-"])
    expect(result.current.currentOperand).toBe("-5")
  })

  it("should handle calculation with negative numbers resulting in positive", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["-", "5", "*", "-", "2", "="]) // -5 * -2 = 10
    expect(result.current.currentOperand).toBe("10")
  })

  it("should handle precision for decimal results within MAX_DIGITS", () => {
    const { result } = renderHook(() => useCalculator())
    // 1 / 3 = 0.33333333 (MAX_DIGITS = 9, so 0. + 7 digits)
    clickButtons(result, ["1", "÷", "3", "="])
    expect(result.current.currentOperand).toBe("0.3333333")

    clickButtons(result, [
      "AC",
      "1",
      "2",
      "3",
      "4",
      "5",
      "÷",
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
      "=",
    ]) // 12345 / 100000 = 0.12345
    expect(result.current.currentOperand).toBe("0.12345")

    clickButtons(result, [
      "AC",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "9",
      "8",
      "÷",
      "1",
      "0",
      "=",
    ]) // 99999999.8 (8 nines, dot, one 8)
    expect(result.current.currentOperand).toBe("99999999.8")

    clickButtons(result, ["AC", "1", "÷", "8", "="]) // 0.125
    expect(result.current.currentOperand).toBe("0.125")
  })

  it("should display ERROR if integer part of result is too long after calculation", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, [
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "*",
      "1",
      "0",
      "=",
    ]) // 100000000 * 10 = 1000000000 (ERROR)
    expect(result.current.currentOperand).toBe("ERROR")
  })

  it("should allow changing operation", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "0", "+", "-"]) // Change + to -
    expect(result.current.operation).toBe("-")
    expect(result.current.previousOperand).toBe("10")
    clickButtons(result, ["5", "="])
    expect(result.current.currentOperand).toBe("5") // 10 - 5 = 5
  })

  it("should handle operation, then number, then another operation", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["5", "+", "3", "-"]) // 5+3 should be evaluated (8), then 8 becomes previousOperand, operation becomes -
    expect(result.current.previousOperand).toBe("8")
    expect(result.current.operation).toBe("-")
    expect(result.current.currentOperand).toBe("")
    clickButtons(result, ["2", "="])
    expect(result.current.currentOperand).toBe("6") // 8 - 2 = 6
  })

  it("should handle inputting a sign for the second operand", () => {
    const { result } = renderHook(() => useCalculator())
    clickButtons(result, ["1", "0", "+", "-", "2", "="]) // 10 + (-2) = 8
    expect(result.current.currentOperand).toBe("8")

    clickButtons(result, ["AC", "1", "0", "-", "-", "2", "="]) // 10 - (-2) = 12
    expect(result.current.currentOperand).toBe("12")
  })
})

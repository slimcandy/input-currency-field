import { getNextCaretPositionType } from './input-types'
// calculate new cursor position
export const getNextCaretPosition = ({
  value = '',
  displayValue = '',
  postfix = '',
  prefix = '',
  caretPosition = 0,
}: getNextCaretPositionType): number => {
  if (typeof caretPosition !== 'number') {
    throw Error('Cannot get caret position')
  }

  // check boundaries
  const leftBoundary = prefix.length
  const rightBoundary = displayValue.length - postfix.length
  if (caretPosition <= leftBoundary) {
    return leftBoundary
  }
  if (caretPosition >= rightBoundary) {
    return rightBoundary
  }

  const valuesDifference = displayValue.length - value.length
  const nextCaretPosition = caretPosition + valuesDifference

  // check boundaries
  if (nextCaretPosition <= leftBoundary) {
    return leftBoundary
  }
  if (nextCaretPosition > rightBoundary) {
    return rightBoundary
  }

  return nextCaretPosition
}

// set cursor position
export const setNextCaretPosition = (
  element: HTMLInputElement,
  caretLeftPosition: number,
  caretRightPosition: number | null = null
): void => {
  // check values
  if (
    typeof element === 'undefined' ||
    !element.setSelectionRange ||
    element === null
  ) {
    throw new Error('Input element is invalid')
  }
  if (typeof caretLeftPosition === 'undefined') {
    throw new Error('No cursor start position')
  }
  const positiveCaretLeftPosition =
    caretLeftPosition < 0 ? 0 : caretLeftPosition
  // right range is optional
  if (caretRightPosition === null) {
    caretRightPosition = positiveCaretLeftPosition
  }
  element.focus()
  element.setSelectionRange(positiveCaretLeftPosition, caretRightPosition)
}

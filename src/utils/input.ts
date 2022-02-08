import { getNextCaretPositionType } from './input-types'
// calculate new cursor position
export const getNextCaretPosition = ({
  prevDisplayValue = '',
  nextDisplayValue = '',
  postfix = '',
  caretPosition = 0,
}: getNextCaretPositionType): number => {
  if (typeof caretPosition !== 'number') {
    throw Error('Cannot get caret position')
  }

  const valuesDifference = nextDisplayValue.length - prevDisplayValue.length
  const nextCaretPosition = caretPosition + valuesDifference

  // check boundaries
  const rightBoundary = nextDisplayValue.length - postfix.length
  if (nextCaretPosition <= 0) {
    return 0
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

// set cursor position
export const setCaretPosition = (
  element: HTMLInputElement,
  caretPositionLeft: number,
  caretPositionRight: number | null = null
): void => {
  // check values
  if (
    typeof element === 'undefined' ||
    !element.setSelectionRange ||
    element === null
  ) {
    throw new Error('Input element is invalid')
  }
  if (typeof caretPositionLeft === 'undefined') {
    throw new Error('No cursor start position')
  }
  const positiveCaretPositionLeft =
    caretPositionLeft < 0 ? 0 : caretPositionLeft
  // right range is optional
  if (caretPositionRight === null) {
    caretPositionRight = positiveCaretPositionLeft
  }
  element.focus()
  element.setSelectionRange(positiveCaretPositionLeft, caretPositionRight)
}

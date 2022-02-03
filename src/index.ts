/**
 * Build display value
 */

// leave only one decimal symbol
export const sanitizeDecimalSymbol = (
  value: string,
  decimalSymbol: string = ',',
  allowedDecimalSymbols: string = ','
): string => {
  // Not digit and not decimal symbol
  const decimalSymbolRegExp = new RegExp(
    `[^\\d${decimalSymbol}${allowedDecimalSymbols}]`,
    'g'
  )
  // Not the last, not the first, not double decimal symbol
  const firstLastDoubleRegExp = new RegExp(
    `(${decimalSymbol}{2,}|^${decimalSymbol})`,
    'g'
  )
  // Only first comma
  const singleDecimalSymbolRegExp = new RegExp(
    `(${decimalSymbol}.*)${decimalSymbol}`,
    'g'
  )

  return value
    .replace(decimalSymbolRegExp, '')
    .replace(firstLastDoubleRegExp, '')
    .replace(singleDecimalSymbolRegExp, '$1')
}

// append
export const addPostfix = (value: string, postfix: string): string =>
  value.trim().length === 0
    ? ''
    : value.replace(postfix, '').trim().concat(postfix)

// prepend
export const addPrefix = (value: string, prefix: string): string =>
  value.trim().length === 0
    ? ''
    : prefix.concat(value.replace(prefix, '').trim())

// '12345' -> '12 345'
export const addThousandsSeparatorSymbol = (
  value: string,
  thousandsSeparatorSymbol: string = ' '
): string =>
  value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)

/**
 * Calculate cursor position
 */

// util to set cursor position
export const setCaretPosition = (
  element: HTMLInputElement,
  caretPosition: number
): void => {
  if (element !== null || caretPosition > 0) {
    if (element.setSelectionRange) {
      element.focus()
      element.setSelectionRange(caretPosition, caretPosition)
    }
  }
}

// calculate new cursor position
export const getNextCaretPosition = (
  value: string,
  maskedValue: string,
  mask: string,
  caretPosition: number
): number => {
  const rightBoundary = maskedValue.length - mask.length
  if (typeof caretPosition === 'number') {
    const valuesDifference = maskedValue.length - value.length
    if (valuesDifference === 1 && value === maskedValue) {
      return caretPosition
    }
    const nextCaretPosition = caretPosition + valuesDifference
    if (caretPosition < 1) {
      return 0
    } else {
      return nextCaretPosition > rightBoundary
        ? rightBoundary
        : nextCaretPosition
    }
  }
  return rightBoundary
}

export default {
  sanitizeDecimalSymbol,
  addThousandsSeparatorSymbol,
  addPostfix,
  getNextCaretPosition,
  setCaretPosition,
}

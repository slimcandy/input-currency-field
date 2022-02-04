import { setCaretPosition } from './utils/input'
import { prepend, append } from './utils/string'

/**
 * Build display value
 */

// leave only one decimal symbol
export const sanitizeDecimalSymbol = (
  value: string,
  decimalSymbol: string = ',',
  allowedDecimalSymbols: string = ','
): string => {
  // Replace all allowed decimal symbols with single one
  const singleDecimalSymbolRegExp = new RegExp(
    `[${allowedDecimalSymbols}]`,
    'g'
  )
  // Not digit and not decimal symbol
  const decimalSymbolRegExp = new RegExp(`[^\\d${decimalSymbol}]`, 'g')
  // Not the last, not the first, not double decimal symbol
  const firstLastDoubleRegExp = new RegExp(
    `(${decimalSymbol}{2,}|^${decimalSymbol})`,
    'g'
  )
  // Only first comma
  const firstDecimalSymbolRegExp = new RegExp(
    `(${decimalSymbol}.*)${decimalSymbol}`,
    'g'
  )

  return value
    .replace(singleDecimalSymbolRegExp, decimalSymbol)
    .replace(decimalSymbolRegExp, '')
    .replace(firstLastDoubleRegExp, '')
    .replace(firstDecimalSymbolRegExp, '$1')
}

// append
export const addPostfix = (value: string, postfix: string): string =>
  value.trim().length === 0 ? '' : append(value, postfix)

// prepend
export const addPrefix = (value: string, prefix: string): string =>
  value.trim().length === 0 ? '' : prepend(value, prefix)

// '12345' -> '12 345'
export const addThousandsSeparatorSymbol = (
  value: string,
  thousandsSeparatorSymbol: string = ' '
): string =>
  value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)

/**
 * Calculate cursor position
 */

// calculate new cursor position
export const getNextCaretPosition = (
  value: string,
  maskedValue: string,
  mask: string,
  caretPosition: number
): number => {
  if (caretPosition < 1) {
    return 0
  }
  const rightBoundary = maskedValue.length - mask.length
  if (typeof caretPosition !== 'number') {
    return rightBoundary
  }
  const valuesDifference = maskedValue.length - value.length
  const nextCaretPosition = caretPosition + valuesDifference
  if (nextCaretPosition > rightBoundary) {
    return rightBoundary
  }
  return nextCaretPosition
}

export default {
  sanitizeDecimalSymbol,
  addThousandsSeparatorSymbol,
  addPostfix,
  getNextCaretPosition,
  setCaretPosition: setCaretPosition,
}

import { getNextCaretPosition, setNextCaretPosition } from './utils/input'
import {
  append,
  sanitizeDecimalSymbol,
  addThousandsSeparatorSymbol,
} from './utils/string'
import { formatConfig } from './types'

export const defaultConfig: formatConfig = {
  decimalSymbol: ',',
  allowedDecimalSymbols: ',.',
  postfix: '',
  thousandsSeparator: ' ',
}

export const fillConfig = (
  config: formatConfig,
  defaultConfig: formatConfig
) => {
  return {
    decimalSymbol:
      typeof config.decimalSymbol === 'string'
        ? config.decimalSymbol
        : defaultConfig.decimalSymbol,
    allowedDecimalSymbols:
      typeof config.allowedDecimalSymbols === 'string'
        ? config.allowedDecimalSymbols
        : defaultConfig.allowedDecimalSymbols,
    postfix:
      typeof config.postfix === 'string'
        ? config.postfix
        : defaultConfig.postfix,
    thousandsSeparator:
      typeof config.thousandsSeparator === 'string'
        ? config.thousandsSeparator
        : defaultConfig.thousandsSeparator,
  }
}

export const format = (value: string = '', config: formatConfig): string => {
  if (value.trim() === '' || value === null || value.length < 1) return ''
  const parsedConfig = fillConfig(config, defaultConfig)

  // '₽ 12w3.45we $' -> '123,45'
  const displayValue = sanitizeDecimalSymbol(
    value,
    parsedConfig.decimalSymbol,
    parsedConfig.allowedDecimalSymbols
  )
  // '12345' -> '12 345'
  const valueWithThousands = addThousandsSeparatorSymbol(
    displayValue,
    parsedConfig.thousandsSeparator
  )
  // '123' -> '123 $'
  const appendedValue = append(valueWithThousands, parsedConfig.postfix)

  return appendedValue
}

export const parse = (displayValue: string, config: formatConfig): number => {
  if (
    displayValue.trim() === '' ||
    displayValue === null ||
    displayValue.length < 1
  ) {
    return 0
  }
  const parsedConfig = fillConfig(config, defaultConfig)

  return Number(
    sanitizeDecimalSymbol(
      displayValue,
      parsedConfig.decimalSymbol,
      parsedConfig.allowedDecimalSymbols
    ).replace(parsedConfig.decimalSymbol, '.')
  )
}

export default {
  format,
  parse,
  getNextCaretPosition,
  setNextCaretPosition,
}

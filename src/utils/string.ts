export const append = (value: string, postfix: string): string =>
  value.replace(postfix, '').trim().concat(postfix)

// leave only one decimal symbol
export const getSingleDecimalSymbol = (
  value: string,
  decimalSymbol: string = ',',
  allowedDecimalSymbols: string = ','
): string =>
  value.replace(new RegExp(`[${allowedDecimalSymbols}]`, 'g'), decimalSymbol)

export const sanitizeDecimalSymbol = (
  value: string,
  decimalSymbol: string = ',',
  allowedDecimalSymbols: string = ','
): string => {
  // Not digit and not decimal symbol
  const decimalSymbolRegExp = new RegExp(`[^\\d${decimalSymbol}]`, 'g')
  // leave only first zero
  const onlyOneLeadingZeroRegExp = new RegExp('^0+', 'g')
  // 03 -> 3
  const noLeadingZeroRegExp = new RegExp(
    `^0([\\d${allowedDecimalSymbols}]+)`,
    'g'
  )
  // Not the last, not the first, not double decimal symbol
  const firstLastDoubleRegExp = new RegExp(
    `(${decimalSymbol}{2,}|^${decimalSymbol})`,
    'g'
  )
  // Only first decimal symbol
  const firstDecimalSymbolRegExp = new RegExp(
    `(${decimalSymbol}.*)${decimalSymbol}`,
    'g'
  )
  return getSingleDecimalSymbol(value, decimalSymbol, allowedDecimalSymbols)
    .replace(onlyOneLeadingZeroRegExp, '0')
    .replace(noLeadingZeroRegExp, '$1')
    .replace(decimalSymbolRegExp, '')
    .replace(firstLastDoubleRegExp, '')
    .replace(firstDecimalSymbolRegExp, '$1')
}

// '12345' -> '12 345'
export const addThousandsSeparatorSymbol = (
  value: string,
  thousandsSeparatorSymbol: string = ' '
): string =>
  value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)

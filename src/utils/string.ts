export const prepend = (value: string, postfix: string): string =>
  postfix.concat(value.replace(postfix, '').trim())

export const append = (value: string, prefix: string): string =>
  value.replace(prefix, '').trim().concat(prefix)

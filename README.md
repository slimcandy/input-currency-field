# Input currency field

## Install

`npm install input-currency-field`

## Use

```js
import {
  sanitizeDecimalSymbol,
  addThousandsSeparatorSymbol,
  addPostfix,
} from 'input-currency-field'

const value = '🪙🪙,,..12345🪙🪙67,89,,..🪙🪙'
const displayValue = sanitizeDecimalSymbol(value, ',')
const valueWithThousands = addThousandsSeparatorSymbol(displayValue)
const maskedValue = addPostfix(valueWithThousands, ' 🪙')

console.log(maskedValue) // 1 234 567,89 🪙
```

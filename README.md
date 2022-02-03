# Input currency field

⚡️ [Live demo](https://jsfiddle.net/unjfpq9a/)

## Install

`npm install input-currency-field`

## Use

```js
import {
  sanitizeDecimalSymbol,
  addThousandsSeparatorSymbol,
  addPostfix,
  getNextCaretPosition,
  setCaretPosition,
} from 'input-currency-field'
const MASK = ' 🪙'

const onChangeHandler = (event) => {
  const value = event.target.value
  if (value === null || value.length < 1) {
    return
  }
  // leave only number and decimal symbol
  const displayValue = sanitizeDecimalSymbol(value, ',', '.')
  // '12345' -> '12 345'
  const valueWithThousands = addThousandsSeparatorSymbol(displayValue)
  // append with 🪙
  const maskedValue = addPostfix(valueWithThousands, MASK)

  // calculate new cursor position
  const nextCaretPostion = getNextCaretPosition(
    value,
    maskedValue,
    MASK,
    event.target.selectionStart
  )

  // update value
  event.target.value = maskedValue
  // update cursor position
  setCaretPosition(event.target, nextCaretPostion)
}

document.getElementById('currency').addEventListener('input', onChangeHandler)
```

## ❕ Many npm libs cannot, but this js could use custom

- decimal symbol (even range of them)
- postfix
- thousand separator
- onChange event. Use your own! Separating `displayValue` and `value` with no problem

## ⚠️ Before you copy and paste into prod

- `onChangeHandler` should be debounced or throttled
- `element.setSelectionRange` is tricky and not completed yet. Test with ultra-speed typing

## 📚 MDN

- [setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
- [onInput](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)

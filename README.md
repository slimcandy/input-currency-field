# Input currency field

⚡️ [Live demo](https://jsfiddle.net/6L3cnxrs/)

Helpers for currency input

## Install

`npm install input-currency-field`

## Use

```js
import currencyField from 'input-currency-field'

const onChangeHandler = (event) => {
  const value = event.target.value
  if (value === null || value.length < 1) {
    return
  }
  // fill in config with possible options
  const config = {
    decimalSymbol: ',',
    allowedDecimalSymbols: ',.;',
    postfix: ' $',
    thousandsSeparator: ' ',
  }
  // apply mask/config to value
  const displayValue = currencyField.format(value, config)
  // calculate next caret/cursor position
  const nextCaretPosition = currencyField.getNextCaretPosition({
    value,
    displayValue,
    postfix: config.postfix,
    caretPosition: event.target.selectionStart,
  })
  // get math-ready value
  const mathValue = currencyField.parse(displayValue, config)

  // update DOM
  event.target.value = displayValue
  currencyField.setNextCaretPosition(event.target, nextCaretPosition)
  document.getElementById('realValue').value = mathValue
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

## 📚 MDN

- [setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
- [onInput](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)

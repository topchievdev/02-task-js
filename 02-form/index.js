const form = document.getElementById('form')

const removeError = (input) => {
  const parent = input.parentNode
  if (parent.classList.contains('form__error')) {
    parent.querySelector('.form__label--error').remove()
    parent.classList.remove('form__error')
  }
}

const createError = (input, text) => {
  const parent = input.parentNode
  const errorLabel = document.createElement('label')

  errorLabel.classList.add('form__label--error')
  errorLabel.textContent = text

  parent.classList.add('form__error')
  parent.append(errorLabel)
}

const validation = (form) => {
  let result = true

  const inputs = form.querySelectorAll('input')

  inputs.forEach((input) => {
    removeError(input)

    if (input.dataset.forbiddenChars) {
      const forbiddenChars = ['-', '/', '\\', '_', '*']
      let isForbidden
      for (var i = 0; i < input.value.length; i++) {
        if (forbiddenChars.indexOf(input.value[i]) !== -1) {
          isForbidden = true
        }
      }

      if (isForbidden) {
        removeError(input)
        createError(input, `Запрещены символы - /\\_*`)
        result = false
      }
    }

    if (input.dataset.specialChars) {
      if (!/[^a-zA-Z0-9]/.test(input.value)) {
        removeError(input)
        createError(input, `Нужен хотя бы один специальный символ (#$%^&)`)
        result = false
      }
    }

    if (input.dataset.onlyLetters) {
      if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(input.value)) {
        removeError(input)
        createError(input, `Допускается только использование букв алфавита`)
        result = false
      }
    }

    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        removeError(input)
        createError(input, `Максимум символов: ${input.dataset.maxLength}`)
        result = false
      }
    }

    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        removeError(input)
        createError(input, `Минимум символов: ${input.dataset.minLength}`)
        result = false
      }
    }

    if (input.dataset.required) {
      if (input.value === '') {
        removeError(input)
        createError(input, 'Поле не заполнено!')
        result = false
      }
    }
  })

  return result
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  validation(e.target)
})

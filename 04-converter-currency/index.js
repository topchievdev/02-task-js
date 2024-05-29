import { getCurrency } from './api.js'

const currency = ['usd', 'eur', 'cad', 'cny', 'chf', 'sgd']

const list = document.querySelector('.converter__list')

const initCurrency = async () => {
  currency.forEach((curr) => {
    getCurrency({ from: curr }).then(({ data }) => {
      const div = document.createElement('div')
      div.innerHTML = `<span class="converter__currency">${`${curr.toUpperCase()}:`}</span>
          <span class="converter__price">${data.toFixed(2)}</span>`
      div.classList.add('converter__item')
      list.append(div)
    })
  })
}

initCurrency()

setInterval(initCurrency, 15 * 60 * 1000)

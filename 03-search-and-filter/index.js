const frameworks = [
  'react',
  'vue',
  'angular',
  'jquery',
  'bootstrap',
  'tailwind',
  'emberjs',
  'backbonejs',
  'svelte',
  'preact',
  'alpinejs',
  'stimulus',
  'foundation',
  'material-ui',
  'bulma',
  'antdesign',
  'chartjs',
  'd3js',
  'threejs',
  'animejs',
  'gsap',
  'lodash',
  'underscorejs',
  'rxjs',
  'immutablejs'
]

const input = document.getElementById('input')

const initList = () => {
  const ul = document.createElement('ul')
  frameworks.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    ul.append(li)
  })
  document.body.append(ul)
}

const handleInput = (e) => {
  const value = e.target.value.trim()
  let list = document.querySelectorAll('li')

  if (value) {
    list.forEach((item) => {
      if (item.innerText.search(value) === -1) {
        item.classList.add('hide')
      }
    })
  } else {
    list.forEach((item) => {
      item.classList.remove('hide')
    })
  }
}

initList()

input.addEventListener('input', handleInput)

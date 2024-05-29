const buttonUp = document.getElementById('go-up')
const buttonDown = document.getElementById('go-down')

const scrollHeight = document.body.scrollHeight

buttonDown.addEventListener('click', () => window.scrollTo(0, scrollHeight))
buttonUp.addEventListener('click', () => window.scrollTo(0, 0))

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    buttonUp.style.transition = '0.5s'
    buttonUp.style.opacity = 1
  } else {
    buttonUp.style.transition = '0.5s'
    buttonUp.style.opacity = 0
  }
})

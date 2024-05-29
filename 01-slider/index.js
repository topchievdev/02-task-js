import { getPhotos } from './api.js'
;(async () => {
  'use strict'

  const data = await getPhotos(8)

  // Можно переключать для бесконечного слайдера
  ///////////////////////////////////////////////
  const settings = {
    infinite: false
  }
  ///////////////////////////////////////////////

  let dragging = false
  let inited = false

  let lineX1 = 0
  let lineX2 = null
  let cursorX1 = null
  let cursorX2 = null

  let itemActive = 0
  let itemWidth = null
  let itemHeight = null

  let sliderWidth = null
  let gap = null

  const slider = document.querySelector('.slider')
  const sliderLine = document.querySelector('.slider__line')
  const prevButton = document.querySelector('.slider__button--prev')
  const nextButton = document.querySelector('.slider__button--next')

  const initSlider = (data) => {
    if (!inited) {
      renderItems(data)
      inited = true
    }

    itemHeight = document.querySelector('.slider__item').offsetHeight
    itemWidth = document.querySelector('.slider__item').offsetWidth
    const gapValue = parseInt(window.getComputedStyle(sliderLine).gap)
    gap = isNaN(gapValue) ? 0 : gapValue

    while (sliderLine.offsetWidth < slider.clientWidth) {
      renderItems(data)
    }

    sliderWidth = slider.clientWidth
  }

  const renderItems = (data) => {
    data.forEach(({ url }) => {
      const div = document.createElement('div')
      div.classList.add('slider__item')
      div.style.backgroundImage = `url('${url}')`
      sliderLine.append(div)
    })
  }

  const checkBounds = () => {
    if (lineX2 > 0) {
      sliderLine.style.transform = `translateX(${-itemWidth - gap}px)`
      sliderLine.prepend(sliderLine.lastChild)
      cursorX1 += itemWidth + gap
    }

    if (lineX2 < -itemWidth - gap) {
      sliderLine.style.transform = `translateX(${0}px)`
      sliderLine.append(sliderLine.firstChild)
      cursorX1 -= itemWidth + gap
    }
  }

  const checkVisibleItemsCount = () => {
    let countItems = 0
    let shiftItems = 0

    let sliderWidthForCheck = slider.clientWidth

    while (sliderWidthForCheck >= 0) {
      sliderWidthForCheck -= itemWidth
      if (sliderWidthForCheck >= 0) countItems++
      if (sliderWidthForCheck > 0) sliderWidthForCheck -= gap
    }

    if (sliderWidthForCheck < 0) shiftItems = sliderWidthForCheck
    if (gap > itemWidth) shiftItems -= itemWidth
    return { countItems, shiftItems }
  }

  const dragStart = (e) => {
    const containsItem = e.target.classList.contains('slider__item')
    const containsLine = e.target.classList.contains('slider__line')
    if (!containsItem && !containsLine) return

    sliderLine.style.transitionDuration = '0s'
    cursorX1 = e.clientX
    dragging = true
  }

  const dragMove = (e) => {
    if (!dragging) return
    cursorX2 = e.clientX

    lineX2 = lineX1 + cursorX2 - cursorX1
    sliderLine.style.transform = `translateX(${lineX2}px)`

    itemActive = Math.round(lineX2 / (itemWidth + gap))

    if (settings.infinite) checkBounds()
  }

  const dragStop = async () => {
    if (!dragging) return
    const { countItems, shiftItems } = checkVisibleItemsCount()
    const lastItemActive = -data.length + 1 + countItems

    if (itemActive > 0) {
      itemActive = 0
      lineX1 = (itemWidth + gap) * itemActive
      sliderLine.style.transform = `translateX(${lineX1}px)`
      sliderLine.style.transitionDuration = '0.3s'
      lineX2 = lineX1
    } else if (itemActive < lastItemActive) {
      itemActive = lastItemActive
      lineX1 = (itemWidth + gap) * itemActive + shiftItems
      sliderLine.style.transform = `translateX(${lineX1}px)`
      sliderLine.style.transitionDuration = '0.3s'
      lineX2 = lineX1
    } else {
      lineX1 = (itemWidth + gap) * itemActive
      sliderLine.style.transform = `translateX(${lineX1}px)`
      sliderLine.style.transitionDuration = '0.3s'
      lineX2 = lineX1
    }

    cursorX1 = null
    dragging = false
  }

  const nextSlide = () => {
    nextButton.disabled = true
    prevButton.style.opacity = '1'

    const { countItems, shiftItems } = checkVisibleItemsCount()
    const lastItemActive = -data.length + 1 + countItems

    if (settings.infinite) {
      if (lineX2 < 0) {
        sliderLine.append(sliderLine.firstChild)
        sliderLine.style.transitionDuration = '0s'
        sliderLine.style.transform = `translateX(${0}px)`
      }

      lineX2 = -itemWidth - gap
      lineX1 = lineX2
    } else {
      itemActive--
      if (itemActive < lastItemActive) {
        itemActive = lastItemActive
        nextButton.style.opacity = '0.5'
      }
      lineX1 = (itemWidth + gap) * itemActive + shiftItems
      lineX2 = lineX1
    }

    setTimeout(() => {
      sliderLine.style.transitionDuration = '0.3s'
      sliderLine.style.transform = `translateX(${lineX2}px)`
    }, 0)
    setTimeout(() => {
      nextButton.disabled = false
    }, 150)
  }

  const prevSlide = () => {
    prevButton.disabled = true
    nextButton.style.opacity = '1'

    if (settings.infinite) {
      if (lineX2 >= 0) {
        sliderLine.prepend(sliderLine.lastChild)
        sliderLine.style.transitionDuration = '0s'
        sliderLine.style.transform = `translateX(${-itemWidth - gap}px)`
      }

      lineX2 = 0
      lineX1 = lineX2
    } else {
      itemActive++
      if (itemActive > 0) {
        itemActive = 0
        prevButton.style.opacity = '0.5'
      }
      lineX2 = (itemWidth + gap) * itemActive
      lineX1 = lineX2
    }

    setTimeout(() => {
      sliderLine.style.transitionDuration = '0.3s'
      sliderLine.style.transform = `translateX(${lineX2}px)`
    }, 0)
    setTimeout(() => {
      prevButton.disabled = false
    }, 150)
  }

  initSlider(data)

  document.addEventListener('pointerdown', dragStart)
  document.addEventListener('pointermove', dragMove)
  document.addEventListener('pointerup', dragStop)

  prevButton.addEventListener('click', prevSlide)
  nextButton.addEventListener('click', nextSlide)

  if (settings.infinite) window.addEventListener('resize', initSlider)
})()

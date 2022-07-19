const forest = document.querySelector('.forest')
const rain = document.querySelector('.rain')
const shop = document.querySelector('.shop')
const fire = document.querySelector('.fire')

const audioForest = new Audio('/forest.mp3')
const audioRain = new Audio('/rain.mp3')
const audioShop = new Audio('/shop.mp3')
const audioFire = new Audio('/fire.mp3')

let minutesDisplay = document.querySelector('.minutes')
let secondsDisplay = document.querySelector('.seconds')
let timerTimeout
let minutes = Number(minutesDisplay.textContent)
let seconds = Number(secondsDisplay.textContent)

const buttonPlay = document.querySelector('.play')
const buttonStop = document.querySelector('.stop')
const buttonAdd = document.querySelector('.addFive')
const buttonRemove = document.querySelector('.removeFive')

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeout)
}

function countDown() {
  timerTimeout = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)

    if (minutes <= 0 && seconds <= 0) {
      resetControls()

      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countDown()
  }, 1000)
}

forest.addEventListener('click', function () {
  forest.classList.add('clicked')
  rain.classList.remove('clicked')
  shop.classList.remove('clicked')
  fire.classList.remove('clicked')

  audioForest.play()
  audioRain.pause()
  audioShop.pause()
  audioFire.pause()
})

rain.addEventListener('click', function () {
  forest.classList.remove('clicked')
  rain.classList.add('clicked')
  shop.classList.remove('clicked')
  fire.classList.remove('clicked')

  audioForest.pause()
  audioRain.play()
  audioShop.pause()
  audioFire.pause()
})

shop.addEventListener('click', function () {
  forest.classList.remove('clicked')
  rain.classList.remove('clicked')
  shop.classList.toggle('clicked')
  fire.classList.remove('clicked')

  audioForest.pause()
  audioRain.pause()
  audioShop.play()
  audioFire.pause()
})

fire.addEventListener('click', function () {
  forest.classList.remove('clicked')
  rain.classList.remove('clicked')
  shop.classList.remove('clicked')
  fire.classList.add('clicked')

  audioForest.pause()
  audioRain.pause()
  audioShop.pause()
  audioFire.play()
})

buttonPlay.addEventListener('click', function () {
  countDown()
})

buttonStop.addEventListener('click', function () {
  resetTimer()
  forest.classList.remove('clicked')
  rain.classList.remove('clicked')
  shop.classList.remove('clicked')
  fire.classList.remove('clicked')

  audioForest.pause()
  audioRain.pause()
  audioShop.pause()
  audioFire.pause()
})

buttonAdd.addEventListener('click', function () {
  let newMinutes = Number(minutesDisplay.textContent) + 5

  updateTimerDisplay(newMinutes, seconds)
})

buttonRemove.addEventListener('click', function () {
  let newMinutes = Number(minutesDisplay.textContent) - 5

  updateTimerDisplay(newMinutes, seconds)

  if (newMinutes < 0) {
    resetTimer()
  }
})

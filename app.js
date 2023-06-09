// define the time limit
let TIME_LIMIT = 60

// define quotes to be used
const quotes_array = [
  "The sun slowly set behind the mountains, casting a golden glow across the horizon.",
  "The waves crashed against the shore, their salty spray misting my face.",
  "The leaves rustled in the gentle breeze, a symphony of sound in the quiet forest.",
  "The soft purring of the cat soothed my nerves, as I stroked its silky fur.",
  "The aroma of freshly brewed coffee filled the air, energizing my senses.",
  "The moon rose high in the night sky, casting a silvery light over the land.",
  "The majestic eagle soared high above, scanning the land for prey.",
  "The sound of rain tapping against the window lulled me into a peaceful sleep.",
  "The flames danced in the fireplace, casting a warm glow over the room.",
  "The snowflakes fell softly to the ground, creating a blanket of white.",
  "The thunder rumbled in the distance, a warning of the approaching storm.",
  "The scent of lavender filled the room, calming my restless mind.",
  "The stars twinkled like diamonds in the velvet sky, a celestial dance above.",
  "The wind howled through the trees, like a mournful cry in the dark night.",
  "The chirping of crickets filled the air, a soothing symphony in the warm summer night.",
  "The gentle humming of bees buzzed in my ears, as I picked ripe berries from the bushes.",
  "The sound of the church bells echoed through the quiet town, announcing the hour.",
  "The silence of the library was only broken by the rustling of pages turning.",
  "The melody of the violin filled the concert hall, transporting the audience to another world.",
  "The smell of fresh roses permeated the air, filling my senses with their sweet fragrance."
]

// selecting required elements
let timer_text = document.querySelector(".curr_time")
let accuracy_text = document.querySelector(".curr_accuracy")
let error_text = document.querySelector(".curr_errors")
let cpm_text = document.querySelector(".curr_cpm")
let wpm_text = document.querySelector(".curr_wpm")
let quote_text = document.querySelector(".quote")
let input_area = document.querySelector(".input_area")
let restart_btn = document.querySelector(".restart_btn")
let cpm_group = document.querySelector(".cpm")
let wpm_group = document.querySelector(".wpm")
let error_group = document.querySelector(".errors")
let accuracy_group = document.querySelector(".accuracy")

let timeLeft = TIME_LIMIT
let timeElapsed = 0
let total_errors = 0
let errors = 0
let accuracy = 0
let characterTyped = 0
let current_quote = ""
let quoteNo = Math.floor(Math.random() * 20)
let timer = null

function updateQuote() {
  quote_text.textContent = null
  current_quote = quotes_array[quoteNo]

  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // get new quote
  quoteNo = Math.floor(Math.random() * quotes_array.length)

}

function processCurrentText() {
  // get current input text and split it
  curr_input = input_area.value
  curr_input_array = curr_input.split('')

  // increment total characters typed
  characterTyped++

  errors = 0

  let quoteSpanArray = quote_text.querySelectorAll('span')
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char')
      char.classList.remove('incorrect_char')

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char')
      char.classList.remove('incorrect_char')

      // incorrect characters
    } else {
      char.classList.add('incorrect_char')
      char.classList.remove('correct_char')

      // increment number of errors
      errors++
    }
  })

  // display the number of errors
  error_text.textContent = total_errors + errors

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors))
  let accuracyVal = ((correctCharacters / characterTyped) * 100)
  accuracy_text.textContent = Math.round(accuracyVal)

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote()

    // update total errors
    total_errors += errors

    // clear the input area
    input_area.value = ""
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--

    // increase the time elapsed
    timeElapsed++

    // update the timer text
    timer_text.textContent = timeLeft + "s"
  }
  else {
    // finish the game
    finishGame()
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer)

  // disable the input area
  input_area.disabled = true

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game."

  // display restart button
  restart_btn.style.display = "block"

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60))
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60))

  // update cpm and wpm text
  cpm_text.textContent = cpm
  wpm_text.textContent = wpm

  // display the cpm and wpm
  cpm_group.style.display = "block"
  wpm_group.style.display = "block"
}


function startGame() {

  resetValues()
  updateQuote()

  // clear old and start a new timer
  clearInterval(timer)
  timer = setInterval(updateTimer, 1000)
}

function resetValues() {
  timeLeft = TIME_LIMIT
  timeElapsed = 0
  errors = 0
  total_errors = 0
  accuracy = 0
  characterTyped = 0
  quoteNo = 0
  input_area.disabled = false

  input_area.value = ""
  quote_text.textContent = 'Click on the area below to restart the game.'
  accuracy_text.textContent = 100
  timer_text.textContent = timeLeft + 's'
  error_text.textContent = 0
  restart_btn.style.display = "none"
  cpm_group.style.display = "none"
  wpm_group.style.display = "none"
}

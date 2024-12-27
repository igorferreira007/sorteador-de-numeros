const inputNumbers = document.getElementById("numbers")
const inputFrom = document.getElementById("from")
const inputTo = document.getElementById("to")
const form = document.querySelector("form")
const checkboxNotRepeat = document.getElementById("input-toggle")
const divContentForm = document.getElementById("content-form")
const divDrawResult = document.getElementById("draw-result")

let numbers
let from
let to
let numbersOfDraw = 1

inputNumbers.addEventListener("input", () => {
  numbers = Number(inputNumbers.value)
})

inputFrom.addEventListener("input", () => {
  from = Number(inputFrom.value)
})

inputTo.addEventListener("input", () => {
  to = Number(inputTo.value)
})

form.addEventListener("submit", (event) => {
  event.preventDefault()

  if (!numbers || !from || !to) {
    return alert("Preencha todos os campos.")
  }

  const drawnNumbers = drawNumber(numbers, from, to)

  if (drawnNumbers === undefined) {
    return
  }

  showResult(drawnNumbers)
})

function drawNumber(amountOfNumbers, startingNumber, finalNumber) {
  let drawnNumbers = []

  if (startingNumber > finalNumber) {
    return alert("O número inicial não pode ser maior que o número final.")
  }

  if (
    checkboxNotRepeat.checked &&
    amountOfNumbers > finalNumber - startingNumber + 1
  ) {
    return alert("O intervalo é muito pequeno para gerar números únicos.")
  }

  for (let i = 0; i < amountOfNumbers; i++) {
    let number =
      Math.floor(Math.random() * (finalNumber - startingNumber + 1)) +
      startingNumber

    if (checkboxNotRepeat.checked) {
      if (!drawnNumbers.includes(number)) {
        drawnNumbers.push(number)
      } else {
        i--
      }
    } else {
      drawnNumbers.push(number)
    }
  }

  return drawnNumbers
}

function showResult(drawnNumbers) {
  divContentForm.classList.add("hide")
  divDrawResult.classList.remove("hide")

  const divContentNumber = document.createElement("div")
  divContentNumber.classList.add("content-number")

  drawnNumbers.forEach((number) => {
    const spanContent = document.createElement("span")
    spanContent.innerHTML = `<span>${number}</span>`
    divContentNumber.append(spanContent)
  })

  divDrawResult.innerHTML = `
      <h2>Resultado do sorteio</h2>
      <p>${numbersOfDraw}º resultado</p>

      <div class="content-number">
        ${divContentNumber.innerHTML}
      </div>

      <div class="button-wrapper">
        <button id="draw-again">
          <span>Sortear novamente</span>
          <img src="./assets/replay.svg" alt="">
        </button>
      </div>
    `

  numbersOfDraw++
  
  const buttonDrawAgain = document.getElementById("draw-again")

  buttonDrawAgain.addEventListener("click", () => {
    divContentForm.classList.remove("hide")
    divDrawResult.classList.add("hide")

    inputNumbers.value = ""
    inputFrom.value = ""
    inputTo.value = ""
  })
}

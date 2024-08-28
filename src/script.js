const focusableElements = Array.from(document.querySelectorAll('button'))
const firstFocusableElement = focusableElements[0]
const lastFocusableElement = focusableElements.at(-1)

function focusTrap(event) {
    if (event.key !== 'Tab') return

    if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            event.preventDefault()
            lastFocusableElement?.focus()
        }
    } else {
        if (document.activeElement === lastFocusableElement) {
            event.preventDefault()
            firstFocusableElement?.focus()
        }
    }
}

function animateBattle(comInput) {
    const comRock = document.getElementById('comRock')
    const comPaper = document.getElementById('comPaper')
    const comScissors = document.getElementById('comScissors')

    const saturateRock = () => {
        comRock.style.filter = 'saturate(100%)'
    }
    const desaturateRock = () => {
        comRock.style.filter = 'saturate(20%)'
    }

    const saturatePaper = () => {
        comPaper.style.filter = 'saturate(100%)'
    }
    const desaturatePaper = () => {
        comPaper.style.filter = 'saturate(20%)'
    }

    const saturateScissors = () => {
        comScissors.style.filter = 'saturate(100%)'
    }
    const desaturateScissors = () => {
        comScissors.style.filter = 'saturate(20%)'
    }

    desaturatePaper()
    desaturateRock()
    desaturateScissors()

    const showResult = () => {
        switch (comInput) {
            case 'rock':
                saturateRock()
                break
            case 'paper':
                saturatePaper()
                break
            case 'scissors':
                saturateScissors()
                break
        }
    }

    const startAnimation = (counter) => {
        saturateRock()
        setTimeout(() => desaturateRock(), 250)
        setTimeout(() => saturatePaper(), 125)
        setTimeout(() => desaturatePaper(), 375)
        setTimeout(() => saturateScissors(), 250)
        setTimeout(() => desaturateScissors(), 500)
        counter < 5
            ? setTimeout(() => startAnimation(counter + 1), 500)
            : setTimeout(showResult, 500)
    }

    startAnimation(0)
}

function calculateResult(ownInput) {
    const ownScore = parseInt(document.getElementById('ownScore').innerHTML)
    const comScore = parseInt(document.getElementById('comScore').innerHTML)

    const winnerText = document.getElementById('winnerText')

    const rockButton = document.getElementById('rockButton')
    const paperButton = document.getElementById('paperButton')
    const scissorsButton = document.getElementById('scissorsButton')

    rockButton.setAttribute('disabled', true)
    paperButton.setAttribute('disabled', true)
    scissorsButton.setAttribute('disabled', true)

    const highlightOwnInput = () => {
        switch (ownInput) {
            case 'rock':
                rockButton.style.filter = 'saturate(100%)'
                paperButton.style.filter = 'saturate(20%)'
                scissorsButton.style.filter = 'saturate(20%)'
                break
            case 'paper':
                rockButton.style.filter = 'saturate(20%)'
                paperButton.style.filter = 'saturate(100%)'
                scissorsButton.style.filter = 'saturate(20%)'
                break
            case 'scissors':
                rockButton.style.filter = 'saturate(20%)'
                paperButton.style.filter = 'saturate(20%)'
                scissorsButton.style.filter = 'saturate(100%)'
                break
        }
    }

    highlightOwnInput()

    winnerText.innerHTML = ''

    const comInput = ['rock', 'paper', 'scissors'][
        Math.floor(Math.random() * 3)
    ]

    animateBattle(comInput)

    if (comInput === 'rock') {
        switch (ownInput) {
            case 'rock':
                setTimeout(() => (winnerText.innerHTML = 'TIE!'), 3000)
                break
            case 'paper':
                setTimeout(
                    () =>
                        (document.getElementById('ownScore').innerHTML =
                            ownScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'You Win!'), 3000)
                break
            case 'scissors':
                setTimeout(
                    () =>
                        (document.getElementById('comScore').innerHTML =
                            comScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'COM Wins!'), 3000)
                break
        }
    } else if (comInput === 'paper') {
        switch (ownInput) {
            case 'rock':
                setTimeout(
                    () =>
                        (document.getElementById('comScore').innerHTML =
                            comScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'COM Wins!'), 3000)
                break
            case 'paper':
                setTimeout(() => (winnerText.innerHTML = 'TIE!'), 3000)
                break
            case 'scissors':
                setTimeout(
                    () =>
                        (document.getElementById('ownScore').innerHTML =
                            ownScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'You Win!'), 3000)
                break
        }
    } else if (comInput === 'scissors') {
        switch (ownInput) {
            case 'rock':
                setTimeout(
                    () =>
                        (document.getElementById('ownScore').innerHTML =
                            ownScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'You Win!'), 3000)
                break
            case 'paper':
                setTimeout(
                    () =>
                        (document.getElementById('comScore').innerHTML =
                            comScore + 1),
                    3000
                )
                setTimeout(() => (winnerText.innerHTML = 'COM Wins!'), 3000)
                break
            case 'scissors':
                setTimeout(() => (winnerText.innerHTML = 'TIE!'), 3000)
                break
        }
    }

    setTimeout(() => rockButton.removeAttribute('disabled'), 4000)
    setTimeout(() => paperButton.removeAttribute('disabled'), 4000)
    setTimeout(() => scissorsButton.removeAttribute('disabled'), 4000)

    setTimeout(() => (rockButton.style.filter = 'saturate(100%)'), 4000)
    setTimeout(() => (paperButton.style.filter = 'saturate(100%)'), 4000)
    setTimeout(() => (scissorsButton.style.filter = 'saturate(100%)'), 4000)
}

document.addEventListener('keydown', focusTrap)

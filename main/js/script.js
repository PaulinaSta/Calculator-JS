// ABOUT AUTHOR
console.log('%cKalkulator JS', 'font-size:40px; color:#faa916')
console.log('%cAUTOR: Paulina Staszynska', 'font-size:20px; color:#6d676e')

const btnsConfig = document.querySelectorAll('.btn-config')
const infoBox = document.querySelector('.info-box')
const buttonConfirm = document.querySelector('.button-confirm')

function toggleBtnClasses(e) {
	e.target.classList.toggle('btn-active')
	e.target.classList.toggle('btn-config')
}

btnsConfig.forEach(btnConfig => {
	btnConfig.addEventListener('click', toggleBtnClasses)
})

buttonConfirm.addEventListener('click', () => {
	const btnsActive = document.querySelectorAll('.btn-active')

	btnsActive.forEach(btnActive => {
		btnActive.classList.add('btn-calc')
	})

	btnsConfig.forEach(btnConfig => {
		btnConfig.classList.remove('btn-config')
		btnConfig.removeEventListener('click', toggleBtnClasses)
	})

	infoBox.classList.add('info-box-hide')

	buttonConfirm.classList.add('button-confirm-hide')

	calculator()
})

function factorial(n) {
	if (n == 0) {
		return 1
	} else if (n == 1) {
		return n
	} else {
		return n * factorial(n - 1)
	}
}

function isLastElementInteger(element) {
	return element !== '' && Number.isInteger(+element.slice(-1))
}

const alertBox = document.querySelector('.alert-box')
const alertText = document.querySelector('.alert-text')

function showAlert(text) {
	alertBox.classList.add('alert-box-active')
	alertText.innerText = `${text} tylko przez liczby naturalne.`
}

function calculator() {
	const display = document.querySelector('.display-content')
	const buttons = document.querySelectorAll('.btn-calc')

	let isEvaluationDone = false

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			const buttonText = button.innerText

			if (display.innerText == 'error') {
				display.innerText = ''
				alertBox.classList.remove('alert-box-active')
			}

			if (isEvaluationDone == true && Number.isInteger(+buttonText)) {
				display.innerText = ''
			}

			isEvaluationDone = false

			switch (buttonText) {
				case 'C':
					display.innerText = ''
					break

				case '**':
				case '/':
				case '*':
				case '+':
					if (isLastElementInteger(display.innerText)) {
						display.innerText += buttonText
					}
					break

				case '-':
					if (display.innerText.slice(-1) !== '-' && display.innerText.slice(-1) !== '.') {
						display.innerText += buttonText
					}
					break

				case '.':
					if (isLastElementInteger(display.innerText)) {
						display.innerText += buttonText
					} else {
						display.innerText += '0' + buttonText
					}
					break

				case '!':
					if (display.innerText == '') {
						break
					} else if (!isLastElementInteger(display.innerText)) {
						display.innerText = 'error'
					} else if (eval(display.innerText) < 0 || !Number.isInteger(eval(display.innerText))) {
						display.innerText = 'error'
						showAlert('Silnia jest funkcją obsługiwaną')
					} else {
						try {
							display.innerText = factorial(eval(display.innerText))
							isEvaluationDone = true
						} catch {
							display.innerText = 'error'
						}
					}
					break

				case '=':
					if (display.innerText == '') {
						break
					} else if (
						display.innerText.includes('**') &&
						(display.innerText.includes('.') || display.innerText.includes('-'))
					) {
						display.innerText = 'error'
						showAlert('Potęgowanie jest działaniem obsługiwanym')
					} else {
						try {
							display.innerText = eval(display.innerText)
							isEvaluationDone = true
						} catch {
							display.innerText = 'error'
						}
					}
					break

				default:
					display.innerText += buttonText
			}
		})
	})
}

const nums = document.querySelectorAll('.btn-num')
const operator = document.querySelectorAll('.operator')
const currentInput = document.querySelector('.current-input')
const previousInput = document.querySelector('.previous-input')
const reset = document.querySelector('.reset')
const equal = document.querySelector('.equal')

let current = currentInput.textContent
let previous = previousInput.textContent

reset.onclick = () => resetInput()
equal.onclick = () => equalInput(current, previous)

nums.forEach((num) => {
    num.addEventListener('click', (e) => {
        e.preventDefault();

        let value = num.getAttribute('data-number')

        if (!previous.includes(' ')) {
            current += value
            currentInput.textContent = current
        } else {
            current = ''
            current += value
            currentInput.textContent = current
        }
    })
})

const resetInput = () => {
    currentInput.textContent = ''
    previousInput.textContent = ''
}

const equalInput = (prev, curr) => {
    let value = `${curr} ${prev}`
    console.log(value)
}

operator.forEach((op) => {
    op.addEventListener('click', (e) => {
        e.preventDefault()
        e = op.getAttribute('data-operator')

        if (!current.includes(' '))
            previous = current + ' ' + e
        previousInput.textContent = previous
    })
})
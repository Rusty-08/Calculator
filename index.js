// problem to solve: 
// only single number is print to current after the operation is clicked
// no erase function yet
// '.' must be print once

const nums = document.querySelectorAll('.btn-num')
const operator = document.querySelectorAll('.operator')
const currentInput = document.querySelector('.current-input')
const previousInput = document.querySelector('.previous-input')
const reset = document.querySelector('.reset')
const equal = document.querySelector('.equal')
const erase = document.querySelector('.erase')

let current = currentInput.textContent
let previous = previousInput.textContent

reset.onclick = () => resetInput()
equal.onclick = () => equalBtn(previous, current)

// Function Constructor to calculate the inputs
function Calculator() {

    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "x": (a, b) => a * b,
        "÷": (a, b) => a / b,
        "%": (a, b) => a % b
    };

    this.calculate = function (str) {

        let split = str.split(' '),
            a = +split[0],
            op = split[1],
            b = +split[2];

        if (!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }
        return this.methods[op](a, b);
    };
}

let calc = new Calculator;

// call Calculator function constructor to calculate the inputs
const equalBtn = (a, b) => {
    let result = calc.calculate(`${a} ${b}`);
    resetInput()
    currentInput.textContent = result
}

const eraseInput = () => {

}

// display number input : onclicked
nums.forEach((num) => {
    num.addEventListener('click', (e) => {
        e.preventDefault();

        let value = num.getAttribute('data-number')
        current += value

        if (!previous.includes(' ')) {
            currentInput.textContent = current
        } else {
            currentInput.textContent = ''
            current = ''
            current += value
            let newCurrent = current
            currentInput.textContent = newCurrent
        }
    })
})

// Reset the previous and current input values : onclicked
const resetInput = () => {
    current = ''
    previous = ''
    currentInput.textContent = 0
    previousInput.textContent = ''
}

// display operator on previous input : onclicked
operator.forEach((op) => {
    op.addEventListener('click', (e) => {
        e.preventDefault()
        e = op.getAttribute('data-operator')

        if (!current.includes(' '))
            previous = current + ' ' + e

        previousInput.textContent = previous
    })
})

window.onload = () => {
    currentInput.textContent = 0
}
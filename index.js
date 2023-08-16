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
erase.onclick = () => eraseInput()
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
            return '';
        }
        return this.methods[op](a, b);
    };
}

let calc = new Calculator;

// call Calculator function constructor to calculate the inputs
const equalBtn = (a, b) => {
    let result = calc.calculate(`${a} ${b}`);

    if (!previousInput.textContent) {
        return '';
    } else {
        previousInput.textContent = `${a} ${b} =`
        previous = previousInput.textContent
        current = result
        currentInput.textContent = current
    }
}

const eraseInput = () => {
    if (current != 0) {
        current = current.slice(0, -1)
        currentInput.textContent = current
    }
}

// display number input : onclicked
nums.forEach((num) => {
    num.addEventListener('click', (e) => {
        e.preventDefault();
        let value = num.getAttribute('data-number')
        current += value
        currentInput.textContent = current
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
        let arOperator = op.getAttribute('data-operator')

        if (!previous.includes(arOperator) || !previous.includes('=')) {
            previous = current + ' ' + arOperator
            previousInput.textContent = previous
        }
        if (previous.includes('=') || previous.includes(arOperator)) current = ''
    })
})

window.onload = () => {
    currentInput.textContent = 0
}
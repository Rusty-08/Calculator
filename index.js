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
            a = +split[0].split(',').join(''),
            op = split[1],
            b = +split[2].split(',').join('');

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

    if (!previousInput.textContent || b == '' || previous.includes('=')) {
        previousInput.textContent = ''
    } else {
        previousInput.textContent = `${a} ${b.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} =`
        previous = previousInput.textContent
        currentInput.textContent = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        current = ''
    }
}

const eraseInput = () => {
    if (current != 0) {
        current = current.slice(0, -1)
        if (current.length == 4) current = current.toString().split(',').join('')
        currentInput.textContent = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    if (previous || previous.includes('=')) previousInput.textContent = ''
    if (currentInput.textContent == '') currentInput.textContent = 0
}

// display number input : onclicked
nums.forEach((num) => {
    num.addEventListener('click', (e) => {
        e.preventDefault();
        let value = num.getAttribute('data-number')

        if (currentInput.offsetWidth > 255) value = ''
        if (current.includes('.') && value == '.') value = ''

        current += value

        currentInput.textContent = current.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

        if (currentInput.offsetWidth > 255)
            currentInput.style.fontSize = '2.3rem'
    })
})

// Reset the previous and current input values : onclicked
const resetInput = () => {
    current = ''
    previous = ''
    currentInput.textContent = 0
    previousInput.textContent = ''
    currentInput.style.fontSize = '2.9rem'
}

// display operator on previous input : onclicked
operator.forEach((op) => {
    op.addEventListener('click', (e) => {
        e.preventDefault()
        let arOperator = op.getAttribute('data-operator')

        if (current != 0 || previous.includes(' ')) {
            current = ''
            previous = currentInput.textContent + ' ' + arOperator
            previousInput.textContent = previous
        }
    })
})

window.onload = () => {
    currentInput.textContent = 0
}
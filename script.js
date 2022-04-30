const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const highlightOnClickBtns = document.querySelectorAll(".highlightOnClick");
const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const decimalPoint = document.getElementById("decimalPoint");
const equalsBtn = document.getElementById("equals");

let currentOperatorBtn;
let firstValue = 0;
let secondValue = "";
let currentOperator = "";
let isResult = false;
let displayFull = false;
let decimalPointActive = false;

decimalPoint.addEventListener("click", () => {
    if (decimalPointActive) {
        return;
    }

    if (isResult) {
        display.innerText = "0.";
        isResult = false;
    } else {
        display.innerText += ".";
    }

    decimalPointActive = true;
})

equalsBtn.addEventListener("click", equals);

clearBtn.addEventListener("click", clearAll);

highlightOnClickBtns.forEach(button => {
    button.addEventListener("mousedown", highlightDigitBtn);
    button.addEventListener("mouseup", highlightDigitBtn);
});

operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", highlightOperator);
    operatorButton.addEventListener("click", selectOperator);
});

digitButtons.forEach(digitButton => {
    digitButton.addEventListener("click", selectDigit);
});


function operate(operator, number1, number2) {
    switch (operator) {
        case "add":
            return add(number1, number2);
            break;
        case "subtract":
            return subtract(number1, number2);
            break;
        case "multiply":
            return multiply(number1, number2);
            break;
        case "divide":
            return divide(number1, number2);
            break;
    }
}

function add(addend1, addend2) {
    return addend1 + addend2;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(factor1, factor2) {
    return factor1 * factor2;
}

function divide(dividend, divisor) {
    if (divisor != 0) {
        return dividend / divisor;
    }
    alert("You cannot divide by zero!");
    return dividend;
}

function selectDigit() {

    if (countDigits(display.innerText) === 9 && !isResult) {
        displayFull = true;
    }

    if (displayFull) {
        alert("Cannot enter so many digits");
        clearAll();
        return
    }

    let buttonValue = this.innerText;

    if (!currentOperator) {
        if (display.innerText === `0` || isResult) {
            display.innerText = buttonValue;
            firstValue = parseInt(display.innerText);
        } else {
            display.innerText += buttonValue;
            firstValue = parseFloat(display.innerText);
        }
    } else {
        if (display.innerText == `${firstValue}`) {
            display.innerText = buttonValue;
            secondValue = parseFloat(display.innerText);
        } else {
            display.innerText += buttonValue;
            secondValue = parseFloat(display.innerText);
        }

        if (currentOperatorBtn) {
            currentOperatorBtn.classList.remove("highlighted");
            currentOperatorBtn = null;
        }
    }

    isResult = false;
}

function selectOperator() {

    if ((secondValue || secondValue === 0)) {
        equals();
    }
    currentOperator = this.id;
    displayFull = false;
    decimalPointActive = false;
}

function highlightOperator() {

    if (currentOperatorBtn) {
        currentOperatorBtn.classList.remove("highlighted");
    }

    currentOperatorBtn = this;

    currentOperatorBtn.classList.add("highlighted");
}

function equals() {

    if ((secondValue || secondValue === 0)) {
        calculate();
        if (countDigits(firstValue) > 9) {
            alert("Cannot display more than 9 digits");
            clearAll();
            return;
        }
    }
    display.innerText = firstValue;
    currentOperator = "";
    if (currentOperatorBtn) {
        currentOperatorBtn.classList.remove("highlighted");
    }
    isResult = true;

}

function calculate() {
    firstValue = operate(currentOperator, firstValue, secondValue);
    if (countDecimals(firstValue) > 5) {
        firstValue = Math.round(firstValue * 100000) / 100000;
    }
    secondValue = "";
    decimalPointActive = false;

}

function highlightDigitBtn() {
    this.classList.toggle("highlighted");
}

function clearAll() {
    display.innerText = "0";
    firstValue = 0;
    secondValue = "";
    displayFull = false;
    decimalPointActive = false;

    if (currentOperatorBtn) {
        currentOperatorBtn.classList.remove("highlighted");
        currentOperatorBtn = null;
    }

    currentOperator = "";
}

function countDecimals(number) {
    number = number.toString();
    let hasDecimals = false;
    let decimalCounter = 0;

    for (let i = 0; i < number.length; i++) {
        if (hasDecimals) {
            decimalCounter++;
        }

        if (number[i] === "." || number[i] === ",") {
            hasDecimals = true;
        }
    }
    return decimalCounter;
}

function countDigits(number) {
    number = number.toString();
    return number.length;
}
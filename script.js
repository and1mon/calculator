const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const highlightOnClickBtns = document.querySelectorAll(".highlightOnClick");
const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const decimalPoint = document.getElementById("decimalPoint");

let currentOperatorBtn;
let firstValue = 0;
let fullValue = 0;
let secondValue = "";
let currentOperator = "";
let isResult = false;
let valueDisplayed = firstValue;
let displayFull = false;
let decimalPointActive = false;
let decimalValue = 0;

decimalPoint.addEventListener("click", () => { decimalPointActive = true; })

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
        case "add": return add(number1, number2);
            break;
        case "subtract": return subtract(number1, number2);
            break;
        case "multiply": return multiply(number1, number2);
            break;
        case "divide": return divide(number1, number2);
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
    console.log(divisor);
    if (divisor != 0) {
        return dividend / divisor;
    }
    alert("You cannot divide by zero!");
    return dividend;
}

function selectDigit() {

    if (countDigits(valueDisplayed) === 9 && (!currentOperator || currentOperator === "equals")) {
        displayFull = true;
    }

    if (displayFull) {
        alert("Cannot enter more than 9 digits");
        clearAll();
        return
    }

    let buttonValue = parseInt(this.innerText);

    if (isResult && currentOperator === "equals") {
        fullValue = buttonValue;
        firstValue = fullValue;
        isResult = false;
    }

    else if (!currentOperator || currentOperator === "equals") {
        if (decimalPointActive) {
            decimalValue *= 10;
            decimalValue += buttonValue;
            firstValue = fullValue + (decimalValue / Math.pow(10, countDigits(decimalValue)));
        }
        else {
            fullValue *= 10;
            fullValue += buttonValue;
            firstValue = fullValue;
        }
    }

    else {
        if (decimalPointActive) {
            decimalValue *= 10;
            decimalValue += buttonValue;
            secondValue = fullValue + (decimalValue / Math.pow(10, countDigits(decimalValue)));
        }
        else {
            fullValue *= 10;
            fullValue += buttonValue;
            secondValue = fullValue;
            currentOperatorBtn.classList.remove("highlighted");
        }
    }

    updateDisplay();
}

function updateDisplay() {
    if (!secondValue) {
        display.innerText = `${firstValue}`;
        valueDisplayed = firstValue;
    }
    else {
        display.innerText = `${secondValue}`
        valueDisplayed = secondValue;
    }
}

function selectOperator() {

    if (currentOperator != "equals" && (secondValue || secondValue === 0)) {
        calculate();
        if (firstValue > 999999999) {
            alert("Cannot display more than 9 digits");
            clearAll();
            return;
        }
    }
    isResult = true;

    currentOperator = this.id;
    displayFull = false;
    decimalPointActive = false;
    fullValue = 0;
    decimalValue = 0;
    updateDisplay();
}

function highlightOperator() {

    if (currentOperatorBtn) {
        currentOperatorBtn.classList.remove("highlighted");
    }

    currentOperatorBtn = this;

    if (currentOperatorBtn.classList.contains("mathSign")) {
        currentOperatorBtn.classList.add("highlighted");
    }
}

function calculate() {
    firstValue = operate(currentOperator, firstValue, secondValue);
    if (countDecimals(firstValue) > 5) {
        firstValue = Math.round(firstValue * 100000) / 100000;
    }
    secondValue = "";
    decimalValue = 0;
    fullValue = 0;
    decimalPointActive = false;
}

function highlightDigitBtn() {
    this.classList.toggle("highlighted");
}

function clearAll() {
    firstValue = 0;
    secondValue = "";
    displayFull = false;
    decimalValue = 0;
    fullValue = 0;
    decimalPointActive = false;

    if (currentOperatorBtn) {
        currentOperatorBtn.classList.remove("highlighted");
        currentOperatorBtn = null;
    }

    currentOperator = "";
    updateDisplay();
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

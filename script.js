const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.getElementById("display");
let highlightedOperator;
let firstValue = 0;
let secondValue = "";
let currentOperator;
let currentOperatorDisplay;



operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener("click", selectOperator)
});

digitButtons.forEach(digitButton => {
    digitButton.addEventListener("click", selectDigit)
});

function operate(operator, number1, number2) {
    return operator(number1, number2);
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
    return dividend / divisor;
}

function selectDigit() {

    let buttonValue = parseInt(this.innerText);

    if (!currentOperator) {
        firstValue *= 10;
        firstValue += buttonValue;
    }
    else {
        console.log("works")
        secondValue *= 10;
        secondValue += buttonValue;
    }


    updateDisplay();

}

function updateDisplay() {
    if (!currentOperator)
        display.innerText = `${firstValue}`;
    else {
        display.innerText = `${firstValue} ${currentOperatorDisplay} ${secondValue}`
    }
}

function selectOperator() {

    if (highlightedOperator) {
        highlightedOperator.classList.remove("highlighted");
    }
    currentOperator = this.id;
    highlightedOperator = this;
    highlightedOperator.classList.add("highlighted");

    setCurrentOperatorDisplay();

    updateDisplay();



}

function setCurrentOperatorDisplay() {
    switch (currentOperator) {
        case "add": currentOperatorDisplay = "+";
            break;
        case "subtract": currentOperatorDisplay = "-";
            break;
        case "multiply": currentOperatorDisplay = "*";
            break;
        case "divide": currentOperatorDisplay = "/";
            break;
    }
}

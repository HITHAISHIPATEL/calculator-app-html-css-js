// Access DOM elements for the calculator
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variables
let expression = '';
let result = '';

// Add event listeners to all buttons when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', buttonClick);
    });
});

function buttonClick(event) {
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // Switch case to control the calculator
    switch (action) {
        case 'number':
        case 'operator':
        case 'decimal':
            addValue(value);
            break;
        case 'equals':
            calculateResult();
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'negate':
            negate();
            break;
    }
    // Update display
    updateDisplay(expression, result);
}

function addValue(value) {
    // Add value to expression
    expression += value;
}

function calculateResult() {
    try {
        // Evaluate the expression and update the result
        result = eval(expression); // Replace eval with a safer alternative for production
    } catch (error) {
        result = 'Error';
    }
}

function backspace() {
    // Remove the last character from the expression
    expression = expression.slice(0, -1);
}

function negate() {
    // Negate the last number in the expression
    const match = expression.match(/(-?\d+\.?\d*)$/);
    if (match) {
        const lastNumber = match[0];
        const negatedNumber = lastNumber.startsWith('-') ? lastNumber.slice(1) : '-' + lastNumber;
        expression = expression.slice(0, -lastNumber.length) + negatedNumber;
    }
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression || '0';
    resultDiv.textContent = result || '';
}

function clear() {
    expression = '';
    result = '';
}

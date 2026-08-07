const display = document.getElementById("display");
const historyDisplay = document.getElementById("history-display");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "";
let historyText = "";

/* Add value to display */
function appendValue(value) {
    currentInput += value;
    display.value = currentInput;
}

/* Clear calculator */
function clearDisplay() {
    currentInput = "";
    historyText = "";

    display.value = "0";
    historyDisplay.textContent = "";
}

/* Delete last character */
function deleteLast() {
    currentInput = currentInput.slice(0, -1);

    display.value = currentInput || "0";
}

/* Calculate result */
function calculate() {

    if (!currentInput) {
        return;
    }

    try {

        let expression = currentInput;

        let result = eval(expression);

        if (!isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        historyDisplay.textContent = expression.replace(/\*/g, "×")
            .replace(/\//g, "÷") + " =";

        display.value = result;

        currentInput = result.toString();

    } catch (error) {

        display.value = "Error";
        currentInput = "";

        setTimeout(() => {
            display.value = "0";
        }, 1200);
    }
}


/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%" ||
        key === "."
    ) {
        appendValue(key);
    }

    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});


/* Light / Dark Theme */

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙";
    } else {
        themeToggle.textContent = "☀️";
    }

});
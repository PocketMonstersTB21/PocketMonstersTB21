function generateEmptyBoxes() {
    const playerIDContainer = document.getElementById("playerID");
    playerIDContainer.innerHTML = ""; // Clear previous content

    for (let i = 0; i < 12; i++) {
        let span = document.createElement("span");
        span.classList.add("digit");
        span.textContent = ""; // Initially empty
        playerIDContainer.appendChild(span);

        // Add a space separator after every 4 digits
        if ((i + 1) % 4 === 0 && i !== 11) {
            let separator = document.createElement("span");
            separator.classList.add("separator");
            separator.textContent = " ";
            playerIDContainer.appendChild(separator);
        }
    }
}

function generatePlayerID() {
    const digits = document.querySelectorAll(".digit");

    digits.forEach((digitBox) => {
        digitBox.textContent = Math.floor(Math.random() * 10); // Generate random number 0-9
    });
}

// Initialize empty boxes on page load
generateEmptyBoxes();
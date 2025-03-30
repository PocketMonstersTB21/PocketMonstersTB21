document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus(); // Always check login status on page load

    if (document.getElementById("loginForm")) {
        handleLogin(); // Only run login function if we're on the login page
    }

    if (document.getElementById("signupForm")) {
        handleSignup(); // Only run signup function if we're on the signup page
    }
});

function checkLoginStatus() {
    const loginSignup = document.getElementById("loginsignupbuttons");
    const profileButton = document.getElementById("profile-button");

    if (!loginSignup || !profileButton) return; // Prevent errors if elements aren't found

    if (localStorage.getItem("loggedIn") === "true") {
        loginSignup.classList.add("d-none");  // Hide login/signup buttons
        profileButton.classList.remove("d-none"); // Show profile button
    } else {
        loginSignup.classList.remove("d-none"); // Show login/signup buttons
        profileButton.classList.add("d-none");  // Hide profile button
    }
}

function handleLogin() {
    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Example authentication (Replace with actual backend validation)
            if (email === "user@pokemongo.com" && password === "pocketmonsters123") {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", email);

                // Redirect to landing page
                window.location.href = "../../../index.html";
            } else {
                alert("Invalid credentials! Please try again.");
            }
        });
    }
}

function handleSignup() {
    const form = document.getElementById("signupForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const reEnterPassword = document.getElementById("re-enterPassword").value;
            const ign = document.getElementById("ign").value;
            const playerID = document.getElementById("playerID").textContent;

            if (password !== reEnterPassword) {
                alert("Passwords do not match! Please try again.");
                return;
            }

            // Store data in localStorage
            localStorage.setItem("signupEmail", email);
            localStorage.setItem("signupPassword", password);
            localStorage.setItem("ign", ign);
            localStorage.setItem("playerID", playerID);

            alert("Signup successful! Please check your email for verification.");
            window.location.href = "../../../index.html"; // Redirect to landing page
        });
    }
}

function logout() {
    localStorage.removeItem("loggedIn"); // Remove login status
    localStorage.removeItem("username"); // Remove username
    location.reload(); // Refresh the page to update UI
}

document.addEventListener("DOMContentLoaded", function () {
    updateProfile(); // Load user info when page loads
});

function logout() {
    localStorage.clear();
    window.location.href = "../../../index.html"; // Redirect to landing page
}


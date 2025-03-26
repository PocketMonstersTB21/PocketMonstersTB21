//10 numbers to validate the code
function applyCode() {
    const code = document.getElementById('codeInput').value.trim();

    if (code === '') {
        alert('Please enter a valid code!');
    } else if (code.length < 10) {
        alert('The code must be at least 10 characters long.');
    } else {
        alert(`Code "${code}" applied successfully! 🎉`);
    }
}

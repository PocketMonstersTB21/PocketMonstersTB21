// ========== Track Selected Payment Option ==========
let selectedPaymentMethod = "";

// Select Payment Method
function selectPayment(method) {
    selectedPaymentMethod = method;

    // Remove 'selected' class from all buttons
    document.querySelectorAll(".payment-btn").forEach((btn) => {
        btn.classList.remove("selected");
    });

    // Add 'selected' class to the clicked button
    event.currentTarget.classList.add("selected");
}

// ========== Validate Payment Form ==========
function validateForm(event) {
    event.preventDefault();

    // Get input values
    let cardName = document.getElementById("cardName").value.trim();
    let cardNumber = document.getElementById("cardNumber").value.trim();
    let expDate = document.getElementById("expDate").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    // ===== Validate Payment Option =====
    if (selectedPaymentMethod === "") {
        alert("Please select a payment method.");
        return false;
    }

    // ===== Name Validation =====
    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        alert("Card holder name should contain only letters.");
        return false;
    }

    // ===== Card Number Validation =====
    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Card number must be exactly 16 digits.");
        return false;
    }

    // ===== Expiry Date Validation =====
    if (!validateExpiryDate(expDate)) {
        alert("Expiry date should be in MM/YYYY format and at least 1 year from today.");
        return false;
    }

    // ===== CVV Validation =====
    if (!/^\d{3}$/.test(cvv)) {
        alert("CVV must be exactly 3 digits.");
        return false;
    }

    // ===== Success Alert if Valid =====
    alert(`Transaction successful with ${selectedPaymentMethod}!`);
    clearForm();
    return false;
}

// ========== Expiry Date Validation ==========
function validateExpiryDate(expDate) {
    let regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(expDate)) {
        return false;
    }

    // Split month and year
    let [month, year] = expDate.split("/").map(Number);

    // Get current date
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    // Check if the year is valid and at least 1 year ahead
    if (year < currentYear + 1 || (year === currentYear + 1 && month <= currentMonth)) {
        return false;
    }
    return true;
}

// ========== Clear Form Fields ==========
function clearForm() {
    document.getElementById("paymentForm").reset();
    selectedPaymentMethod = "";
    document.querySelectorAll(".payment-btn").forEach((btn) => {
        btn.classList.remove("selected");
    });
}

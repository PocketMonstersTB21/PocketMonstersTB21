document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();
    attachEventListeners(); 
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = localStorage.getItem('cartTotal') || '0.00';

    const summaryItems = document.getElementById('summary-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cartItems.length === 0) {
        summaryItems.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        totalPriceElement.textContent = '0.00';
        return;
    }

    let itemsHTML = '';
    cartItems.forEach(item => {
        itemsHTML += `
            <div class="summary-item">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">x${item.quantity}</div>
                <div class="summary-item-price">₱${item.total.toFixed(2)}</div>
            </div>
        `;
    });

    summaryItems.innerHTML = itemsHTML;
    totalPriceElement.textContent = parseFloat(total).toFixed(2);
}


let selectedPaymentMethod = "";

function selectPayment(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll(".payment-btn").forEach((btn) => {
        btn.classList.remove("selected");
    });


    event.currentTarget.classList.add("selected");


    if (method === 'GCash') {
        document.getElementById('cardForm').style.display = 'none';
        document.getElementById('gcashForm').style.display = 'block';
        document.getElementById('otpContainer').style.display = 'none';
    } else {
        document.getElementById('cardForm').style.display = 'block';
        document.getElementById('gcashForm').style.display = 'none';
        document.getElementById('otpContainer').style.display = 'none';
    }
}

function validateCardForm() {
    let cardName = document.getElementById("cardName").value.trim();
    let cardNumber = document.getElementById("cardNumber").value.trim();
    let expDate = document.getElementById("expDate").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    if (selectedPaymentMethod === "") {
        alert("⚠️ Please select a payment method.");
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        alert("⚠️ Card holder name should contain only letters.");
        return false;
    }


    if (!/^\d{16}$/.test(cardNumber)) {
        alert("⚠️ Card number must be exactly 16 digits.");
        return false;
    }


    if (!validateExpiryDate(expDate)) {
        alert("⚠️ Expiry date should be in MM/YYYY format and at least 1 year from today.");
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert("⚠️ CVV must be exactly 3 digits.");
        return false;
    }


    alert(`✅ Payment successful with ${selectedPaymentMethod}! Thank you for your purchase.`);
    clearForm();
    clearCart();
}

function validateExpiryDate(expDate) {
    let regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(expDate)) return false;

    let [month, year] = expDate.split("/").map(Number);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;

    return !(year < currentYear + 1 || (year === currentYear + 1 && month <= currentMonth));
}

function sendOTP() {
    const name = document.getElementById('gcashName').value.trim();
    const number = document.getElementById('gcashNumber').value.trim();

    if (!name) {
        alert("⚠️ Please enter your full name.");
        return;
    }

    if (!/^09\d{9}$/.test(number)) {
        alert("⚠️ Please enter a valid 11-digit mobile number starting with 09.");
        return;
    }

    document.getElementById('gcashForm').style.display = 'none';
    document.getElementById('otpContainer').style.display = 'block';

    alert("📩 OTP sent to your mobile number. Please check your messages.");
}

function verifyOTP() {
    const otpDigits = document.querySelectorAll('#otpContainer .otp-digit');
    let otp = '';

    otpDigits.forEach(input => {
        otp += input.value;
    });

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        alert("⚠️ Please enter a valid 6-digit OTP.");
        return;
    }

    alert("✅ GCash payment successful! Thank you for your purchase.");
    clearForm();
    clearCart();
}

function clearForm() {
    document.getElementById("cardForm").reset();
    document.getElementById("gcashForm").reset();

    document.querySelectorAll('.otp-digit').forEach(input => {
        input.value = '';
    });

    selectedPaymentMethod = "";
    document.querySelectorAll(".payment-btn").forEach((btn) => {
        btn.classList.remove("selected");
    });

    document.getElementById('cardForm').style.display = 'block';
    document.getElementById('gcashForm').style.display = 'none';
    document.getElementById('otpContainer').style.display = 'none';
}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
    loadCartItems();
}

function moveToNext(current) {
    if (current.value.length === 1) {
        const nextInput = current.nextElementSibling;
        if (nextInput && nextInput.classList.contains('otp-digit')) {
            nextInput.focus();
        }
    }
}

function attachEventListeners() {
    document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            selectPayment(this.querySelector('input').value);
        });
    });

    const cardConfirmBtn = document.getElementById('confirmCardPayment');
    if (cardConfirmBtn) {
        cardConfirmBtn.addEventListener('click', validateCardForm);
    }


    const otpConfirmBtn = document.getElementById('confirmOtpPayment');
    if (otpConfirmBtn) {
        otpConfirmBtn.addEventListener('click', verifyOTP);
    }
}

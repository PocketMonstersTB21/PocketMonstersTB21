
let quantities = [0, 0, 0, 0, 0, 0];
let prices = [150, 150, 150, 150, 150, 150];
let items = [
    "Ultra Raid Box",
    "Ultra Hatch Box",
    "Might and Mastery Box",
    "Ultra Community Day Box",
    "Deep Depths Ultra Ticket Box",
    "Mega Absol Raid Day Ultra Ticket Box"
];

document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateSummary();
});


function changeQuantity(change, index) {
    let inputField = document.getElementById(`quantity-${index}`);
    let newQuantity = parseInt(inputField.value) + change;

    if (newQuantity >= 0) {
        quantities[index] = newQuantity;
        inputField.value = newQuantity;
        updateSummary();
    }
}


function updateSummary() {
    const summaryItems = document.getElementById('summary-items');
    const totalPriceElement = document.getElementById('total-price');
    
    let total = 0;
    let itemsHTML = '';
    let hasItems = false;
    
    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] > 0) {
            hasItems = true;
            const itemTotal = quantities[i] * prices[i];
            total += itemTotal;
            
            itemsHTML += `
                <div class="summary-item">
                    <div class="summary-item-name">${items[i]}</div>
                    <div class="summary-item-qty">x${quantities[i]}</div>
                    <div class="summary-item-price">₱${itemTotal.toFixed(2)}</div>
                </div>
            `;
        }
    }
    
    if (!hasItems) {
        itemsHTML = '<p class="empty-message">No items added yet</p>';
    }
    
    summaryItems.innerHTML = itemsHTML;
    totalPriceElement.textContent = total.toFixed(2);
}

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    quantities = [0, 0, 0, 0, 0, 0];
    
    cartItems.forEach(item => {
        const index = items.indexOf(item.name);
        if (index !== -1) {
            quantities[index] = item.quantity;
            const inputField = document.getElementById(`quantity-${index}`);
            if (inputField) {
                inputField.value = item.quantity;
            }
        }
    });
    
    updateSummary();
}

function checkoutCart() {
    const total = calculateTotal();
    if (total <= 0) {
        alert('Please add items to your cart before checking out.');
        return;
    }
    
    localStorage.setItem('cartTotal', total);
    localStorage.setItem('cartItems', JSON.stringify(getCartItems()));
    
    window.location.href = '../page5/payment.html';
}


function calculateTotal() {
    let total = 0;
    for (let i = 0; i < quantities.length; i++) {
        total += quantities[i] * prices[i];
    }
    return total;
}

function getCartItems() {
    const cartItems = [];
    for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] > 0) {
            cartItems.push({
                name: items[i],
                quantity: quantities[i],
                price: prices[i],
                total: quantities[i] * prices[i]
            });
        }
    }
    return cartItems;
}
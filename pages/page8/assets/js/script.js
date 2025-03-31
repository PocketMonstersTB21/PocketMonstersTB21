
let quantities = [1, 1, 1, 1, 1];


function changeQuantity(change, index) {
    let inputField = document.getElementById(`quantity-${index}`);
    let newQuantity = parseInt(inputField.value) + change;

    if (newQuantity >= 1) {
        quantities[index] = newQuantity;
        inputField.value = newQuantity;
    }
}

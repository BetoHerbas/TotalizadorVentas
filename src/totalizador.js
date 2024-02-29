function calculateNetPrice(price, quantity) {
  return price * quantity;
}
function calculateTaxes(netPrice, state){
  return +(netPrice * 0.0825).toFixed(3);
}
function calculateTote (price, quantity, state) {
  let netPrice = calculateNetPrice(price, quantity)
  let totalPrice =  netPrice + calculateTaxes(netPrice, state);
  return +(totalPrice).toFixed(3);
}

export {calculateNetPrice, calculateTaxes, calculateTote};

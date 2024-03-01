function calculateNetPrice(price, quantity) {
  return price * quantity;
}
function calculateTaxes(netPrice, state) {
  switch (state) {
    case "CA":
      return +(netPrice * 0.0825).toFixed(3);
    case "NV":
      return +(netPrice * 0.08).toFixed(3);
    case "UT":
      return +(netPrice * 0.0665).toFixed(3);
    case "TX":
      return +(netPrice * 0.0625).toFixed(3);
    case "AL":
      return +(netPrice * 0.04).toFixed(3);
    default:
      return 0;
  }
}
function calculateTote(price, quantity, state) {
  let netPrice = calculateNetPrice(price, quantity)
  let totalPrice = netPrice + calculateTaxes(netPrice, state);
  return +(totalPrice).toFixed(3);
}

export { calculateNetPrice, calculateTaxes, calculateTote };

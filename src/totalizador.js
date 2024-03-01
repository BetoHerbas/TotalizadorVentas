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

function calculateDiscount(netPrice) {
  if (netPrice >= 1000 && netPrice < 3000) {
    return +(netPrice * 0.03).toFixed(3);
  }
  else if(netPrice >= 3000 && netPrice < 7000){
    return +(netPrice * 0.05).toFixed(3);
  }
  else if(netPrice >= 7000 && netPrice < 10000){
    return +(netPrice * 0.07).toFixed(3);
  }
  else if(netPrice >= 10000 && netPrice < 30000){
    return +(netPrice * 0.1).toFixed(3);
  }
  else if(netPrice >= 30000){
    return +(netPrice * 0.15).toFixed(3);
  }
  return 0;
}

function taxByProductCategory(netPrice, category)
{
  if(category === "alcoholic"){
    return +(netPrice * 0.07).toFixed(3);
  }
  return 0;

}

function calculateTote(price, quantity, state, category) {
  let netPrice = calculateNetPrice(price, quantity);
  let discount =  calculateDiscount(netPrice);
  let priceWithDiscount = netPrice - discount;
  let taxesByState = calculateTaxes(priceWithDiscount, state);
  let taxesByProductCategory = taxByProductCategory(netPrice, category);
  let totalPrice = priceWithDiscount + taxesByState + taxesByProductCategory;
  return +(totalPrice).toFixed(3);
}

export { calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount, taxByProductCategory };
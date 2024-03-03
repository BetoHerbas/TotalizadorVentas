import { calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount, taxByProductCategory, calculateShippingCost, discountByProductCategory, discountByClientCategoryOnShippingCost, discountFixedAmount, validateInputs } from "./totalizador.js";

const price_input = document.querySelector("#price");
const quantity_input = document.querySelector("#quantity");
const state_input = document.querySelector("#state");
const form = document.querySelector("#tote-form");
const divNetPrice = document.querySelector("#netPrice-div");
const divTaxes = document.querySelector("#taxes-div");
const divTotalPrice = document.querySelector("#totalPrice-div");
const divDiscount = document.querySelector("#discount-div");
const itemCategoryInput = document.querySelector("#itemCategory");
const clientCategoryInput = document.querySelector("#clientCategory");
const divTaxByProductCategory = document.querySelector("#itemCategoryTax-div")
const volumetricWeightInput = document.querySelector("#weight");
const divShippingCost = document.querySelector("#shippingCost-div");
const discountByProductCategoryDiv = document.querySelector("#discountByProductCategory-div");
const discountByClientCategoryOnShippingCostDiv = document.querySelector("#discountByClientCategoryOnShippingCost-div");
const discountFixedAmountDiv = document.querySelector('#discountFixedAmount-div')


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = Number.parseInt(price_input.value);
  const quantity = Number.parseInt(quantity_input.value);
  const state = state_input.value;
  const productCategory = itemCategoryInput.value;
  const weight = volumetricWeightInput.value;
  const clientCategory = clientCategoryInput.value;

  switch (validateInputs(price, quantity)) {
    case "price":
      alert("The price must be greater than 0.");
      break;
    case "quantity":
      alert("The quantity must be greater than 0.");
      break;
    default:
      let netPrice = calculateNetPrice(price, quantity);
      let shippingCost = calculateShippingCost(weight);

      let discountOfNetPrice = calculateDiscount(netPrice);
      let priceWithDiscount = netPrice - discountOfNetPrice;

      divNetPrice.innerHTML = "<p>" + netPrice + "</p>";
      divDiscount.innerHTML = "<p>" + discountOfNetPrice + "</p>";
      divTaxes.innerHTML = "<p>" + calculateTaxes(priceWithDiscount, state) + "</p>";


      divTaxByProductCategory.innerHTML = "<p>" + taxByProductCategory(netPrice, productCategory) + "</p>";
      divShippingCost.innerHTML = "<p>" + shippingCost + "</p>";
      discountByProductCategoryDiv.innerHTML = "<p>" + discountByProductCategory(netPrice, productCategory) + "</p>";
      discountByClientCategoryOnShippingCostDiv.innerHTML = "<p>" + discountByClientCategoryOnShippingCost(shippingCost, clientCategory) + "</p>";
      discountFixedAmountDiv.innerHTML = "<p>" + discountFixedAmount(netPrice, productCategory, clientCategory) + "</p>";

      divTotalPrice.innerHTML = "<p>" + calculateTote(price, quantity, state, productCategory, weight, clientCategory) + "</p>";
      break;
  }
});
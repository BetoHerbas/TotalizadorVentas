import { calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount, taxByProductCategory, calculateShippingCost, discountByProductCategory, discountByClientCategoryOnShippingCost, discountFixedAmount} from "./totalizador.js";

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
  let netPrice = calculateNetPrice(price, quantity);
  let shippingCost = calculateShippingCost(weight);

  divNetPrice.innerHTML = "<p>" + netPrice + "</p>";
  divTaxes.innerHTML = "<p>" + calculateTaxes(netPrice, state) + "</p>";

  divDiscount.innerHTML = "<p>" + calculateDiscount(netPrice) + "</p>";
  divTaxByProductCategory.innerHTML = "<p>" + taxByProductCategory(netPrice, productCategory) + "</p>";
  divShippingCost.innerHTML = "<p>" + shippingCost + "</p>";
  discountByProductCategoryDiv.innerHTML = "<p>" + discountByProductCategory(netPrice, productCategory) + "</p>";
  discountByClientCategoryOnShippingCostDiv.innerHTML = "<p>" + discountByClientCategoryOnShippingCost(shippingCost, clientCategory) + "</p>";
  discountFixedAmountDiv.innerHTML = "<p>" + discountFixedAmount(netPrice, productCategory, clientCategory) + "</p>";

  divTotalPrice.innerHTML = "<p>" + calculateTote(price, quantity, state, productCategory, weight, clientCategory) + "</p>";
});
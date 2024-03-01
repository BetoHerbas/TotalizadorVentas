import {calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount, taxByProductCategory} from "./totalizador.js";

const price_input = document.querySelector("#price");
const quantity_input = document.querySelector("#quantity");
const state_input = document.querySelector("#state");
const form = document.querySelector("#tote-form");
const divNetPrice = document.querySelector("#netPrice-div");
const divTaxes = document.querySelector("#taxes-div");
const divTotalPrice = document.querySelector("#totalPrice-div");
const divDiscount = document.querySelector("#discount-div");
const itemCategoryInput = document.querySelector("#itemCategory")
const divTaxByProductCategory = document.querySelector("#itemCategoryTax-div")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = Number.parseInt(price_input.value);
  const quantity = Number.parseInt(quantity_input.value);
  const state = state_input.value;
  const category = itemCategoryInput.value;

  divNetPrice.innerHTML = "<p>" + calculateNetPrice(price, quantity) + "</p>";
  divTaxes.innerHTML = "<p>" + calculateTaxes(calculateNetPrice(price, quantity), state) + "</p>";

  divDiscount.innerHTML = "<p>" + calculateDiscount(calculateNetPrice(price, quantity)) + "</p>";
  divTaxByProductCategory.innerHTML = "<p>" + taxByProductCategory(calculateNetPrice(price, quantity), category) + "</p>";

  divTotalPrice.innerHTML = "<p>" + calculateTote(price, quantity,state, category) + "</p>";
});
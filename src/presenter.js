import {calculateNetPrice, calculateTaxes, calculateTote} from "./totalizador.js";

const price_input = document.querySelector("#price");
const quantity_input = document.querySelector("#quantity");
const state_input = document.querySelector("#state");
const form = document.querySelector("#tote-form");
const divNetPrice = document.querySelector("#netPrice-div");
const divTaxes = document.querySelector("#taxes-div");
const divTotalPrice = document.querySelector("#totalPrice-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = Number.parseInt(price_input.value);
  const quantity = Number.parseInt(quantity_input.value);
  const state = state_input.value;

  divNetPrice.innerHTML = "<p>" + calculateNetPrice(price, quantity) + "</p>";
  divTaxes.innerHTML = "<p>" + calculateTaxes(calculateNetPrice(price, quantity), state) + "</p>";
  divTotalPrice.innerHTML = "<p>" + calculateTote(price, quantity,state) + "</p>";
});
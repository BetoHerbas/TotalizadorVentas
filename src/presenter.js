import netPrice from "./totalizador";

const price_input = document.querySelector("#price");
const form = document.querySelector("#tote-form");
const div = document.querySelector("#netPrice-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const price = Number.parseInt(price_input.value);

  div.innerHTML = "<p>" + netPrice(price) + "</p>";
});

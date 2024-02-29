import {calculateNetPrice, calculateTaxes, calculateTote} from "./totalizador.js";

describe("Net price ", () => {
  it("should return the net price with the quantity of one item", () => {
    expect(calculateNetPrice(3, 1)).toEqual(3);
  });
  it("should return the net price with the quantity of items and prices", () => {
    expect(calculateNetPrice(5, 10)).toEqual(50);
  });
});
describe("Taxes according to state", () => {
  it("should return the taxes of the state CA, 8.25%", () => {
    expect(calculateTaxes(10, "CA")).toEqual(0.825);
  });
});
describe("Price plus taxes of state", () => {
  it("should return the net price plus taxes of the state CA, 8.25%", () => {
    expect(calculateTote(5, 10, "CA")).toEqual(54.125);
  });
  it("should return the net price plus taxes of the state NV, 8.0%", () => {
    expect(calculateTote(100, 1, "NV")).toEqual(108);
  });
});
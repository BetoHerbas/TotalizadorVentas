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
  it("should return the taxes of the state NV, 8.00%", () => {
    expect(calculateTaxes(10, "NV")).toEqual(0.8);
  });
  it("should return the taxes of the state UT, 6.65%", () => {
    expect(calculateTaxes(10, "UT")).toEqual(0.665);
  });
  it("should return the taxes of the state TX, 6.25%", () => {
    expect(calculateTaxes(10, "TX")).toEqual(0.625);
  });
});
describe("Price plus taxes of state", () => {
  it("should return the net price plus taxes of the state CA, 8.25%", () => {
    expect(calculateTote(5, 10, "CA")).toEqual(54.125);
  });
  it("should return the net price plus taxes of the state NV, 8.0%", () => {
    expect(calculateTote(100, 1, "NV")).toEqual(108);
  });
  it("should return the net price plus taxes of the state UT, 6.65%", () => {
    expect(calculateTote(100, 1, "UT")).toEqual(106.65);
  });
  it("should return the net price plus taxes of the state TX, 6.25%", () => {
    expect(calculateTote(100, 1, "TX")).toEqual(106.25);
  });
});
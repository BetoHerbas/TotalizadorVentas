import {calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount} from "./totalizador.js";

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
  it("should return the taxes of the state AL, 4.00%", () => {
    expect(calculateTaxes(10, "AL")).toEqual(0.4);
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
  it("should return the net price plus taxes of the state AL, 4.00%", () => {
    expect(calculateTote(100, 1, "AL")).toEqual(104);
  });
});
describe("Discount acording to net price", () => {
  it("should return 0 if the net price in minor to 1000", () => {
    expect(calculateDiscount(5)).toEqual(0);
  });
  it("should return 3% of the net price if the net price is equal or major to 1000", () => {
    expect(calculateDiscount(1000)).toEqual(30);
  });
  it("should return 3% of the net price if the net price is equal or major to 1000 and minor to 3000", () => {
    expect(calculateDiscount(2000)).toEqual(60);
  });
  it("should return 5% of the net price if the net price is equal or major to 3000", () => {
    expect(calculateDiscount(4000)).toEqual(200);
  });
  it("should return 5% of the net price if the net price is equal or major to 3000 and minor to 7000", () => {
    expect(calculateDiscount(5000)).toEqual(250);
  });
  it("should return 7% of the net price if the net price is equal or major to 7000", () => {
    expect(calculateDiscount(7000)).toEqual(490);
  });
  it("should return 10% of the net price if the net price is equal or major to 10000", () => {
    expect(calculateDiscount(10000)).toEqual(1000);
  });
  it("should return 10% of the net price if the net price is equal or major to 10000 and minor to 30000", () => {
    expect(calculateDiscount(20000)).toEqual(2000);
  });
  it("should return 15% of the net price if the net price is equal or major to 30000", () => {
    expect(calculateDiscount(30000)).toEqual(4500);
  });
});
describe("Price minus discount plus taxes", () => {
  it("should return the price minus discount (>= 1000 and <=3000) plus taxes of the state CA", () => {
    expect(calculateTote(1000, 1,"CA")).toEqual(1050.025);
  });
  it("should return the price minus discount (>= 3000 and <=7000) plus taxes of the state NV", () => {
    expect(calculateTote(3000, 1,"NV")).toEqual(3078);
  });
  it("should return the price minus discount (>= 7000 and <=10000) plus taxes of the state UT", () => {
    expect(calculateTote(7000, 1,"UT")).toEqual(6942.915);
  });
  it("should return the price minus discount (>= 10000 and <=30000) plus taxes of the state TX", () => {
    expect(calculateTote(10000, 1,"TX")).toEqual(9562.5);
  });
  it("should return the price minus discount (>= 30000) plus taxes of the state AL", () => {
    expect(calculateTote(30000, 1,"AL")).toEqual(26520);
  });
});
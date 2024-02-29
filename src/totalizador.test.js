import netPrice from "./totalizador.js";

describe("Net price ", () => {
  it("should return the net price with the quantity of one item", () => {
    expect(netPrice(3, 1)).toEqual(3);
  });
  it("should return the net price with the quantity of items and prices", () => {
    expect(netPrice(5, 10)).toEqual(50);
  });
});

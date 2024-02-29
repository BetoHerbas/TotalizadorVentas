import netPrice from "./totalizador.js";

describe("Net price ", () => {
  it("should return the net price with the quantity of one item", () => {
    expect(netPrice(3)).toEqual(3);
  });
});

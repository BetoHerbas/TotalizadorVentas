import { calculateNetPrice, calculateTaxes, calculateTote, calculateDiscount, taxByProductCategory, calculateShippingCost, discountByProductCategory, discountByClientCategoryOnShippingCost, discountFixedAmount } from "./totalizador.js";

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
    expect(calculateTote(1000, 1, "CA")).toEqual(1050.025);
  });
  it("should return the price minus discount (>= 3000 and <=7000) plus taxes of the state NV", () => {
    expect(calculateTote(3000, 1, "NV")).toEqual(3078);
  });
  it("should return the price minus discount (>= 7000 and <=10000) plus taxes of the state UT", () => {
    expect(calculateTote(7000, 1, "UT")).toEqual(6942.915);
  });
  it("should return the price minus discount (>= 10000 and <=30000) plus taxes of the state TX", () => {
    expect(calculateTote(10000, 1, "TX")).toEqual(9562.5);
  });
  it("should return the price minus discount (>= 30000) plus taxes of the state AL", () => {
    expect(calculateTote(30000, 1, "AL")).toEqual(26520);
  });
});
describe("Tax by item type", () => {
  it("should return 7% of the net price for de purchase of alcoholic drinks ", () => {
    expect(taxByProductCategory(1000, "alcoholic")).toEqual(70);
  });
  it("should return 4% of the net price for de purchase of electronics items", () => {
    expect(taxByProductCategory(1000, "electronics")).toEqual(40);
  });
  it("should return 3% of the net price for de purchase of furniture", () => {
    expect(taxByProductCategory(1000, "furniture")).toEqual(30);
  });
  it("should return 2% of the net price for purchase of clothes", () => {
    expect(taxByProductCategory(1000, "clothing")).toEqual(20);
  });
  it("should return 0% of the net price for purchase of food", () => {
    expect(taxByProductCategory(1000, "food")).toEqual(0);
  });
  it("should return 0% of the net price for purchase of stationery", () => {
    expect(taxByProductCategory(1000, "stationery")).toEqual(0);
  });
  it("should return 0% of the net price for purchase of various products", () => {
    expect(taxByProductCategory(1000, "various")).toEqual(0);
  });
});

describe("Total with taxes by category product", () => {
  it("should return net price + taxes by state + taxes for de purchase of alcoholic drinks - discount by amount ", () => {
    expect(calculateTote(100, 1, "AL", "alcoholic")).toEqual(111);
  });
  it("should return net price + taxes by state + taxes for de purchase of electronics items - discount by amount ", () => {
    expect(calculateTote(100, 1, "AL", "electronics")).toEqual(107);
  });
  it("should return net price + taxes by state + taxes for de purchase of furniture - discount by amount ", () => {
    expect(calculateTote(100, 1, "AL", "furniture")).toEqual(107);
  });
});

describe("Shipping cost", () => {
  it("should return 0 if the volumetric weight is minor to 200", () => {
    expect(calculateShippingCost(1)).toEqual(0);
  });
  it("should return 9 if the volumetric weight is major to 200", () => {
    expect(calculateShippingCost(250)).toEqual(9);
  });
  it("should return 8 if the volumetric weight is major equal to 101 and minor to 200", () => {
    expect(calculateShippingCost(150)).toEqual(8);
  });
  it("should return 6.5 if the volumetric weight is major equal to 80 and minor equal to 100", () => {
    expect(calculateShippingCost(90)).toEqual(6.5);
  });
  it("should return 6 if the volumetric weight is major equal to 41 and minor equal to 80", () => {
    expect(calculateShippingCost(70)).toEqual(6);
  });
  it("should return 5 if the volumetric weight is major equal to 21 and minor equal to 40", () => {
    expect(calculateShippingCost(30)).toEqual(5);
  });
  it("should return 3.5 if the volumetric weight is major equal to 11 and minor equal to 20", () => {
    expect(calculateShippingCost(14)).toEqual(3.5);
  });
  it("should return 0 if the volumetric weight is minor equal to 10", () => {
    expect(calculateShippingCost(10)).toEqual(0);
  });
});

describe("Total with shipping cost", () => {
  it("should return net price + shipping cost + taxes by state + taxes for de purchase of alcoholic drinks - discount by amount ", () => {
    expect(calculateTote(100, 1, "AL", "alcoholic", 300)).toEqual(120);
  });
});

describe("Discount by product category", () => {
  it("should return 0% of the net price for the purchase of alcoholic drinks", () => {
    expect(discountByProductCategory(1000, "alcoholic")).toEqual(0);
  });
  it("should return 0% of the net price for the purchase of clothes", () => {
    expect(discountByProductCategory(1000, "clothing")).toEqual(0);
  });
  it("should return 0% of the net price for the purchase of furniture", () => {
    expect(discountByProductCategory(1000, "furniture")).toEqual(0);
  });
  it("should return 0% of the net price for the purchase of various products", () => {
    expect(discountByProductCategory(1000, "various")).toEqual(0);
  });
  it("should return 1% of the net price for the purchase of electronic products", () => {
    expect(discountByProductCategory(1000, "electronics")).toEqual(10);
  });
  it("should return 1.5% of the net price for the purchase of stationary", () => {
    expect(discountByProductCategory(1000, "stationary")).toEqual(15);
  });
  it("should return 2% of the net price for the purchase of food", () => {
    expect(discountByProductCategory(1000, "food")).toEqual(20);
  });
});

describe("Total with discount by category product", () => {
  it("should return net price + discount by category product + shipping cost + taxes by state + taxes for de purchase of alcoholic drinks - discount by amount ", () => {
    expect(calculateTote(100, 1, "AL", "alcoholic", 300)).toEqual(120);
  });
});

describe("Discount by client category on shipping cost", () => {
  it("should return 0% of the shipping cost for standard clients", () => {
    expect(discountByClientCategoryOnShippingCost(1000, "standard")).toEqual(0);
  });
  it("should return 0.5% of the shipping cost for recurring clients", () => {
    expect(discountByClientCategoryOnShippingCost(1000, "recurring")).toEqual(5);
  });
  it("should return 1% of the shipping cost for old recurring clients", () => {
    expect(discountByClientCategoryOnShippingCost(1000, "oldRecurring")).toEqual(10);
  });
  it("should return 1.5% of the shipping cost for special client", () => {
    expect(discountByClientCategoryOnShippingCost(1000, "special")).toEqual(15);
  });
});

describe("Total with discount by client category on shipping cost", () => {
  it("should return previous price - discount by standard client category on shipping cost", () => {
    expect(calculateTote(100, 1, "AL", "alcoholic", 300, "standard")).toEqual(120);
  });
  it("should return previous price - discount by old recurring client category on shipping cost", () => {
    expect(calculateTote(1000, 10, "UT", "alcoholic", 600, "oldRecurring")).toEqual(10307.41);
  });
});

describe("Discount of fixed amount", () => {
  it("should return 100 if the client is recurring, the net price is major to 3000 and for food category", () => {
    expect(discountFixedAmount(5000, "food", "recurring")).toEqual(100);
  });
  it("should return 0 if the client isn't recurring or the net price isn't major to 3000 or for another product category", () => {
    expect(discountFixedAmount(5000, "furniture", "recurring")).toEqual(0);
  });
  it("should return 200 if the client is special, the net price is major to 7000 and for electronics category", () => {
    expect(discountFixedAmount(8000, "electronics", "special")).toEqual(200);
  });
});

describe("Total with discount of fixed amount", () => {
  it("should return previous price - discount of fixed amount", () => {
    expect(calculateTote(50000, 1, "AL", "food", 300, "recurring")).toEqual(43108.955);
  });
});
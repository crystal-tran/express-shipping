"use strict";

const fetchMock = require("fetch-mock");

let {
  shipProduct,
  SHIPIT_SHIP_URL
} = require("./shipItApi");

// shipProduct = jest.fn();


test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    body: {
      itemId: 1000,
      name: "Test",
      addr: "123 Test",
      zip: "1234",
      shipId: 700
     },
    status: 200
  });

  const order = {
    productId: 1000,
    name: "Test",
    addr: "123 Test",
    zip: "1234"
  }

  const res = await shipProduct(order);

  console.log('res:', res);

  expect(res.body.receipt.shipId).toEqual(700);
});

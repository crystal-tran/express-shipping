"use strict";

const fetchMock = require("fetch-mock");

let {
  shipProduct,
  SHIPIT_SHIP_URL,
  SHIPIT_API_KEY
} = require("./shipItApi");

// shipProduct = jest.fn();


test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    body: {
      receipt: {
          itemId: 1000,
          name: "Test",
          addr: "123 Test",
          zip: "1234",
          shipId: 700
         },
      },
    status: 200
    });

  // const order = {
  //   productId: 1000,
  //   name: "Test",
  //   addr: "123 Test",
  //   zip: "1234",
  //   key: SHIPIT_API_KEY
  // }

  const res = await shipProduct({
    productId: 1000,
    name: "Test",
    addr: "123 Test",
    zip: "1234",
    key: SHIPIT_API_KEY
  });

  console.log('res:', res);

  expect(res).toEqual(700);
});

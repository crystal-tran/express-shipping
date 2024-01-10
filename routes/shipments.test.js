"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });
});

describe("POST /with-validation", function () {
  test("validates good JSON data/ w/ jsonschema", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });

    expect(resp.body).toEqual({ shipped: expect.any(Number) })
  });

  test("valides bad JSON data/ w/ jsonschema", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });
      // TODO: ^ consider breaking more things for test (like empty JSON body)
      // test for missing required pieces

    expect(resp.statusCode).toEqual(400);
  });


})
//TODO: write tests to demonstrate error JSON is returned to user of your API
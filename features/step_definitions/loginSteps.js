const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

let response;
const baseURL = process.env.BASE_URL;
let loginPayload;

Given('the user has valid login credentials', function () {
  loginPayload = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  };
});

Given('the user has invalid login credentials', function () {
  loginPayload = {
    email: "invalid@reqres.in",
    password: "wrongpassword"
  };
});

When('the user sends a login request', async function () {
  try {
    response = await axios.post(`${baseURL}/login`, loginPayload);
  } catch (err) {
    response = err.response;
  }
});

Then('the user should receive a successful login response with token', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(typeof response.data.token, 'string');
});

Then('the user should receive a login failure response with error message', function () {
  assert.strictEqual(response.status, 400);
  assert.strictEqual(response.data.error, 'user not found');
});

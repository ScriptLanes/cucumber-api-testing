const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

let response;
let userId;
const baseURL = process.env.BASE_URL;

Given('the user ID is {int}', function (id) {
  userId = id;
});

When('the user sends a request to list a single user', async function () {
  try {
    response = await axios.get(`${baseURL}/users/${userId}`);
  } catch (err) {
    response = err.response;
  }
});

Then('the user should receive a successful response with user details', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.data.id, userId);
});

Then('the user should receive a failure response with an empty object', function () {
  assert.strictEqual(response.status, 404);
  assert.deepStrictEqual(response.data, {});
});

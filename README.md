# Cucumber.js API Test Project with Reqres API

This project is set up to run automated API tests using Cucumber.js and the Reqres API. It supports different environments (Development, Staging, Production) and generates environment-specific reports.

## Prerequisites

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)
- Install Cucumber (Gherkin) Full Support Extension for VSCode

## Installation

1. Clone the repository:
   
   ```sh
   git clone https://github.com/ScriptLanes/cucumber-api-testing.git
   cd cucumber-api-testing
   ```

2. Install the dependencies:
   
   ```sh
   npm install
   ```

## Environment Setup

Create environment variable files for different environments:

- **.env.development**:
  
  ```plaintext
  BASE_URL=https://dev.reqres.in/api
  ```

- **.env.staging**:
  
  ```plaintext
  BASE_URL=https://stage.reqres.in/api
  ```

- **.env.production**:
  
  ```plaintext
  BASE_URL=https://reqres.in/api
  ```

## Configuration

The `cucumber.js` configuration file dynamically sets the report file name based on the environment:

```js
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const reportName = `report-${env}.html`;

module.exports = {
  default: {
    parallel: 2,
    format: [`html:${path.join(__dirname, reportName)}`]
  }
};
```

## Running Tests

You can run tests for different environments using the following commands:

- **Development**:
  
  ```sh
  npm run test:dev
  ```

- **Staging**:
  
  ```sh
  npm run test:staging
  ```

- **Production**:
  
  ```sh
  npm run test:prod
  ```

## Project Structure

```
cucumber-api-test/
├── features/
│   ├── login.feature
│   └── step_definitions/
│       └── loginSteps.js
├── node_modules/
├── .env
├── .env.development
├── .env.staging
├── .env.production
├── cucumber.js
├── package.json
├── package-lock.json
└── README.md
```

## Feature File

Define your scenarios in the feature file (`features/login.feature`):

```gherkin
Feature: User Login

Scenario: User logs in successfully
  Given the user has valid login credentials
  When the user sends a login request
  Then the user should receive a successful login response with token

Scenario: User fails to log in with invalid credentials
  Given the user has invalid login credentials
  When the user sends a login request
  Then the user should receive a login failure response with error message
```

## Step Definitions

Implement the step definitions (`features/step_definitions/loginSteps.js`):

```js
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
```

## Generating Reports

After running the tests, reports will be generated in the project directory with names based on the environment:

- `report-development.html`
- `report-staging.html`
- `report-production.html`

You can open these HTML files in a browser to view the test reports.

# 

Feature: User Login

Scenario: User logs in successfully
  Given the user has valid login credentials
  When the user sends a login request
  Then the user should receive a successful login response with token

Scenario: User fails to log in with invalid credentials
  Given the user has invalid login credentials
  When the user sends a login request
  Then the user should receive a login failure response with error message

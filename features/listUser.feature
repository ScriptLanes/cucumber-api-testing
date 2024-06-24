Feature: List Single User

Scenario: Successfully list a single user
  Given the user ID is 2
  When the user sends a request to list a single user
  Then the user should receive a successful response with user details

Scenario: Fail to list a user with non-existing ID
  Given the user ID is 23
  When the user sends a request to list a single user
  Then the user should receive a failure response with an empty object

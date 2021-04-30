@broker
Feature: [BROKER] Permissions Smoke Testing 2 
    Scenario: I want to log in to Broker with read-only persmissions
        Given on the "broker-dev.usaspending.gov" page
        When we click on MAX sign in button
        And we log in with read only permissions
        And we click on MAX login button
        Then we see that we are logged in with read only permissions
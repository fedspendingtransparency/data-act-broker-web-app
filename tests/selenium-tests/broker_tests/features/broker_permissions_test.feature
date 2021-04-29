@broker
Feature: [BROKER] Permissions Smoke Testing 1 
    Scenario: I want to log in to Broker with full permissions
        Given On the broker homepage
        When we click on MAX sign in button
        And we enter username and password
        And we click on MAX login button
        Then we see that we are logged into Broker

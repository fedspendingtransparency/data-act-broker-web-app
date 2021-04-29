@broker
Feature: [BROKER] DABS Submission Dashboard Smoke Testing 
    @login
    Scenario: I want to log in to Broker Staging
        Given On the broker homepage
        # Given On the "broker-dev.usaspending.gov" page
        When We click on MAX sign in button
        And We enter username and password
        And We click on MAX login button
        Then we see that we are logged into Broker
        # Then We see that Welcome content is displayed

    @dabs_submission
    Scenario: I want to view submitted and existing submissions
        # Given On the DABS Submission Dashboard
        Given On the broker homepage
        When We click on Enter DABS button
        And We click on View submissions dashboard button
        Then We see that DABS Submission Dashboard is displayed
        And We see that Active Submissions is displayed
        And We see that Certified Submissions is displayed

        When We click on Active ID
        Then We see that Upload & Validate a New Submission is displayed

        Given On the broker homepage

        When We click on Enter DABS button
        And We click on View submissions dashboard button

        # Then We see that DATA Act Broker Submission (DABS) is displayed

        When We click on DABS Submission Dashboard link
        Then We see that DABS Submission Dashboard is displayed
        When wait
        Then We see that Active Submissions is displayed
        And We see that Certified Submissions is displayed

        When We click on Certified ID
        Then We see that Upload & Validate a New Submission is displayed
        # And We see Validation message is displayed

    @dabs_activeFilters
    Scenario: I want to filter by specific search criteria for DABS Active Submissions
        #Given On the DABS Submission Dashboard
        Given On the broker homepage
        When We click on Enter DABS button
        When We click on DABS Submission Dashboard link
        And wait
        And We type "dep" into "Active Agency Name"
        Then We see Filter count is displayed
        And We see that Filter tag has a value of Department of Labor (DOL)

        When We enter "file a" into "Active File Name"
        And We click on Active Add button
        Then We see that Filter tag has a value of file a
        And We see Filter count is displayed

        When We enter "120" into "Active Submission ID"
        And We click on Active Submission Add button
        Then We see that Submission tag has a value of 120
        And We see Filter count is displayed

        When We click on Active Submit button
        And We click on Reset Filters button
        Then We see the Active filters are empty
        
 
        When I click on Active Created by dropdown
        And we type "Mel" into "Active Created by"
        And we click on Active Created by checkbox
        Then We see Filter count is displayed
        And We see that Filter tag has a value of Melissa Plooksawasdi

        When We click on Active Submit button
        And wait
        Then We see Active records filtered by the Created By Melissa Plooksawasdi

        When We click on Reset Filters button
        Then We see the Active filters are empty

        When we click on Active Last Modified
        And we click on 30 days prior date
        And we click on the current date
        And I click on Add Filter
        Then we see Filter count is displayed
        And We see that Active Filter tag has date displayed

        When We click on Active Submit button
        Then We see Active records filtered by Last Modified Dates

    @filters
    Scenario: I want to filter by specific search criteria for DABS Certified Submissions
        Given On the broker homepage
        When We click on Enter DABS button
        When We click on DABS Submission Dashboard link
        And wait
        And We type "dep" into "Certified Agency Name"
        Then We see Certified Filter count is displayed
        And We see that Certified Filter tag has a value of Department of Labor (DOL)

        When We enter "file a" into "Certified File Name"
        And We click on Certified Add button
        Then We see that Certified Filter tag has a value of file a
        And We see Certified Filter count is displayed

        When We enter "202" into "Certified Submission ID"
        And We click on Certified Submission Add button
        Then we see that Certified Submission tag is displayed
        Then We see that Certified Submission tag has a value of 202
        And We see Certified Filter count is displayed

        When We click on Certified Submit button
        And We click on Certified Reset Filters button
        Then We see the Certified filters are empty
 
        When I click on Certified Created by dropdown
        And we type "Mel" into "Certified Created by"
        And we click on Certified Created by checkbox
        Then We see Certified Filter count is displayed
        And we see that Certified Filter tag is displayed

        When We click on Certified Submit button
        Then We see Certified records filtered by the Created By Melissa Plooksawasdi

        When We click on Certified Reset Filters button
        Then We see the Certified filters are empty

        When I click on Certified Last Modified
        And we click on Certified 30 days prior date
        And we click on Certified current date
        And I click on Certified Add Filter
        Then we see Certified Filter count is displayed
        And We see that Certified Filter tag has date displayed

        When We click on Certified Submit button
        Then We see Certified records filtered by Last Modified Dates
Feature: [BROKER] FABS Submission Smoke Tests

    @login
    Scenario: I want to log in to Broker Staging
        Given On the broker homepage
        When we click on MAX sign in button
        And we enter username and password
        And we click on MAX login button
        Then we see that we are logged into Broker

    @fabs_pass
    Scenario: I want to upload FABS submission
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter FABS button
        And we click on Upload & Validate a New Submission button
        And we type "Barry Goldwater Scholarship" into "FABS text input"
        And I upload file "jjjjjj.csv" to FABS file input
        And we wait for FABS upload button to appear
        And we click on FABS upload button
        And we wait for FABS publish to appear
        Then we see that FABS file status has a value of File validated with warnings
        And we see that FABS trash is displayed
        When we click on FABS publish 
        Then we see that FABS confirm publish is displayed
        And we see that FABS cancel publish is displayed
        When we click on FABS cancel publish
         And we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER):jjjjjj.csv
        When we click on First row delete
        And we click on Confirm submission delete

    @fabs_fail_1
    Scenario: I want to upload a failed FABS submission
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter FABS button
        And we click on Upload & Validate a New Submission button
        And we type "Barry Goldwater Scholarship" into "FABS text input"
        And I upload file "FABS 1_3_1 FAIL File_1[1].csv" to FABS file input
        And we wait for FABS upload button to appear
        And we click on FABS upload button
        And we wait for FABS publish to appear
        When we click on FABS view error button
        Then we check FABS rules for file "FABS 1_3_1 FAIL File_1[1].csv"
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER):FABS 1_3_1 FAIL File_1[1].csv
        When we click on First row delete
        And we click on Confirm submission delete

    @fabs_fail_2
    Scenario: I want to upload another failed FABS submission
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter FABS button
        And we click on Upload & Validate a New Submission button
        And we type "Barry Goldwater Scholarship" into "FABS text input"
        And I upload file "FABS 1_3_1 FAIL File_2[1].csv" to FABS file input
        And we wait for FABS upload button to appear
        And we click on FABS upload button
        And we wait for FABS publish to appear
        Then we see that FABS reupload button has a value of Choose Corrected File
        When we click on FABS view error button
        Then we check FABS rules for file "FABS 1_3_1 FAIL File_2[1].csv"
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER):FABS 1_3_1 FAIL File_2[1].csv
        When we click on First row delete
        And we click on Confirm submission delete

    @fabs_fail_3
    Scenario: I want to upload yet another failed FABS submission
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter FABS button
        And we click on Upload & Validate a New Submission button
        And we type "Barry Goldwater Scholarship" into "FABS text input"
        And I upload file "FABS 1_3_1 FAIL File_3.csv" to FABS file input
        And we wait for FABS upload button to appear
        And we click on FABS upload button
        And we wait for FABS publish to appear
        Then we see that FABS reupload button has a value of Choose Corrected File
        When we click on FABS view error button
        Then we check FABS rules for file "FABS 1_3_1 FAIL File_3.csv"
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER):FABS 1_3_1 FAIL File_3.csv
        When we click on First row delete
        And we click on Confirm submission delete

    @fabs_fail_4
    Scenario: I want to upload one more gosh-darned failed FABS submission
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter FABS button
        And we click on Upload & Validate a New Submission button
        And we type "Barry Goldwater Scholarship" into "FABS text input"
        And I upload file "FABS 1_3_1 FAIL File_4.csv" to FABS file input
        And we wait for FABS upload button to appear
        And we click on FABS upload button
        And we wait for FABS publish to appear
        Then we see that FABS reupload button has a value of Choose Corrected File
        When we click on FABS view error button
        Then we check FABS rules for file "FABS 1_3_1 FAIL File_4.csv"
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER):FABS 1_3_1 FAIL File_4.csv
        When we click on First row delete
        And we click on Confirm submission delete

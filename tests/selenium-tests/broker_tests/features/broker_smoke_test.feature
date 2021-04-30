@broker
Feature: [BROKER] Smoke Testing (Submissions)
    @login
    Scenario: I want to log in to Broker Staging
        Given On the broker homepage
        When we click on MAX sign in button
        And we enter username and password
        And we click on MAX login button
        Then we see that we are logged into Broker

    Scenario: I want to access the DATA Act Broker Submissions page
        Given On the broker homepage
        Then we see that we are logged into Broker
        When we click on Enter DABS button
        Then we see that Upload & Validate a New Submission button is displayed
        And we see that View submissions dashboard button is displayed
        And we see that Generate D files button is displayed
        And we see that Generate A files button is displayed
        And we see that Recent Activity for: Your Agency table is displayed
        And we see that the activity table has submissions

    @DABS_help
    Scenario: I want to visit the DABS Help and Resources Page
	    Given On the broker homepage
	    When we click on Enter DABS button
	    And we click on help header button
	    Then we see that help header has a value of DABS | HelpHelpResources
	    And we see that release header is displayed
	    And we see that release header has a value of What’s New in This Release
	    And we see that link in sign up button displays "mailto:join-data-act-broker@lists.fiscal.treasury.gov?subject=%20Sign%20Up%20for%20Broker%20Updates&body=Yes,%20sign%20me%20up%20for%20%20Data%20Act%20Broker%20Updates!"
	    And we see that link in Reporting schedule link displays "https://fiscal.treasury.gov/files/data-transparency/fy19-dabs-reporting-window-schedule.xlsx"
        When we click on Release notes archive link
        Then we see that release header has a value of Release Notes Archive
        When we click on release notes link
        Then we see that release header has a value of What’s New in This Release
        When we click on technical notes archive link
        Then we see that release header has a value of Technical Notes Archive
        And we see that link in contact service desk link contains "/#/help?section=membership"
        And we see that link in DAIMS resources link contains "/#/resources"
        When we click on release notes link
        When we click on resources button
	    Then We see that resources header 1 has a value of Resources
	    And we see that resources header 2 has a value of DABS
        And we see that link in DAIMS validation rules link contains "DAIMS-Validation-Rules"
	    # When Follow download link in DAIMS validation rules link
	    # And Wait for download to complete
	    # Then File name contains "DAIMS-Validation-Rules"
	    Then we see that link in DAIMS Practices & Procedures link contains "https://community.max.gov/download/attachments/754091528/Practices-and-Procedures-v1.3.1.pdf"
	    When we click on DAIMS page link
	    And switch tab
	    Then I see the URL displays "fiscal.treasury.gov/data-transparency/DAIMS-current"
	    When switch tab back
	    And we click on Broker SQL validation rules
	    And switch tab
	    Then I see the URL displays "https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules"

    @FABS_help
    Scenario: I want to visit the FABS Help and Resources Page
	    Given On the broker homepage
	    When we click on Enter FABS button
	    And we click on help header button
	    Then we see that help header has a value of FABS | HelpHelpResources
	    And we see that release header is displayed
	    And we see that release header has a value of What’s New in This Release
	    And we see that link in FABS sign up button displays "mailto:join-data-act-broker@lists.fiscal.treasury.gov?subject=%20Sign%20Up%20for%20Broker%20Updates&body=Yes,%20sign%20me%20up%20for%20%20Data%20Act%20Broker%20Updates!"
	    And we see that link in FABS Reporting schedule link contains "/#/FABSHistory"
	    # And we see that link in Reporting schedule link contains "usaspending.gov/help/Fiscal%20Year%202019%20DABS%20Reporting%20Schedule.xlsx"
        When we click on Release notes archive link
        Then we see that release header has a value of Release Notes Archive
        When we click on release notes link
        Then we see that release header has a value of What’s New in This Release
        When we click on technical notes archive link
        Then we see that release header has a value of Technical Notes Archive
        And we see that link in contact service desk link contains "/#/FABSHelp?section=membership"
        And we see that link in DAIMS resources link contains "/#/FABSResources"
        When we click on release notes link
        When we click on resources button
	    Then We see that resources header 1 has a value of Resources
	    And we see that resources header 2 has a value of FABS
        And we see that link in DAIMS validation rules link contains "DAIMS-Validation-Rules"
	    # When Follow download link in DAIMS validation rules link
	    # And Wait for download to complete
	    # Then File name contains "DAIMS-Validation-Rules"
	    Then we see that link in DAIMS Practices & Procedures link contains "https://community.max.gov/download/attachments/754091528/Practices-and-Procedures-v1.3.1.pdf"
	    When we click on DAIMS page link
	    And switch tab
	    Then I see the URL displays "fiscal.treasury.gov/data-transparency/DAIMS-current"
	    When switch tab back
	    And we click on Broker SQL validation rules
	    And switch tab
	    Then I see the URL displays "https://github.com/fedspendingtransparency/data-act-broker-backend/tree/master/dataactvalidator/config/sqlrules"

    @fabs
    Scenario: I want to access the Financial Assistance Broker Submission (FABS) page
        Given On the broker homepage
        When we click on Enter FABS button
        Then we see that Upload & Validate a New Submission button is displayed
        And we see that View submissions dashboard button is displayed
        And we see that the activity table has submissions


    @caching
    Scenario: Caching D files
        Given On the broker homepage
        When we click on Enter DABS button
        And we click on Generate D files button
        And wait
        And we type "Farm Credit" into "Generated agency input"
        And we type "7/1/2018" into "D1 start date"
        And we type "9/30/2018" into "D1 end date"
        And we type "7/1/2018" into "D2 start date"
        And we type "9/30/2018" into "D2 end date"
        And we click on Generate D1 button
        And we wait for download D1 file to appear
        And we click on Generate D2 button
        And we wait for download D2 file to appear
        Given on the "broker-staging.usaspending.gov" page
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When wait
        When we type "Farm Credit" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2018
        And we click on Submit button
        And I upload file "1516206965_test_NRC_file_A_Q3_16_v2_BLANK.csv" to File A input
        And I upload file "1516206965_test NRC File B Q3 16 v5 BLANK.csv" to File B input
        And I upload file "1516206965_test NRC File C Q3 16 v3 BLANK.csv" to File C input
        And we click on Upload & Validate files button
        When we wait for Error header to have a value of No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.
        Then we see that file 1 validation has a value of File successfully validated
        And we see that file 2 validation has a value of File successfully validated
        And we see that file 2 validation has a value of File successfully validated
        When we click on header next button
        And we click on Generate files button
        Then we see that generate files header has a value of Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.
        When we wait for d1/d2 cached generation
        And we click on header next button
        And we wait for cross-validation header to have a value of Your files have been successfully cross-validated.
        #click next button
        And we click on header next button
        When we wait for E/F file generation header to have a value of Files E and F have been successfully generated.
        And we click on header next button
        Then we see that submission end header has a value of Congratulations your data has been successfully validated! Now, what would you like to do with it?
        And we see that Certify & Submit button is displayed
        And we see that Notify user button is displayed
        When we click on Certify & Submit button
        And we click on don't publish button
        And we click on Submission dashboard header
        Then we see that First row agency has a value of Farm Credit System (FCS)
        When we click on First row delete
        And we click on Confirm submission delete

    @future_submission_error
    Scenario: Create for a distant future quarter and try to submit. Error should occur
        Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        # Then I get the Upload & Validate a New Submission page
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish

        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When wait
        When we type "Barry Goldwater" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2020
        And we click on Submit button
        And I upload file "1516206965_test_NRC_file_A_Q3_16_v2_BLANK.csv" to File A input
        And I upload file "1516206965_test NRC File B Q3 16 v5 BLANK.csv" to File B input
        And I upload file "1516206965_test NRC File C Q3 16 v3 BLANK.csv" to File C input
        And we click on Upload & Validate files button
        And we wait for Error header to appear
        When we wait for Error header to have a value of No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.
        Then we see that file 1 validation has a value of File successfully validated
        And we see that file 2 validation has a value of File successfully validated
        And we see that file 3 validation has a value of File successfully validated
        When we click on header next button
        And we click on Generate files button
        Then we see that generate files header has a value of Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.
        When we wait for generate files header to have a value of Your files have been generated. Click Next to begin cross-file validations.
        And we click on header next button
        And we wait for cross-validation header to have a value of Your files have been successfully cross-validated.
        And we click on header next button
        When we wait for E/F file generation header to have a value of Files E and F have been successfully generated.
        And we click on header next button
        Then we see that submission end header has a value of Congratulations your data has been successfully validated! Now, what would you like to do with it?
        And we see that Certify & Submit button is displayed
        And we see that Notify user button is displayed
        When we click on Certify & Submit button
        When we click on certify data checkbox
        When we click on publish button
        Then we see that Certify error box has a value of No submission window for this year and quarter was found. If this is an error, please contact the Service Desk.
        # And we click on don't publish button
        When we click on certify exit
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER)
        When we click on First row delete
        And we click on Confirm submission delete

    # This submission was last validated or its D files generated before the start of the submission window (10/18/2019). Please revalidate before certifying.

    @future_submission_error_2
    Scenario: Create for a future quarter and try to submit. Error should occur
        Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        # Then I get the Upload & Validate a New Submission page
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish

        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When wait
        When we type "Barry Goldwater" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2019
        And we click on Submit button
        And I upload file "1516206965_test_NRC_file_A_Q3_16_v2_BLANK.csv" to File A input
        And I upload file "1516206965_test NRC File B Q3 16 v5 BLANK.csv" to File B input
        And I upload file "1516206965_test NRC File C Q3 16 v3 BLANK.csv" to File C input
        And we click on Upload & Validate files button
        And we wait for Error header to appear
        When we wait for Error header to have a value of No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.
        Then we see that file 1 validation has a value of File successfully validated
        And we see that file 2 validation has a value of File successfully validated
        And we see that file 3 validation has a value of File successfully validated
        When we click on header next button
        And we click on Generate files button
        Then we see that generate files header has a value of Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.
        When we wait for generate files header to have a value of Your files have been generated. Click Next to begin cross-file validations.
        And we click on header next button
        And we wait for cross-validation header to have a value of Your files have been successfully cross-validated.
        And we click on header next button
        When we wait for E/F file generation header to have a value of Files E and F have been successfully generated.
        And we click on header next button
        Then we see that submission end header has a value of Congratulations your data has been successfully validated! Now, what would you like to do with it?
        And we see that Certify & Submit button is displayed
        And we see that Notify user button is displayed
        When we click on Certify & Submit button
        When we click on certify data checkbox
        When we click on publish button
        Then we see that Certify error box has a value of This submission was last validated or its D files generated before the start of the submission window (10/18/2019). Please revalidate before certifying.
        # And we click on don't publish button
        When we click on certify exit
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Barry Goldwater Scholarship and Excellence In Education Foundation (GOLDWATER)
        When we click on First row delete
        And we click on Confirm submission delete

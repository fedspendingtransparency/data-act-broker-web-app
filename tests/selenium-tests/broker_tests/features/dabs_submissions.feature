Feature: [BROKER] DABS Submission Smoke Tests

    @login
    Scenario: I want to log in to Broker Staging
        Given On the broker homepage
        When we click on MAX sign in button
        And we enter username and password
        And we click on MAX login button
        Then we see that we are logged into Broker

    @blank_dabs
    Scenario: I want to upload and validate a blank submission
        Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When we type "Farm Credit System" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2018
        And we click on Submit button
        And I upload file "1516206965_test NRC file A Q3 16 v2 BLANK.csv" to File A input
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
        # When we click on Certify & Submit button
        # And we click on don't publish button
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Farm Credit System (FCS)
        When we click on First row delete
        And we click on Confirm submission delete

    @pass_dabs
    Scenario: I want to upload and validate a new submission
        Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When we type "OSC" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2018
        And we click on Submit button
        And we click on Recertify link
        And Action chain click on trash button 1
        And Action chain click on trash button 2
        And Action chain click on trash button 3
        And I upload file "File_A_appropriations_OSC_2018Q4.txt" to Upload corrected file input 1
        And I upload file "File_B_program_activity_OSC_2018Q4.txt" to Upload corrected file input 2
        And I upload file "File_C_award_financial_OSC_2018Q4.txt" to Upload corrected file input 3
        And we click on Upload corrected files button
        When we wait for Error header to appear
        And we wait for Error header to have a value of Your files are being validated.
        When we wait for Error header to have a value of No Critical Errors were found in the files. Click Next to generate your D1 and D2 files.
        Then we see that file 1 validation alt has a value of File successfully validated
        And we see that file 2 validation alt has a value of File successfully validated
        And we see that file 3 validation alt has a value of File successfully validated
        When we click on header next button alt
        And we click on Generate files button alt
        Then we see that generate files header alt has a value of Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.
        When we wait for generate files header alt to have a value of Your files have been generated. Click Next to begin cross-file validations.
        And we click on header next button alt
        And we wait for cross-validation header to have a value of Your files have been successfully cross-validated.
        And we click on header next button alt
        When we wait for E/F file generation header to have a value of Files E and F have been successfully generated.
        And we click on header next button alt
        Then we see that submission end header has a value of Congratulations your data has been successfully validated! Now, what would you like to do with it?
        And we see that Certify & Submit button alt is displayed
        And we see that Notify user button alt is displayed
        # When we click on Certify & Submit button alt
        # And we click on don't publish button
        # And we click on Submission dashboard header
        # Then we see that First row agency has a value of Office of Special Counsel (OSC)
        # When we click on First row delete
        # And we click on Confirm submission delete

    @dabs_warnings
    Scenario: I want to submit a DABS submission that fails
    Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When we type "State" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2018
        And we click on Submit button
        And we click on Recertify link
        And Action chain click on trash button 1
        And Action chain click on trash button 2
        And Action chain click on trash button 3
        And I upload file "Q4 2018 State Test File A.csv" to Upload corrected file input 1
        And I upload file "Q4 2018 State CGAC 019 Test File B-fail warnings.csv" to Upload corrected file input 2
        And I upload file "Q4 2018 State CGAC 019 Test File C-fail warnings.csv" to Upload corrected file input 3
        And we click on Upload corrected files button
        And we wait for Error header to appear
        And we wait for Error header to have a value of Your files are being validated.
        When I wait 2 seconds
        And I refresh the page
        Then we see that Error header is displayed
        When we wait for Error header to have a value of There are warnings in 3 of the files uploaded in this submission.
        # And we click on file 3 x button

    @fail_dabs
    Scenario: I want to submit another DABS submission that fails
    Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When wait
        When we type "OSC" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q4 2018
        And we click on Submit button
        And we click on Recertify link
        And Action chain click on trash button 1
        And Action chain click on trash button 2
        And Action chain click on trash button 3
        And I upload file "File_A_appropriations_OSC_2018Q4_pass file level.txt" to Upload corrected file input 1
        And I upload file "File_B_program_activity_OSC_2018Q4_pass file level but fail crossfile.txt" to Upload corrected file input 2
        And I upload file "File C should fail B20 q4 2018 OSC.csv" to Upload corrected file input 3
        And we click on Upload corrected files button
        And we wait for Error header to appear
        And we wait for Error header to have a value of Your files are being validated.
        When we wait for Error header to have a value of There are warnings in 1 of the files uploaded in this submission.
        Then we see that file 1 validation alt has a value of File successfully validated
        And we see that file 2 validation alt has a value of File validated with warnings
        And we see that file 3 validation alt has a value of File successfully validated
        When we click on header next button alt
        And we click on Generate files button alt
        Then we see that generate files header alt has a value of Creating your D1 and D2 files from FABS and FPDS. This may take a few minutes.
        When we wait for generate files header alt to have a value of Your files have been generated. Click Next to begin cross-file validations.
        And we click on header next button alt
        And we wait for cross-validation header to have a value of You must correct the cross-file validation errors listed above.
        Then we see that appropriations error cell has a value of Rule A30.1: All TAS values in File A (appropriations) should exist in File B (object class program activity).
        And we see that program activity error cell has a value of Rule B20: All combinations of TAS/program activity code/object class in File C (award financial) should exist in File B (object class program activity)..
        And we see that award financial d1 error cell has a value of Rule C11: Each unique PIID (or combination of PIID/ParentAwardId) from file C should exist in file D1..
        And we see that award financial d2 error cell has a value of Rule C8: Unique FAIN/URI from file C should exist in file D2. FAIN may be null for aggregate records. URI may be null for non-aggregate and PII-redacted non-aggregate records..
        When we click on Submission dashboard header
        # Then we see that First row agency has a value of Office of Special Counsel (OSC)
        # When we click on First row delete
        # And we click on Confirm submission delete

    @a16_error
    Scenario: I want to submit a DABS submission that triggers an A16 warning
        Given On the broker homepage
        When we click on Enter DABS button
        When we click on Upload & Validate a New Submission button
        Then we see that Submission Info header has a value of Submission Info
        And we see that Upload Files header has a value of Upload Files (.csv or .txt)
        And we see that Validate Data Files header has a value of Validate Data Files
        And we see that Review, Certify, and Publish header has a value of Review, Certify, and Publish
        When we click on Next button
        Then we see that Reporting agency name field is displayed
        When we type "OSC" into "Reporting agency name field"
        And we click on Quarterly radio button
        And we click on Quarter dropdown
        And we click on Q1 2019
        And we click on Submit button
        And I upload file "file_a_a16.txt" to File A input
        And I upload file "file_b_a16.txt" to File B input
        And I upload file "File_C_award_financial_test_2019Q1.txt" to File C input
        And we click on Upload & Validate files button
        And we wait for Error header to appear
        When we wait for Error header to have a value of You must fix the Critical Errors found in 2 of the files before moving on to the next step. View and download individual reports above.
        When we click on File A warning table button
        Then we see that File A warning cell has a value of Rule A16.1: All the elements that have FYB in file A are expected in the first submission for a fiscal year
        When we click on File B warning table button
        Then we see that File B warning cell has a value of Rule A16.2: All the elements that have FYB in file B are expected in the first submission for a fiscal year
        When we click on Submission dashboard header
        Then we see that First row agency has a value of Office of Special Counsel (OSC)
        When we click on First row delete
        And we click on Confirm submission delete

    @d_file
    Scenario: I want to generate detatched D files
        Given On the broker homepage
        When we click on Enter DABS button
        And we click on Generate D files button
        And we type "Barry Goldwater Scholarship" into "Generated agency input"
        And we type "1/1/2014" into "D1 start date"
        And we type "12/31/2014" into "D1 end date"
        And we type "1/1/2014" into "D2 start date"
        And we type "12/31/2014" into "D2 end date"
        And we click on Generate D1 button
        And we wait for download D1 file to appear
        And we click on download D1 file
        # And switch tab
        And we wait for file to download
        # And switch tab back
        Then we check that file has correct headers
        When we click on Generate D2 button
        And we wait for download D2 file to appear
        And we click on download D2 file
        # And Follow download link in download D2 file
        And we wait for file to download
        Then we check that file has correct headers
        When we type "1/1/2017" into "D1 start date"
        And we type "5/11/2017" into "D1 end date"
        And we type "1/1/2017" into "D2 start date"
        And we type "8/21/2017" into "D2 end date"
        And we click on Generate D1 button
        And we wait for download D1 file to appear
        And we click on download D1 file
        And we wait for file to download
        Then we check that file has correct headers
        When we click on Generate D2 button
        And we wait for download D2 file to appear
        And we click on download D2 file
        And we wait for file to download
        Then we check that file has correct headers

    @a_file
    Scenario: Generate A files
        Given On the broker homepage
        When we click on Enter DABS button
        Then we see that Generate A files button is displayed
        When we click on Generate A files button
        When we type "Barry Goldwater Scholarship" into "A file agency input"
        And we click on A file FY dropdown
        And we click on A file FY
        And we click on A file quarter dropdown
        And we click on A file fiscal quarter
        And we click on Generate A file button
        And we wait for download A file to appear
        And we click on download A file
        And we wait for file to download
        Then we check that file has correct headers

XPATH_DICT = {
    #landing page
    "MAX sign in button": '//*[@id="app"]/div/div/div/div[1]/div/div[2]/div/div/a',
    "MAX login button": '//button[@type="submit"]',

    #homepage
    "Enter DABS button": '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[1]/div/div[3]/div/a',
    "Enter FABS button": '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[2]/div/div[3]/div/a',
    "Upload & Validate a New Submission button": '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[1]/div/div[3]/div[1]/a',
    "View submissions dashboard button": '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[2]/div/div[3]/div/a',
    "Generate D files button": '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[3]/div/div[3]/div/a',
    "Generate A files button" : '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[4]/div/div[3]/div/a',
    "Recent Activity for: Your Agency table": '//*[@id="app"]/div/div[1]/div/div/div/div[4]/div/div/div[2]/div[1]/div[1]/table',

    #submission guide
    "Submission Info header":'//*[@id="app"]/div/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div[2]/h4',
    "Upload Files header": '//*[@id="app"]/div/div[1]/div/div/div[3]/div[2]/div/div[2]/div/div[2]/h4',
    "Validate Data Files header": '//*[@id="app"]/div/div[1]/div/div/div[3]/div[2]/div/div[3]/div/div[2]/h4',
    "Review, Certify, and Publish header": '//*[@id="app"]/div/div[1]/div/div/div[3]/div[2]/div/div[4]/div/div[2]/h4',
    "Next button": '//*[@id="app"]/div/div[1]/div/div/div[3]/div[2]/div/div[5]/div/div/div[2]/button',

    "Recertify link": '//*[@id="usa-da-certify-modal"]/div[1]/a',

    "Reupload file a button": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[2]/div[3]/div/div/span',

    "trash button 1": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[1]/div[1]',
    "trash button 2": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[2]/div/div/div[2]/div[1]/div[1]/div[1]/div[1]',
    "trash button 3": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[2]/div[1]/div[1]/div[1]/div[1]',

    "File input 1 alternate": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[2]/div[3]/div/div/input',
    "Upload corrected file input 1": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[2]/div[1]/div[2]/div/div[2]/div/div/input',
    "Upload corrected file input 2": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[2]/div/div/div[2]/div[1]/div[2]/div/div[2]/div/div/input',
    "Upload corrected file input 3": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[2]/div[1]/div[2]/div/div[2]/div/div/input',

    "Upload corrected files button" : '//*[@id="app"]/div/div[3]/div[3]/div[2]/div/div/div[2]/div/button[1]',
    #submission page 1
    "Reporting agency name field": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/div[2]/div/div[1]/div/input',
    "Quarterly radio button": '//*[@id="usa-da-datetype-quarterly"]',
    "Submit button": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[3]/div/div/div[2]/div/button',

    #submission page 2
    "File A input": '//*[@id="app"]/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[1]/div/div/div/div/div/input',
    "File B input": '//*[@id="app"]/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[2]/div/div/div/div/div/input',
    "File C input": '//*[@id="app"]/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[3]/div/div/div/div/div/input',
    "Upload & Validate files button": '//*[@id="app"]/div/div[1]/div[3]/div/div[2]/div/div/button',
    "file 3 x button": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[2]/div[1]/div[2]/div/div[1]/svg',

    "File A error table button": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[1]/div[2]/div[1]/div[2]/div',
    "File A warning table button":'//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div[2]/div[1]/div[2]/div',
    "File B error table button": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/div',
    "File B warning table button": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/div',
    "File C error table button": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[1]/div[2]/div[1]/div[2]/div',

    "File A warning cell": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[1]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr/td[2]',
    "File B warning cell": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[2]/div/div[2]/div/div/div[3]/div[1]/div[2]/table/tbody/tr[1]/td[2]',

    #submission page 3
    "Error header": '//h6',

    "file 1 validation": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[1]/div/div/div[2]/p',
    "file 2 validation": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[2]/div/div/div[2]/p',
    "file 3 validation": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div/div[3]/div/div/div[2]/p',
    "header next button": '//*[@id="app"]/div/div[3]/div[2]/div[2]/div/div/div[2]/div/button[2]',
    "header next button alt":  '//*[@id="app"]/div/div[3]/div[3]/div[2]/div/div/div[2]/div/button[2]',

    "file 1 validation alt": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[1]/div/div/div[2]/p',
    "file 2 validation alt": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[2]/div/div/div[2]/p',
    "file 3 validation alt": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[2]/p',
    "generate files header": '//h6',
    "generate files header alt": '//*[@id="app"]/div/div[3]/div[3]/div[2]/div/div/div[1]/div/div[2]/h6',

    #attached d file generation
    "Generate files button": '//*[@id="app"]/div/div[3]/div[2]/div[2]/div/div/div[2]/div/button[1]',
    "Generate files button alt": '//*[@id="app"]/div/div[3]/div[3]/div[2]/div/div/div[2]/div/button[1]',
    #file cross validation
    "cross-validation header": '//h6',
    "appropriations error cell": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[2]/div/div/div[2]/div/div/div[3]/div/div[1]/div/div/div[2]/table/tbody/tr/td[2]',
    "program activity error cell": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[3]/div/div/div[2]/div/div/div[3]/div/div[1]/div/div/div[2]/table/tbody/tr/td[2]',
    "award financial d1 error cell": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[4]/div/div/div[2]/div/div/div[3]/div/div[1]/div/div/div[2]/table/tbody/tr/td[2]',
    "award financial d2 error cell": '//*[@id="app"]/div/div[3]/div[3]/div[1]/div/div[5]/div/div/div[2]/div/div/div[3]/div/div[1]/div/div/div[2]/table/tbody/tr/td[2]',
    #generate E/F files
    "E/F file generation header": '//h6',

    #submission end page
    "submission end header": '//h5',
    "Certify & Submit button": '//*[@id="app"]/div/div[3]/div[1]/div[2]/div[3]/div[2]/div[2]/button',
    "Certify & Submit button alt": '//*[@id="app"]/div/div[1]/div/div[5]/div[2]/div[3]/div/div[1]/button',
    "Notify user button": '//*[@id="app"]/div/div[3]/div[1]/div[2]/div[3]/div[2]/div[3]/button',
    "Notify user button alt": '//*[@id="app"]/div/div[1]/div/div[5]/div[2]/div[3]/div/div[2]/button/div/div[2]',

    "certify data checkbox": '//*[@id="certify-check"]',
    "publish button": '//*[@id="usa-da-certify-modal"]/div[2]/div[3]/div[2]/div[1]/button',
    "don't publish button": '//*[@id="usa-da-certify-modal"]/div[2]/div[3]/div[2]/div[2]/button',

    #detached d files
    "Generated agency input": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/div[2]/div/div[1]/div/input',
    "D1 start date": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/input',
    "D1 end date": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/input',
    "D2 start date": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[5]/div[1]/div[1]/div[2]/div[1]/div[1]/input',
    "D2 end date": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[5]/div[1]/div[1]/div[2]/div[3]/div[1]/input',
    "Generate D1 button": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[3]/button',
    "Generate D2 button": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[6]/button',
    "download D1 file": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[2]/div[1]/div[2]/div/div/div[2]',
    "download D2 file": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div/span/div/div[5]/div[1]/div[2]/div/div/div[2]',

    #detached a file
    "A file agency input": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div[2]/div[2]/div/div[1]/div/input',
    "Generate A file button": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div[2]/div[6]/button',
    "download A file": '//*[@class="usa-da-download file-download-btn"]',
    "A file FY dropdown": '//button[@class="fy-picker__button"]',
    "A file FY": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div[2]/div[4]/div[2]/div[1]/div/div/ul/li[2]/button/span[2]',
    "A file quarter dropdown": '//button[@class="period-picker__button"]',
    "A file fiscal quarter": '//*[@id="app"]/div/div[1]/div/div[2]/div/div/div[2]/div[4]/div[2]/div[2]/div/div/ul/li[3]/button',

    #FABS file upload
    "FABS text input": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/div/div/div[2]/div/div[1]/div/input',
    "FABS file input": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/div/span/div/div[1]/div/div/div/div/div/input',
    "FABS upload button": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/div/span/div/div[2]/button',
    "FABS publish": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[2]/button[1]',
    "FABS revalidate": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[2]/button[2]',
    "FABS trash": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div/div[2]/div[1]/div/div/div',
    "FABS file status": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div/div[2]/p',
    "FABS confirm publish": '//*[@id="publish-button"]',
    "FABS cancel publish": '//*[@id="usa-da-certify-modal"]/div[2]/div[3]/div/button',
    "FABS submission header": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/div/div',

    "FABS view error button": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div/div[1]/div[2]/div[2]/div[2]/div',
    "FABS reupload button": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div/div[2]/div[3]/div/div',
    "FABS row count": '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div/div[1]/div[1]/div[3]/p/span[2]',

    #caching
    "Quarter dropdown": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select',
    "Q4 2018": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select/option[8]',
    "Q1 2018": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select/option[5]',
    "Q1 2019": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select/option[9]',
    "Generate D files message": '//*[@id="app"]/div/div[3]/div[2]/div[1]/div[2]/div',

    #dabs submission dashboard page
    "DABS Submission Dashboard": '//*[@id="app"]/div/div[1]/div[1]/div/div/div/div',
    "Active Submissions": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[1]/h2',
    "Certified Submissions": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[1]/h2',
    "Active ID": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[1]/div',
    "Upload & Validate a New Submission": '//*[@id="app"]/div/div[1]/div/div/div[1]/div',
    "Certified ID": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[1]/div/a',
    "Validation message": '//*[@id="app"]/div/div[1]/div/div[5]/div[1]/div/h5',

    #navigation
    "Home": '//*[@id="usa-da-header-link-holder"]/li[1]/a',
    "DABS Submission Dashboard link": '//*[@id="usa-da-header-link-holder"]/li[3]/a/span[1]',

    #dashboard_filters
    "Active Agency Name": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[2]/div/div/div/input',
    "Active Add button": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[3]/form/button',
    "Active Submit button": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[7]/button[2]',
    "Reset Filters button": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[7]/button[1]',
    "Active Created by dropdown": '//*[@id="createdbydropdown"]',
    "Active Created by": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[5]/div/div/ul/li[1]/div/input',
    "Active Created by list": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[5]/div/div/ul/li[2]',
    "Active Created by checkbox": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[5]/div/div/ul/li[2]/input',
    "Filter message": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[1]/div/div',
    "Active File Name": '//*[@id="file-name"]',
    "Active Submission ID": '//*[@id="submission-id"]',
    "Active Submission Add button": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[4]/form/button',
    "Filter tag": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div/div', #'//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div[1]',
    "Submission tag": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div[2]/div',
    "Certified Agency Name": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/input',
    "Certified File Name": '//*[@id="file-name" and @data-reactid=".0.0.3.1.0.1.2.0.0"]',
    "Certified Submission ID": '//*[@id="submission-id" and @data-reactid=".0.0.3.1.0.1.3.0.0"]',
    "Certified Submission Add button": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[4]/form/button',
    "Certified Filter tag": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div/div', #'//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div',
    "Certified Add button": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[3]/form/button',
    "Certified Submission tag": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div[2]/div',

    "Certified Created by dropdown": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div/div/button',
    "Certified Created by": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div/div/ul/li/div/input',
    "Certified Created by list": '//*[@id="awesomplete_list_4_item_0"]',
    "Certified Created by checkbox": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div/div/ul/li[2]/input',

    "Certified Submit button": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[7]/button[2]',
    "Certified Reset Filters button": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[7]/button[1]',

    "Certified Last Modified": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[6]/div/div/button',

    #fabs submission dashboard page
    "FABS Submission Dashboard": '//*[@id="app"]/div/div[1]/div[1]/div/div/div/div',
    # '//*[@id="app"]/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div[2]/div/div[3]/div/a',
    "Published Submissions": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[1]/h2',
    "DATA Act Broker Submission (FABS)": '//*[@id="app"]/div/div[1]/div/div/div/div[1]/div/div/div/h1',
    "FABS Submission Dashboard link": '//*[@id="usa-da-header-link-holder"]/li[3]/a/span[1]',
    # '//*[@id="app"]/div/div[1]/div[1]/div/div/div/div',
    "FABS Active Agency": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[2]/div/div/div/input',
    "FABS Active Submissions": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[1]/h2',
    "Published Submission ID": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[1]/div/a',
    "Published Agency Name": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[2]/div/div/div/input',
    "Published File Name": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[3]/form/input',
    "Published Submission Add button": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[4]/form/button',
    "Published Created by": '//*[@id="createdbydropdown"]',
    "Published Created By box": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[5]/div/div/ul/li/div/input',
    "Published Submission input": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[4]/form/input',

    #fabs submission page
    "Upload FABS Data": '//*[@id="app"]/div/div[1]/div/div/div/div/div[1]/div/div/div[1]/div',

    "Active Last Modified": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[6]/div/div/button',
    "30 days prior date": '//div[@class="DayPicker-Day" and @tabindex="0"][1]',
    "Certified 30 days prior date": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[6]/div/div/ul/li/div[1]/div/div/div[2]/div[1]/div[3]/div[1]/div[@class="DayPicker-Day" and @tabindex="0"]',
    "Certified current date": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[6]/div/div/ul/li/div[1]/div/div/div[2]/div[2]/div[3]/div/div[@class="DayPicker-Day DayPicker-Day--today"]',
    "the current date": '//div[@class="DayPicker-Day DayPicker-Day--today"]',
    "Add Filter": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[2]/div[6]/div/div/ul/li/div[2]/button',
    "Certified Add Filter": '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[2]/div[6]/div/div/ul/li/div[2]/button',


    "Corner user button": '//*[@id="app"]/div/div[1]/div/div/nav/div[2]/div/div/div/ul/li/button',
    "Log out button": '//*[@id="app"]/div/div[1]/div/div/nav/div[2]/div/div/div/ul/li/ul/li/button',

    "Submission dashboard header": '//*[@id="usa-da-header-link-holder"]/li[3]/a',
    "First row agency": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[2]',
    "First row delete": '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div[1]/div/div[2]/table/tbody/tr[1]/td[7]/div/div/div',
    "Confirm submission delete": '//*[@id="delete-button"]',

    "Q4 2020": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select/option[16]',
    "Q4 2019": '//*[@id="app"]/div/div[1]/div[3]/div/div/div/div[1]/span[2]/div/div[2]/div/select/option[12]',
    "Confirm submission button": '//*[@id="usa-da-certify-modal"]/div[2]/div[3]/div[2]/div[1]/button',
    "Certify error box": '//*[@id="usa-da-certify-modal"]/div[2]/div[4]',
    "certify exit": '//*[@id="usa-da-certify-modal"]/div[1]/button',

    "help header button": '//*[@id="usa-da-header-link-holder"]/li[4]/a',
    "help header": '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div',
    "release header": '//*[@id="app"]/div/div[1]/div[2]/div/div[2]/div/h2[1]',
    "sign up button": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/div[2]/div/a',
    "FABS sign up button": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/div/div/a',
    "resources button" : '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div/div/a[2]',
    "resources header 1": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/h2/span[1]',
    "resources header 2": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/h2/span[2]',
    "DAIMS page link": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/p[2]/a',
    "DAIMS validation rules link": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/div/ul/li[1]/a',
    "Broker SQL validation rules": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/div/ul/li[2]/a',
    "DAIMS Practices & Procedures link": '//*[@id="app"]/div/div[1]/div[2]/div/div/div/div/div/ul/li[3]/a',

    "Reporting schedule link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/div[1]/ul/li/a',
    "FABS Reporting schedule link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/ul[1]/li[2]/a',
    "Release notes archive link": '//a[contains(text(),"Release Notes Archive")]',
    "release notes link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/ul[2]/li[1]/a',
    "technical notes archive link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/ul[2]/li[2]/a',
    "contact service desk link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/ul[3]/li[1]/a',
    "DAIMS resources link": '//*[@id="app"]/div/div[1]/div[2]/div/div[1]/div/ul[3]/li[2]/a',
}

TIMING_DICT = {
    #landing page
    "MAX sign in button": 0,
    "MAX login button": 0,

    #homepage
    "Enter DABS button": 0,
    "Enter FABS button": 0,
    "Upload & Validate a New Submission button": 5,
    "View submissions dashboard button": 1,
    "Generate D files button": 5,
    "Generate A files button" : 5,
    "Recent Activity for: Your Agency table": 0,

    #submission guide
    "Submission Info header": 0,
    "Upload Files header": 0,
    "Validate Data Files header": 0,
    "Review, Certify, and Publish header": 0,
    "Next button": 5,

    "Recertify link": 0,
    "Reupload file a button": 0,

    "file 1 x button": 0,
    "file 3 x button": 0,

    "trash button 1": 0,
    "trash button 2": 0,
    "trash button 3": 0,

    "Upload corrected file input 1": 0,
    "Upload corrected file input 2": 0,
    "Upload corrected file input 3": 0,

    "Upload corrected files button": 0,
    #submission page 1
    "Reporting agency name field": 2,
    "Quarterly radio button": 0,
    "Submit button": 0,

    #submission page 2
    "File A input": 0,
    "File B input": 0,
    "File C input": 0,
    "Upload & Validate files button": 5,

    "File A error table button": 0,
    "File B error table button": 0,
    "File C error table button": 0,
    "File A warning table button": 0,
    "File B warning table button": 0,

    "File A warning cell": 0,
    "File B warning cell": 0,

    #submission page 3
    "Error header": 0,
    "file 1 validation": 0,
    "file 2 validation": 0,
    "file 3 validation": 0,

    "file 1 validation alt": 0,
    "file 2 validation alt ": 0,
    "file 3 validation alt": 0,

    "generate files header": 0,
    "generate files header alt": 0,


    #attached d file generation
    "Generate files button": 0,
    "Generate files button alt": 0,
    "header next button": 1,
    "header next button alt": 1,

    #cross validation
    "cross-validation header": 0,
    "appropriations error cell": 0,
    "program activity error cell": 0,
    "award financial d1 error cell": 0,
    "award financial d2 error cell": 0,

    #generate E/F files
    "E/F file generation header": 0,

    #submission end page
    "submission end header": 0,

    "Certify & Submit button": 0,
    "Certify & Submit button alt": 0,
    "Notify user button": 0,
    "Notify user button alt": 0,
    "certify data checkbox": 0,
    "publish button": 0,
    "don't publish button": 0,

    #detached D file generation
    "Generated agency input": 2,

    "D1 start date": 0,
    "D1 end date": 0,
    "D2 start date": 0,
    "D2 end date": 0,
    "Generate D1 button": 0,
    "Generate D2 button": 0,
    "download D1 file": 0,
    "download D2 file": 0,

    #detached a files
    "A file agency input": 1,
    "Generate A file button": 0,
    "download A file": 0,
    "A file FY dropdown": 0,
    "A file FY": 0,
    "A file quarter dropdown": 0,
    "A file fiscal quarter": 0,

    #FABS submission page
    "FABS text input": 0.5,
    "FABS file input": 0,
    "FABS upload button": 0,
    "FABS publish": 0,
    "FABS revalidate": 0,
    "FABS trash": 0,
    "FABS file status": 0,
    "FABS confirm publish": 0,
    "FABS cancel publish": 0,
    "FABS submission header": 0,
    "FABS view error button": 2,
    "FABS reupload button": 0,
    "FABS row count": 0,

    "Quarter dropdown": 0,
    "Q4 2018": 0,
    "Q1 2018": 0,
    "Q1 2019": 0,

    "Generate D files message": 0,

    #dabs submission dashboard page
    "DABS Submission Dashboard": 0,
    "Active Submissions": 0,
    "Certified Submissions": 0,
    "Active ID": 0,
    "Upload & Validate a New Submission": 0,
    "Certified ID": 0,
    "Validation messsage": 0,
    "Active File Name": 0,

    #navigation
    "Home": 0,
    "DABS Submission Dashboard link": 0,

    #dashboard_filters
    "Active Agency Name": 3,
    "Active Add button": 1,
    "Active Submit button": 4,
    "Active Submission ID": 1,
    "Active Submission Add button": 1,
    "Filter tag": 2,
    "Reset Filters button": 0,
    "Certified Agency Name": 0,
    "Certified File Name": 3,
    "Certified Submission ID": 0,
    "Certified Submission Add button": 0,
    "Certified Filter tag": 0,
    "Certified Add button": 1,
    "Certified Submission tag": 2,
    "Certified Created by dropdown": 0,
    "Certified Created by": 0,
    "Certified Created by list": 0,
    "Certified Created by checkbox": 0,

    "Certified Created by dropdown":0,
    "Certified Created by": 0,
    "Certified Created by list": 0,
    "Certified Created by checkbox": 0,

    "Certified Submit button": 2,
    "Certified Reset Filters button": 0,

    "Certified Last Modified": 0,

    #dashboard_filters
    "Active Created by dropdown": 0,
    "Active Created by": 0,
    "Active Created by list": 0,
    "Active Created by checkbox": 0,
    "Filter message": 0,
    "Submission tag": 0,

    #fabs submission dashboard page
    "FABS Submission Dashboard": 0,
    "Published Submissions": 0,
    "DATA Act Broker Submission (FABS)": 0,
    "FABS Submission Dashboard link": 0,
    "FABS Active Agency": 0,
    "FABS Active Submissions": 2,
    "Published Submission ID": 0,
    "Published Agency Name": 0,
    "Published File Name": 0,
    "Published Submission Add button": 0,
    "Published Created by": 0,
    "Published Created By box": 0,
    "Published Submission input": 0,

    "Active Last Modified": 0,
    "30 days prior date": 0,
    "Certified 30 days prior date": 0,
    "the current date": 0,
    "Certified current date": 0,
    "Add Filter": 0,
    "Certified Add Filter": 0,

    "Corner user button": 0,
    "Log out button": 3,

    "Submission dashboard header": 2,
    "First row agency": 0,
    "First row delete": 0,
    "Confirm submission delete": 3,

    "File input 1 alternate": 0,

    "Q4 2020": 0,
    "Q4 2019": 0,
    "Certify error box": 0,
    "certify exit": 0,

    "help header button": 1,
    "help header": 0,
    "release header": 0,
    "sign up button": 0,
    "FABS sign up button": 0,
    "resources button" : 1,
    "resources header 1": 0,
    "resources header 2": 0,
    "DAIMS page link": 0,
    "DAIMS validation rules link": 0,
    "Broker SQL validation rules": 0,
    "DAIMS Practices & Procedures link": 0,

    "Reporting schedule link": 0,
    "FABS Reporting schedule link":0,
    "Release notes archive link": 0,
    "release notes link": 0,
    "technical notes archive link": 0,
    "contact service desk link": 0,
    "DAIMS resources link": 0,
}

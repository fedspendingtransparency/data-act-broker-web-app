from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
from xpath import XPATH_DICT, TIMING_DICT
import time
import os
import glob
import csv
import re
from basic_steps import wait_for_xpath, wait_for_clickable

@when('we enter username and password')
def step_impl(context):
    """
    Type in the username and password to the MAX login page
    Username and password are stored in environment variables for security purposes
    """
    xpath1 = '//input[@name="username"]'
    xpath2 = '//input[@name="password"]'

    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)

    username = context.browser.find_element_by_xpath(xpath1)
    password = context.browser.find_element_by_xpath(xpath2)

    username.send_keys(os.environ.get('BR_USERNAME'))
    password.send_keys(os.environ.get('BR_PASSWORD'))


@then('we see that we are logged into Broker')
def step_impl(context):
    """
    Checks that the user successfully reached the Broker home page
    """
    time.sleep(5)
    xpath = '//*[@id="app"]/div/div[1]/div/div/div/div[1]/div/div/div/h1'
    wait_for_xpath(context, xpath)

    header = context.browser.find_element_by_xpath(xpath)
    assert_that(header.get_attribute('innerHTML'), equal_to("Welcome to the DATA Act Broker"))

@then('we see that the activity table has submissions')
def step_impl(context):
    """
    Checks that the activity table has at least one entry that is not blank
    """
    xpath = '//*[@id="app"]/div/div[1]/div/div/div/div[4]/div/div/div[2]/div[1]/div[2]/table/tbody/tr[1]/td[1]/div/a'

    wait_for_xpath(context, xpath)

    id = context.browser.find_element_by_xpath(xpath) 

    id_string = id.get_attribute('innerHTML')

    assert_that(id_string)
    assert_that("ID: " in id_string)

@when('I upload file "{file}" to {input}')
def step_impl(context, file, input):
    """
    Sends a string to the specified file upload HTML element
    String must be the filepath of a file that is in the 'uploads' folder

    Parameters
    -----------
    file : string
        name of file to be uploaded
    input : string
        name of the element that the file will be uploaded to
    """\

    input_xpath = XPATH_DICT[input]

    string = str(context.home_path + "/uploads/" + file)
    wait_for_xpath(context, input_xpath)
    file_input = context.browser.find_element_by_xpath(input_xpath)
    file_input.send_keys(string)

@when('wait')
def step_impl(context):
    """
    waits for 5 seconds
    """
    time.sleep(5)        

@when('we wait for file to download')
def step_impl(context):
    """
    Wait for file to download
    Checks if downloads folder is empty, if so, then waits for 30 seconds
    Checks if most recent file has '.crdownload' extenstion, if so, then waits for 100 seconds

    """
    # context.browser.find_element_by_css_selector('html').send_keys(Keys.CONTROL + Keys.SHIFT + Keys.TAB)
    # context.browser.switch_to_window(context.browser.window_handles[-1])
    print(context.browser.window_handles)
    # context.browser.save_screenshot("{}/screenshot{}.png".format(context.path, ))
    os.chdir(context.path)
    files = context.path + '/*'
    wait = True
    timing = 0
    while wait and timing < 30:
        try:
            max(glob.iglob(files))
        except ValueError:
            time.sleep(1)
            timing = timing + 1
            continue
        wait = False

    assert_that(wait is False, 'Download did not start')

    timing = 0    
    wait = True
    while wait and timing < 100:
        time.sleep(1)
        timing = timing + 1
        if (max(glob.iglob(files), key=os.path.getctime).endswith('.crdownload')):
            wait = True
        else:
            wait = False
    
    assert_that(wait is False, 'Download did not finish')
    
    latest_file = max(glob.iglob(files), key=os.path.getctime)
    file_name = latest_file.replace(context.path + "/", "")

    downloads = os.listdir(context.path)
    print(file_name)
    file_exists = False
    
    for item in downloads:
        if item == file_name:
            file_exists = True
    context.file = file_name
    os.chdir(context.home_path)
    assert file_exists
    # context.browser.find_element_by_css_selector('html').send_keys(Keys.CONTROL + Keys.SHIFT + Keys.TAB)
    # context.browser.switch_to_window(context.browser.window_handles[0])


@when('we wait for {element} to have a value of {value}')
def step_impl(context, element, value): 
    """
    Checks if specified element innerHTML attribute has the provided value, if not, waits until it does
    Times out after 3 minutes

    Parameters
    ----------
    element : string
        name of the element to check
    value : string
        expected value to check
    """
    element_xpath = XPATH_DICT[element]
    value_match = False
    timing = 0
    target_value = ""
    while not value_match and timing < 180: 
        # wait_for_xpath(context, element_xpath)
        target = context.browser.find_element_by_xpath(element_xpath)
        target_value = target.get_attribute('innerHTML')
        if target_value == value:
            value_match = True
            break
        else:
            time.sleep(1)
        timing = timing + 1
    error = "Error: {} did not change to a value of {} in 3 minutes, was {}".format(element, value, target_value)
    assert_that(value_match, error)

@when('we wait for d1/d2 cached generation')
def step_impl(context):
    """
    Specialized wait method for waiting to check the cached file generation
    """
    xpath = '//*[@id="app"]/div/div[3]/div[2]/div[2]/div/div/div[1]/div/div[2]/h6'

    value = 'Your files have been generated. Click Next to begin cross-file validations.'
    
    value_match = False
    timing = 0
    while not value_match and timing < 30: 
        wait_for_xpath(context, xpath)
        target = context.browser.find_element_by_xpath(xpath)
        target_value = target.get_attribute('textContent')
        if target_value == value:
            value_match = True
            break
        else:
            time.sleep(1)
        timing = timing + 1
    error = "Error: Cached D1/D2 files did not generate in 30 seconds"
    assert_that(value_match, error)

@then("we check that file has correct headers")
def step_impl(context): 
    """
    Opens downloaded file and compares the headers to the expected headers
    For D1/D2 and A file detached generation
    """
    d1_headers = [
        'ContractTransactionUniqueKey',
        'PIID',
        'AwardModificationAmendmentNumber',
        'Transaction Number', 
        'Referenced IDV Agency Identifier', 
        'Referenced IDV Agency Name',
        'ParentAwardId',
        'Referenced IDV Modification Number',
        'FederalActionObligation',
        'TotalDollarsObligated', 
        'BaseAndExercisedOptionsValue',
        'CurrentTotalValueOfAward', 
        'BaseAndAllOptionsValue', 
        'PotentialTotalValueOfAward',
        'ActionDate',
        'PeriodOfPerformanceStartDate',
        'PeriodOfPerformanceCurrentEndDate', 
        'PeriodOfPerformancePotentialEndDate', 
        'OrderingPeriodEndDate', 
        'SolicitationDate',
        'AwardingAgencyCode',
        'AwardingAgencyName', 
        'AwardingSubTierAgencyCode', 
        'AwardingSubTierAgencyName', 
        'AwardingOfficeCode',
        'AwardingOfficeName', 
        'FundingAgencyCode', 
        'FundingAgencyName',
        'FundingSubTierAgencyCode', 
        'FundingSubTierAgencyName', 
        'FundingOfficeCode',
        'FundingOfficeName', 
        'Foreign Funding',
        'Foreign Funding Description Tag', 
        'SAM Exception',
        'SAM Exception Description Tag', 
        'AwardeeOrRecipientUniqueIdentifier', 
        'AwardeeOrRecipientLegalEntityName', 
        'Vendor Doing As Business Name', 
        'CAGE Code', 
        'UltimateParentUniqueIdentifier', 
        'UltimateParentLegalEntityName',
        'LegalEntityCountryCode',
        'LegalEntityCountryName', 
        'LegalEntityAddressLine1', 
        'LegalEntityAddressLine2',
        'LegalEntityCityName', 
        'LegalEntityStateCode',
        'LegalEntityStateDescription',
        'LegalEntityZIP+4',
        'LegalEntityCongressionalDistrict', 
        'Vendor Phone Number', 
        'Vendor Fax Number',
        'PrimaryPlaceOfPerformanceCityName', 
        'PrimaryPlaceOfPerformanceCountyName', 
        'PrimaryPlaceOfPerformanceStateCode', 
        'PrimaryPlaceOfPerformanceStateName',
        'PrimaryPlaceOfPerformanceZIP+4', 
        'PrimaryPlaceOfPerformanceCongressionalDistrict',
        'PrimaryPlaceOfPerformanceCountryCode', 
        'PrimaryPlaceOfPerformanceCountryName', 
        'Award Or IDV Flag', 
        'ContractAwardType', 
        'ContractAwardTypeDescriptionTag', 
        'IDV_Type',
        'IDV_Type Description Tag', 
        'Multiple or Single Award IDV',
        'Multiple or Single Award IDV Description Tag',
        'Type of IDC',
        'Type of IDC Description Tag',
        'TypeOfContractPricing',
        'TypeOfContractPricingDescriptionTag',
        'AwardDescription',
        'ActionType',
        'ActionTypeDescriptionTag', 
        'Solicitation Identifier', 
        'Number of Actions',
        'Inherently Governmental Functions',
        'Inherently Governmental Functions Description Tag', 
        'Product or Service Code',
        'Product or Service Code Description Tag',
        'Contract Bundling', 
        'Contract Bundling Description Tag', 
        'DoD Claimant Program Code', 
        'DoD Claimant Program Code Description Tag',
        'NAICS', 
        'NAICS_Description',
        'Recovered Materials/Sustainability', 
        'Recovered Materials/Sustainability Description Tag', 
        'Domestic or Foreign Entity', 
        'Domestic or Foreign Entity Description Tag', 
        'DOD Acquisition Program', 
        'DOD Acquisition Program Description Tag', 
        'Information Technology Commercial Item Category',
        'Information Technology Commercial Item Category Description Tag', 
        'EPA-Designated Product',
        'EPA-Designated Product Description Tag', 
        'Country of Product or Service Origin', 
        'Country of Product or Service Origin Description Tag',
        'Place of Manufacture', 
        'Place of Manufacture Description Tag', 
        'Subcontracting Plan', 
        'Subcontracting Plan Description Tag', 
        'Extent Competed', 
        'Extent Competed Description Tag', 
        'Solicitation Procedures', 
        'Solicitation Procedures Description Tag', 
        'Type Set Aside', 
        'Type Set Aside Description Tag',
        'Evaluated Preference',
        'Evaluated Preference Description Tag', 
        'Research', 
        'Research Description Tag', 
        'Fair Opportunity Limited Sources', 
        'Fair Opportunity Limited Sources Description Tag', 
        'Other than Full and Open Competition', 
        'Other than Full and Open Competition Description Tag', 
        'Number of Offers Received', 
        'Commercial Item Acquisition Procedures',
        'Commercial Item Acquisition Procedures Description Tag',
        'Small Business Competitiveness Demonstration Program',
        'Simplified Procedures for Certain Commercial Items',
        'Commercial Item Test Program',
        'Commercial Item Test Program Description Tag',
        'A-76 FAIR Act Action',
        'A-76 FAIR Act Action Description Tag',
        'FedBizOpps',
        'FedBizOppsDescriptionTag',
        'Local Area Set Aside', 
        'Local Area Set Aside Description Tag', 
        'Price Evaluation Adjustment Preference Percent Difference', 
        'Clinger-Cohen Act Planning Compliance', 
        'Clinger-Cohen Act Planning Compliance Description Tag',
        'Materials, Supplies, Articles & Equip', 
        'Materials, Supplies, Articles & Equip Description Tag', 
        'Labor Standards', 
        'Labor Standards Description Tag',
        'Construction Wage Rate Requirements', 
        'Construction Wage Rate Requirements Description Tag', 
        'Interagency Contracting Authority', 
        'Interagency Contracting Authority Description Tag', 
        'Other Statutory Authority', 
        'Program Acronym',
        'Referenced IDV Type',
        'Referenced IDV Type Description Tag',
        'Referenced IDV Multiple or Single', 
        'Referenced IDV Multiple or Single Description Tag', 
        'Major program', 
        'National Interest Action', 
        'National Interest Action Description Tag',
        'Cost or Pricing Data',
        'Cost or Pricing Data Description Tag', 
        'Cost Accounting Standards Clause', 
        'Cost Accounting Standards Clause Description Tag', 
        'Government Furnished Property (GFP)',
        'Government Furnished Property GFP Description Tag', 
        'Sea Transportation',
        'Sea Transportation Description Tag',
        'Undefinitized Action',
        'Undefinitized Action Description Tag',
        'Consolidated Contract', 
        'Consolidated Contract Description Tag',
        'Performance-Based Service Acquisition', 
        'Performance-Based Service Acquisition Description Tag', 
        'Multi Year Contract',
        'Multi Year Contract Description Tag', 
        'Contract Financing', 
        'Contract Financing Description Tag', 
        'Purchase Card as Payment Method', 
        'Purchase Card as Payment Method Description Tag', 
        'Contingency Humanitarian or Peacekeeping Operation',
        'Contingency Humanitarian or Peacekeeping Operation Description Tag', 
        'Alaskan Native Corporation Owned Firm',
        'American Indian Owned Business', 
        'Indian Tribe Federally Recognized', 
        'Native Hawaiian Organization Owned Firm', 
        'Tribally Owned Firm', 
        'Veteran Owned Business',
        'Service Disabled Veteran Owned Business', 
        'Woman Owned Business', 
        'Women Owned Small Business', 
        'Economically Disadvantaged Women Owned Small Business',
        'Joint Venture Women Owned Small Business', 
        'Joint Venture Economically Disadvantaged Women Owned Small Business',
        'Minority Owned Business', 
        'Subcontinent Asian Asian - Indian American Owned Business',
        'Asian Pacific American Owned Business',
        'Black American Owned Business', 
        'Hispanic American Owned Business', 
        'Native American Owned Business',
        'Other Minority Owned Business', 
        'Contracting Officer\'s Determination of Business Size',
        'Contracting Officer\'s Determination of Business Size Description Tag', 
        'Emerging Small Business',
        'Community Developed Corporation Owned Firm', 
        'Labor Surplus Area Firm', 
        'U.S. Federal Government', 
        'Federally Funded Research and Development Corp',
        'Federal Agency',
        'U.S. State Government',
        'U.S. Local Government', 
        'City Local Government', 
        'County Local Government',
        'Inter-Municipal Local Government',
        'Local Government Owned', 
        'Municipality Local Government', 
        'School District Local Government',
        'Township Local Government', 
        'U.S. Tribal Government', 
        'Foreign Government', 
        'OrganizationalType',
        'Corporate Entity Not Tax Exempt', 
        'Corporate Entity Tax Exempt',
        'Partnership or Limited Liability Partnership',
        'Sole Proprietorship',
        'Small Agricultural Cooperative',
        'International Organization',
        'U.S. Government Entity', 
        'Community Development Corporation',
        'Domestic Shelter',
        'Educational Institution',
        'Foundation',
        'Hospital Flag', 
        'Manufacturer of Goods',
        'Veterinary Hospital',
        'Hispanic Servicing Institution',
        'Contracts',
        'Federal Assistance Awards',
        'All Awards',
        'Airport Authority',
        'Council of Governments',
        'Housing Authorities Public/Tribal',
        'Interstate Entity',
        'Planning Commission',
        'Port Authority',
        'Transit Authority',
        'Subchapter S Corporation',
        'Limited Liability Corporation',
        'Foreign Owned',
        'For Profit Organization',
        'Nonprofit Organization',
        'Other Not For Profit Organization',
        'The AbilityOne Program',
        'Private University or College',
        'State Controlled Institution of Higher Learning',
        '1862 Land Grant College',
        '1890 Land Grant College',
        '1994 Land Grant College',
        'Minority Institution',
        'Historically Black College or University',
        'Tribal College',	
        'Alaskan Native Servicing Institution',
        'Native Hawaiian Servicing Institution',
        'School of Forestry',
        'Veterinary College',
        'DoT Certified Disadvantaged Business Enterprise',
        'Self-Certified Small Disadvantaged Business',
        'Small Disadvantaged Business',
        '8a Program Participant',
        'Historically Underutilized Business Zone HUBZone Firm',
        'SBA Certified 8 a Joint Venture',
        'LastModifiedDate',
    ]
    d2_headers = [
        'FAIN',
        'AwardModificationAmendmentNumber', 
        'URI', 
        'SAI_Number', 
        'TotalFundingAmount',
        'FederalActionObligation',
        'NonFederalFundingAmount', 
        'FaceValueOfDirectLoanOrLoanGuarantee',
        'OriginalLoanSubsidyCost',
        'ActionDate',
        'PeriodOfPerformanceStartDate',
        'PeriodOfPerformanceCurrentEndDate',
        'AwardingAgencyCode',
        'AwardingAgencyName', 
        'AwardingSubTierAgencyCode',
        'AwardingSubTierAgencyName',
        'AwardingOfficeCode',
        'AwardingOfficeName',
        'FundingAgencyCode',
        'FundingAgencyName',
        'FundingSubTierAgencyCode',
        'FundingSubTierAgencyName',
        'FundingOfficeCode',
        'FundingOfficeName',
        'AwardeeOrRecipientUniqueIdentifier',
        'AwardeeOrRecipientLegalEntityName',
        'UltimateParentUniqueIdentifier', 
        'UltimateParentLegalEntityName',
        'LegalEntityCountryCode', 
        'LegalEntityCountryName', 
        'LegalEntityAddressLine1',
        'LegalEntityAddressLine2',
        'LegalEntityCityCode',
        'LegalEntityCityName',
        'LegalEntityStateCode',
        'LegalEntityStateName', 
        'LegalEntityZIP5',
        'LegalEntityZIPLast4',
        'LegalEntityCountyCode',
        'LegalEntityCountyName', 
        'LegalEntityCongressionalDistrict', 
        'LegalEntityForeignCityName', 
        'LegalEntityForeignProvinceName',
        'LegalEntityForeignPostalCode',
        'PrimaryPlaceOfPerformanceCode',
        'PrimaryPlaceOfPerformanceCityName',
        'PrimaryPlaceOfPerformanceCountyCode',
        'PrimaryPlaceOfPerformanceCountyName',
        'PrimaryPlaceOfPerformanceStateName', 
        'PrimaryPlaceOfPerformanceZIP+4',
        'PrimaryPlaceOfPerformanceCongressionalDistrict',
        'PrimaryPlaceOfPerformanceCountryCode', 
        'PrimaryPlaceOfPerformanceCountryName',
        'PrimaryPlaceOfPerformanceForeignLocationDescription',
        'CFDA_Number', 
        'CFDA_Title',
        'AssistanceType',
        'AssistanceTypeDescriptionTag',
        'AwardDescription', 
        'BusinessFundsIndicator',
        'BusinessFundsIndicatorDescriptionTag',
        'BusinessTypes', 
        'BusinessTypesDescriptionTag', 
        'CorrectionDeleteIndicator',
        'CorrectionDeleteIndicatorDescriptionTag', 
        'ActionType',
        'ActionTypeDescriptionTag',
        'RecordType', 
        'RecordTypeDescriptionTag',
        'LastModifiedDate',
    ]
    a_headers = [
        'AllocationTransferAgencyIdentifier', 
        'AgencyIdentifier',
        'BeginningPeriodOfAvailability',
        'EndingPeriodOfAvailability', 
        'AvailabilityTypeCode', 
        'MainAccountCode', 
        'SubAccountCode',
        'TotalBudgetaryResources_CPE', 
        'BudgetAuthorityAppropriatedAmount_CPE',
        'BudgetAuthorityUnobligatedBalanceBroughtForward_FYB',
        'AdjustmentsToUnobligatedBalanceBroughtForward_CPE',
        'OtherBudgetaryResourcesAmount_CPE', 
        'ContractAuthorityAmountTotal_CPE',
        'BorrowingAuthorityAmountTotal_CPE',
        'SpendingAuthorityfromOffsettingCollectionsAmountTotal_CPE',
        'StatusOfBudgetaryResourcesTotal_CPE',
        'ObligationsIncurredTotalByTAS_CPE',
        'GrossOutlayAmountByTAS_CPE', 
        'UnobligatedBalance_CPE', 
        'DeobligationsRecoveriesRefundsByTAS_CPE',
    ]

    if "d1" in context.file:
        headers = d1_headers
    elif "d2" in context.file:
        headers = d2_headers
    elif "appropriations":
        headers = a_headers
    else: 
        headers = None
    
    with open(str(context.path + "/" + context.file), 'r+') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', )
        count = 0
        for row in reader:
            if (count == 0):
                for item in row:
                    assert_that(item in headers, item)
            count = count + 1
            if (count == 1):
                break


@then('we check FABS rules for file "{file}"')
def step_impl(context, file):

    if "uploads" not in str(os.getcwd()):
        path = context.home_path + '/uploads/'
    

    rules = []
    filepath = path + file
    with open(filepath, 'r+') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', )
        count = 0
        for row in reader:
            if count != 0:
                rule = (row[2].split())
                # print(rule)
                if len(rule) > 0 and rule[0] not in rules:
                    rules.append(rule[0])
                elif len(rule) == 0:
                    rules.append("FABS7")
            count += 1

    
    
    xpath = '//tr/td[2]'
    wait_for_xpath(context, xpath)
    r1 = context.browser.find_elements_by_xpath(xpath)

    rows = []
    for row in r1:
        text = row.get_attribute('textContent')
        result = re.search('FABS\d+\.?\d?', text)
        if result is not None:
            rows.append(result.group())
    
    xpath2 = '//*[@id="app"]/div/div[1]/div/div/div/div/div[3]/div/div/span[1]/div/div/div[1]/div[1]/div[2]/div[1]/div[2]/div'
    wait_for_xpath(context, xpath)
    button = context.browser.find_element_by_xpath(xpath2)

    button.click() 

    r2 = context.browser.find_elements_by_xpath(xpath)
    for row in r2:
        text = row.get_attribute('textContent')
        result = re.search('FABS\d+\.?\d?', text)
        if result is not None:
            # print(result.group())
            rows.append(result.group())

    
    def sort_func(e):
        e = e.replace("FABS", '')
        # print(e)
        return float(e)

    rows.sort(key=sort_func)
    rules.sort(key=sort_func)

    r3 = set(rules).intersection(rows)
    y = sorted(r3, key=sort_func)
    assert_that(rules, equal_to(y), "Not all FABS rules found in file were triggered")

@then('File name contains "{value}"')
def step_impl(context, value):
    os.chdir(context.path)
    files = context.path + '/*'
    latest_file = max(glob.iglob(files), key=context.path.getctime)
    file_name = latest_file.replace(context.path + "/", "")
    os.chdir(context.home_path)
    assert_that(value in file_name, "File {} did not match {}".format(file_name, value))

@then('I see the URL displays "{url}"')
def step_impl(context, url):
    URL = context.browser.current_url
    print(URL)
    assert_that(url in URL, "Expected URL not found")

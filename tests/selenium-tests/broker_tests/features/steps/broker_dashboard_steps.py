from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException 
from hamcrest import assert_that, equal_to
from xpath import XPATH_DICT, TIMING_DICT
import time
import os
import datetime
from basic_steps import wait_for_xpath, wait_for_clickable


@then('We see Generate D files message is displayed')
def step_impl(context):
    """
    Checks that the Generate D files message is displayed on the page
    """
    xpath = '//*[@id="app"]/div/div[3]/div[2]/div[1]/div[2]/div'

    wait_for_xpath(context, xpath)

    dLabel = context.browser.find_element_by_xpath(xpath) 
    # print(dLabel)
    

    # "Congratulations your data has been successfully validated! Now, what would you like to do with it?" 
@then('We see Validation message is displayed')
def step_impl(context):
    """
    Checks that the Validation message is displayed on the page
    """
    xpath = '//*[@id="app"]/div/div[1]/div/div[5]/div[1]/div/h5'

    wait_for_xpath(context, xpath)

    valMsg = context.browser.find_element_by_xpath(xpath) 
    # print(valMsg)

@then ('We see Filter count is displayed')
def step_impl(context):
    """
    Checks that the Filter count is displayed on the page
    """
    xpath = '//span[@data-reactid=".0.0.3.0.0.0.1.0.2"]'
    # '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[1]/div/div/span[2]'
    
    wait_for_xpath(context, xpath)

    xcount = context.browser.find_element_by_xpath(xpath)
    # print(xcount.text)
    assert_that(xcount.text is not None)
    assert_that(xcount.is_displayed())

# When the reset button is clicked, then the filters are removed.
@then ('We see the {category} filters are empty')
def step_impl(context, category):
    """
    Checks that the specified category has no filters currently

    Parameters
    -----------
    category : string
        the category of filter to check
    """

    if category == "Active":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]'
    if category == "Certified":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]'
    
    try:
        context.browser.find_element_by_xpath(xpath)
    except NoSuchElementException:
        return False
    return True

@then('We see Certified Filter count is displayed')
def step_impl(context):
    """
    Checks that the Certified filter cound is displayed on the page
    """
    xpath = '//span[@data-reactid=".0.0.3.1.0.0.1.0.2"]'
    # '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[1]/div/div/span[2]'
    
    wait_for_xpath(context, xpath)

    xcount = context.browser.find_element_by_xpath(xpath)
    # print(xcount.text)
    assert_that(xcount.text is not None)
    assert_that(xcount.is_displayed())

@then('We see that {category} Filter tag has date displayed')
def step_impl(context, category):
    """
    Checks that the specified filter tag has a correctly-formatted date displayed

    Parameters
    ----------
    category : string
        the type of filter that is currently being used
    """
    if category == "Active":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div/div'
    if category == "Certified":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[3]/div/div'
    
    # xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[3]/div/div'

    wait_for_xpath(context, xpath)

    target = context.browser.find_element_by_xpath(xpath)
    
    d = datetime.date.today()
    day1 = '01'
    day2 = d.day
    month1 = d.month - 1
    month2 = d.month
    year1 = d.year
    year2 = d.year

    if (month2 == 1):
        month2 = "0{}".format(d.month)
        month1 = 12
        year1 = d.year - 1
    elif (month2 < 10):
        month2 = "0{}".format(d.month)
        month1 = "0{}".format(d.month - 1)
    elif (month2 == 10):
        month1 = "09"
    if (day2 < 10):
        day2 = "0{}".format(d.day)
    
    date = "{}/{}/{} - {}/{}/{}".format(month1, day1, year1, month2, day2, year2)
    print(date)
    assert_that(date, equal_to(target.get_attribute('textContent')))

@then('We see {categories} records filtered by the Created By {name}')
def step_impl(context, categories, name):
    """
    Checks that the specified category is being filtered by the provided name

    Parameters
    -----------
    categories : string
        the table that we are checking for the filters
    name : string
        the name of the person that the table is being filtered by
    """
    # xpath =''
    if categories == "Active":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[4]'
    if categories == "Certified":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[3]'

    wait_for_xpath(context, xpath)

    rows = context.browser.find_elements_by_xpath(xpath)

    # time.sleep(10)
    for row in rows:
        print(row.get_attribute('textContent'))
        assert_that(row.get_attribute('textContent'), equal_to(name))

    

@then('We see {categories} records filtered by Last Modified Dates')
def step_impl(context, categories):
    """
    Checks that the specific table is being filter by Last modified date, i.e. from newest to oldest
    
    Parameters
    ----------
    categories : string
        the table that is currently being filtered
    """
    # xpath =''
    if categories == "Active":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[5]'
    if categories == "Certified":
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[4]'
    if categories == 'Published':
        xpath = '//*[@id="app"]/div/div[1]/div[3]/div[2]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[6]'
    # xpath = '//*[@id="app"]/div/div[1]/div[3]/div[1]/div/div[4]/div[1]/div/div[2]/table/tbody/tr/td[5]'

    d = datetime.date.today()
    day1 = '01'
    day2 = d.day
    month1 = d.month - 1
    month2 = d.month
    year1 = d.year
    year2 = d.year

    if (month2 == 1):
        month1 = 12
        year1 = d.year - 1
    if (day2 < 10):
        day2 = "0{}".format(d.day)
    if (month2 < 10):
        month2 = "0{}".format(d.month)
        month1 = "0{}".format(d.month - 1)
    if (month2 == 10):
        month1 = "09"

    date1 = "{}-{}-{}".format(year1, month1, day1)
    date2 = "{}-{}-{}".format(year2, month2, day2)

    wait_for_xpath(context, xpath)

    rows = context.browser.find_elements_by_xpath(xpath)

    for row in rows:
        date = row.get_attribute('textContent')
        print("date: {}, date1: {}, date2: {}".format(date, date1, date2))
        assert_that(date >= date1)
        assert_that(date <= date2)

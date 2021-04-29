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


@when('we log in with read only permissions')
def step_impl(context):
    xpath1 = '//input[@name="username"]'
    xpath2 = '//input[@name="password"]'

    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)

    username = context.browser.find_element_by_xpath(xpath1)
    password = context.browser.find_element_by_xpath(xpath2)

    username.send_keys(os.environ.get('BR_USERNAME2'))
    password.send_keys(os.environ.get('BR_PASSWORD2'))

@when('we log in with no permissions')
def step_impl(context):
    xpath1 = '//input[@name="username"]'
    xpath2 = '//input[@name="password"]'

    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)

    username = context.browser.find_element_by_xpath(xpath1)
    password = context.browser.find_element_by_xpath(xpath2)

    username.send_keys(os.environ.get('BR_USERNAME3'))
    password.send_keys(os.environ.get('BR_PASSWORD3'))

@then('we see that we are logged in with read only permissions')
def step_impl(context):
    xpath1 = '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div/span[1]'
    xpath2 = '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div/span[2]'
    
    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)
    
    header1 = context.browser.find_element_by_xpath(xpath1)
    header2 = context.browser.find_element_by_xpath(xpath2)
    
    assert_that(header1.get_attribute('textContent'), equal_to('DABS'))
    assert_that(header2.get_attribute('textContent'), equal_to(' | Help'))
     
@then('we see that we are logged in with no permissions')
def step_impl(context):
    xpath1 = '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div/span[1]'
    xpath2 = '//*[@id="app"]/div/div[1]/div[1]/div[1]/div/div/div/span[2]'
    
    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)
    
    header1 = context.browser.find_element_by_xpath(xpath1)
    header2 = context.browser.find_element_by_xpath(xpath2)
    
    assert_that(header1.get_attribute('textContent'), equal_to('DABS'))
    assert_that(header2.get_attribute('textContent'), equal_to(' | Help'))

@then('Clear cache')
def step_impl(context):
    context.browser.get('chrome://settings/clearBrowserData')
    xpath = '//*[@id="clearBrowsingDataDialog"]/div[4]/paper-button[2]'
    # wait_for_xpath(context, xpath)
    # button = context.browser.find_element_by_xpath(xpath)

    # button = context.browser.find_element_by_css_selector('#clearBrowsingDataConfirm')
    # button.click()
    for x in range(0,7):
        context.browser.find_element_by_css_selector('html').send_keys(Keys.TAB)
    
    context.browser.find_element_by_css_selector('html').send_keys(Keys.ENTER)

    time.sleep(10)

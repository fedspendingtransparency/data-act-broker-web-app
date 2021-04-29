from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, UnexpectedAlertPresentException
from hamcrest import assert_that, equal_to
import time
import os

from xpath import XPATH_DICT, TIMING_DICT

def wait_for_xpath(context, xpath, timeout_secs = 10):
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


def wait_for_clickable(context, xpath, timeout_secs=10):
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


@given('on the "{page}" page')
def step_impl(context, page):
    try:
        context.browser.get('https://' + page)
    except UnexpectedAlertPresentException:
        alert = context.browser.switch_to.alert
        alert.accept()

@given('On the broker homepage')
def step_impl(context):
    page = context.page
    context.browser.get("https://" + page)
    context.browser.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
    params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': context.path}} # this is to allow downloads in headless mode. unclear if it actually works
    context.browser.execute("send_command", params)

@when('we click on {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target.is_displayed())
    target.click()
    timing = TIMING_DICT[element]
    # print(timing)
    if timing > 0:
        time.sleep(timing)

# Resuable click function - add xpath for element to xpath dict in xpath.py
# add amount of wait time desired after click to timing dict in xpath.py
# Does not scroll to element
@when('I click on {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    # context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    # context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target.is_displayed())
    target.click()
    timing = TIMING_DICT[element]
    # print(timing)
    if timing > 0:
        time.sleep(timing)

@when('Action chain click on {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(Keys.ENTER)

@when('we type "{text}" into "{element}"')
def step_impl(context, text, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
#     context.browser.execute_script("return arguments[0].scrollIntoView();", target)
#     context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target.is_displayed())
    target.send_keys(text)
    timing = TIMING_DICT[element]
    # print(timing)
    if timing > 0:
        time.sleep(timing)
    target.send_keys(Keys.ENTER)

@when('we hover over {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    action = ActionChains(context.browser)
    wait_for_xpath(context, element_xpath)
    action.move_to_element(context.browser.find_element_by_xpath(element_xpath))

@when('we hover on {element} then click {element2}')
def step_impl(context, element, element2):
    element_xpath = XPATH_DICT[element]
    element2_xpath = XPATH_DICT[element2]
    action = ActionChains(context.browser)
    wait_for_xpath(context, element_xpath)
    action.move_to_element(context.browser.find_element_by_xpath(element_xpath))
    wait_for_xpath(context, element2_xpath)
    action.click(context.browser.find_element_by_xpath(element2_xpath))
    action.perform()

@then('we see that {element} has a value of {value}')
def step_impl(context, element, value):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip().replace("\n", "")
    # print(content)
    assert_that(content,equal_to(value))

@then('we see that {element} is displayed')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())

@when('we wait for {element} to appear')
def step_impl(context, element):
    """
    Waits for an element to appear on the page, times out after 1 minutes

    Parameters
    -----------
    element : string
        name of the element that is expected to appear
    """
    element_xpath = XPATH_DICT[element]
    wait = True
    timing = 0
    while wait and timing < 60:
        try:
            target = context.browser.find_element_by_xpath(element_xpath)
        except:
            timing = timing + 1
            time.sleep(1)
            continue
        if (target.is_displayed()):
            wait = False
            break

    assert_that(not wait)

@when('we enter "{text}" into "{element}"')
def step_impl(context, text, element):
    """
    Enters the provided text into the provided element
    Does not hit ENTER key

    Parameters
    ----------
    text : string
        text to be entered into the element
    element : string
        name of the element that will recieve the text
    """
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    target.send_keys(text)
    timing = TIMING_DICT[element]
    if timing > 0:
        time.sleep(timing)

@when('Follow download link in {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    link = target.get_attribute('href')
    context.browser.find_element_by_tag_name('html').send_keys(Keys.COMMAND + 't')
    context.browser.get(link)
    context.browser.find_element_by_css_selector('html').send_keys(Keys.CONTROL + Keys.SHIFT + Keys.TAB)


@when('Go back')
def step_impl(context):
    context.browser.back()

@then('we see that link in {element} displays "{URL}"')
def step_impl(context, element, URL):
    xpath = XPATH_DICT[element]
    wait_for_xpath(context, xpath)
    target = context.browser.find_element_by_xpath(xpath)
    link = target.get_attribute('href')

    assert_that(URL, equal_to(link), "Link does not match expected URL")

@then('we see that link in {element} contains "{URL}"')
def step_impl(context, element, URL):
    xpath = XPATH_DICT[element]
    wait_for_xpath(context, xpath)
    target = context.browser.find_element_by_xpath(xpath)
    link = target.get_attribute('href')

    assert_that(URL in link, "Link {} does not contain {}".format(link, URL))

@when('switch tab')
def step_impl(context):
    # print(len(context.browser.window_handles))
    context.browser.switch_to_window(context.browser.window_handles[-1])

@when('switch tab back')
def step_impl(context):
    context.browser.switch_to_window(context.browser.window_handles[0])

@when('Wait for download to complete')
def step_impl(context):
    wait = True
    count = 0
    print(context.download_count)
    while wait and count < 120:
        download = os.listdir(context.path)
        if '.DS_Store' in download:
            download.remove('.DS_Store')
        if len(download) > context.download_count:
            wait = False
        count = count + 1
        time.sleep(1)

    download = os.listdir(context.path)
    if '.DS_Store' in download:
        download.remove('.DS_Store')
    context.download_count = len(download)
    assert_that(not wait, "File did not download within 2 minutes")

@when('I refresh the page')
def step_impl(context):
    context.browser.refresh()

@When('I wait {seconds} seconds')
def step_impl(context, seconds):
    seconds = float(seconds)
    time.sleep(seconds)

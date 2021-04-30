from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
from selenium.common.exceptions import TimeoutException, UnexpectedAlertPresentException


options = Options()
options.add_argument("--window-size=1920,1080")
options.add_argument("--disable-gpu")
options.add_argument("--disable-extensions")
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option('w3c', False)
options.add_argument("--proxy-auto-detect")
options.add_argument("--start-maximized")
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
path = '{}/downloads'.format(os.getcwd())
options.add_experimental_option('prefs', {
    'download.default_directory' : path,
    })

service_args=["--verbose", "--log-path=chromedriver.log"]

def before_all(context):
    try:
        context.browser = webdriver.Chrome(chrome_options=options, service_args=service_args)
    except:
        retry = True
        count = 0
        while retry and count < 10:
            try:
                context.browser = webdriver.Chrome(chrome_options=options, service_args=service_args)
                retry = False
            except:
                count = count + 1
    context.page = context.config.userdata.get("URL")
    context.path = path
    context.home_path = os.getcwd()
    downloads = os.listdir(context.path)
    if '.DS_Store' in downloads:
        downloads.remove('.DS_Store')
    context.download_count = len(downloads)

def after_all(context):
    context.browser.quit()

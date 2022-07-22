from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import Keys, ActionChains
import time
from autocomplete_validator import validate_autocomplete

DESTINATION_PATH = '//*[@id="rc_select_4"]'
DATE_1_PATH = '//*[@id="control-hooks_date"]'
DATE_2_PATH = '//*[@id="control-hooks"]/div/div/div/div/div[2]/div/div/div/div/div/div/div[3]'
NUM_ROOMS_PATH = '//*[@id="control-hooks_numberOfRoom"]'
NUM_ADULTS_PATH = '//*[@id="control-hooks_numberOfAdult"]'
NUM_CHILDREN_PATH = '//*[@id="control-hooks_numberOfChild"]'
SUBMIT_BTN_PATH = '//*[@id="control-hooks"]/div/div/div/div/div[4]/div/button'
WARNING_HOLDER_PATH = '/html/body/div[5]/div/div'

DROPDOWN_TEST_INPUTS = ['Rome', 'Singa', 'Ita']

driver = webdriver.Edge('./msedgedriver.exe')
driver.maximize_window()
driver.get('http://localhost:3000/make-booking')

DESTINATION_FIELD = driver.find_element(By.XPATH, DESTINATION_PATH)
DATE_1_FIELD = driver.find_element(By.XPATH, DATE_1_PATH)
DATE_2_FIELD = driver.find_element(By.XPATH, DATE_2_PATH)
N_ROOMS_FIELD = driver.find_element(By.XPATH, NUM_ROOMS_PATH)
N_ADULTS_FIELD = driver.find_element(By.XPATH, NUM_ADULTS_PATH)
N_CHILDREN_FIELD = driver.find_element(By.XPATH, NUM_CHILDREN_PATH)
SUBMIT_BTN = driver.find_element(By.XPATH, SUBMIT_BTN_PATH)

DESTINATION_FIELD.send_keys('')
time.sleep(0.5)
try:
    assert len(driver.find_elements(By.CLASS_NAME, 'rc-virtual-list')) == 0
    print('Dropdown test for empty string passed')
except AssertionError:
    print('Dropdown test for empty string failed')

DESTINATION_FIELD.send_keys('qwertyuiop123')
time.sleep(0.5)
try:
    assert len(driver.find_elements(By.CLASS_NAME, 'rc-virtual-list')) == 0
    print('Dropdown test for invalid location passed')
except AssertionError:
    print('Dropdown test for invalid location failed')
DESTINATION_FIELD.clear()

for test_input in DROPDOWN_TEST_INPUTS:
    DESTINATION_FIELD.send_keys(test_input)
    time.sleep(1)
    DEST_DROPDOWN_HOLDER = driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div/div[2]/div[1]/div/div')
    DEST_DROPDOWN_LIST = DEST_DROPDOWN_HOLDER.find_elements(By.XPATH, '*')
    output = [item.get_attribute('title') for item in DEST_DROPDOWN_LIST]
    try:
        assert validate_autocomplete(test_input, output)
        print(f'Dropdown test for input: {test_input} passed')
    except AssertionError:
        print(f'Dropdown test for input: {test_input} FAILED')
    DESTINATION_FIELD.clear()
    time.sleep(1)

DESTINATION_FIELD.send_keys('Singapore, Singapore')
time.sleep(0.5)
DESTINATION_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
try:
    assert driver.find_element(By.XPATH, '//*[@id="control-hooks"]/div/div/div/div/div[1]/div/div/div/div/div/div/div/span[2]').get_attribute('title') == 'Singapore, Singapore'
    print('Test for filling destination field passed')
except AssertionError:
    print('Test for filling destination field FAILED')
N_ROOMS_FIELD.send_keys(1)
N_ROOMS_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
N_ADULTS_FIELD.send_keys(2)
N_ADULTS_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
N_CHILDREN_FIELD.send_keys(0)
N_CHILDREN_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
SUBMIT_BTN.click()
time.sleep(0.5)
WARNING_HOLDER = driver.find_element(By.XPATH, WARNING_HOLDER_PATH)
try:
    assert len(WARNING_HOLDER.find_elements(By.XPATH, ".//*"))
    print('Test for submitting incomplete form passed')
except AssertionError:
    print('Test for submitting incomplete form failed')
DATE_1_FIELD.send_keys('2022-07-29')
actions = ActionChains(driver)
actions.send_keys(Keys.ENTER).pause(0.2).send_keys('2022-07-30').pause(0.2).send_keys(Keys.ENTER)
actions.perform()
time.sleep(1)
SUBMIT_BTN.click()
time.sleep(0.5)
try:
    assert not driver.find_elements(By.XPATH, SUBMIT_BTN_PATH)
    print('Test for submitting completed form passed')
except AssertionError:
    print('Test for submitting completed form FAILED')


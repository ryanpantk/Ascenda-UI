from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import Keys, ActionChains
import time
from destination_fuzzer import generate_test_input, validate_test_input, validate_test_result
import random
from date_fuzzer import get_dates

DESTINATION_PATH = '//*[@id="destination"]'
DATE_1_PATH = '//*[@id="date"]'
DATE_2_PATH = '//*[@id="root"]/section/main/div/div/div[2]/div/div/div/form/div[2]/div/div/div/div/div/div/div[3]/input'
NUM_ROOMS_PATH = '//*[@id="numberOfRoom"]'
NUM_ADULTS_PATH = '//*[@id="numberOfAdult"]'
NUM_CHILDREN_PATH = '//*[@id="numberOfChild"]'
SUBMIT_BTN_PATH = '//*[@id="root"]/section/main/div/div/div[2]/div/div/div/form/div[4]/div/button/span'
WARNING_HOLDER_PATH = '/html/body/div[5]/div/div'

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

# DESTINATION FIELD EMPTY STRING TEST
DESTINATION_FIELD.send_keys('')
time.sleep(0.5)
try:
    assert len(driver.find_elements(By.CLASS_NAME, 'rc-virtual-list')) == 0
    print('Dropdown test for empty string PASSED')
except AssertionError:
    print('Dropdown test for empty string FAILED')

# DESTINATION FIELD INVALID INPUT TEST
DESTINATION_FIELD.send_keys('qwertyuiop123')
time.sleep(0.5)
try:
    assert len(driver.find_elements(By.CLASS_NAME, 'rc-virtual-list')) == 0
    print('Dropdown test for invalid location PASSED')
except AssertionError:
    print('Dropdown test for invalid location FAILED')
DESTINATION_FIELD.clear()

# DESTINATION_FIELD FUZZER GENERATED TESTS
for _ in range(5):
    test_input = generate_test_input()
    DESTINATION_FIELD.send_keys(test_input)
    time.sleep(1.5)
    # Case 1: Input does not return any suggestions -> Verify if it really doesnt match any stored destinations
    if len(driver.find_elements(By.CLASS_NAME, 'rc-virtual-list')) == 0:
        try:
            assert not validate_test_input(test_input)
            print(f'Dropdown test for input: {test_input} PASSED')
        except AssertionError:
            print(f'Dropdown test for input: {test_input} FAILED')
        DESTINATION_FIELD.clear()
        time.sleep(1)
        continue
    # Case 2: Input return >= 1 suggestions -> Verify if all suggestions are valid suggestions given input
    DEST_DROPDOWN_HOLDER = driver.find_element(By.XPATH, '/html/body/div[2]/div/div/div/div[2]/div[1]/div/div')
    DEST_DROPDOWN_LIST = DEST_DROPDOWN_HOLDER.find_elements(By.XPATH, '*')
    output = [item.get_attribute('title') for item in DEST_DROPDOWN_LIST]
    try:
        assert validate_test_result(test_input, output)
        print(f'Dropdown test for input: {test_input} PASSED')
    except AssertionError:
        print(f'Dropdown test for input: {test_input} FAILED')
    DESTINATION_FIELD.clear()
    time.sleep(1)

# TEST IF DESTINATION FIELD REFLECTS CHOSEN LOCATION
DESTINATION_FIELD.send_keys('Kuala Lumpur, Malaysia')
time.sleep(0.5)
DESTINATION_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
try:
    assert driver.find_element(By.XPATH, '//*[@id="root"]/section/main/div/div/div[2]/div/div/div/form/div[1]/div/div/div/div/div/div/div/span[2]').get_attribute('title') == 'Kuala Lumpur, Malaysia'
    print('Test for filling destination field PASSED')
except AssertionError:
    print('Test for filling destination field FAILED')

# FILL N_ROOMS_FIELD
N_ROOMS_FIELD.click()
N_ROOMS_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)

# FILL N_ADULTS_FIELD
N_ADULTS_FIELD.click()
N_ADULTS_FIELD.send_keys(Keys.DOWN)
time.sleep(0.5)
N_ADULTS_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)

# FILL N_CHILDREN_FIELD
N_CHILDREN_FIELD.click()
N_CHILDREN_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)

# PRESS SUBMIT
SUBMIT_BTN.click()
time.sleep(0.5)

# TEST FOR INCOMPLETE FORM SUBMISSION
WARNING_HOLDER = driver.find_element(By.XPATH, WARNING_HOLDER_PATH)
try:
    assert len(WARNING_HOLDER.find_elements(By.XPATH, ".//*"))
    print('Test for submitting incomplete form PASSED')
except AssertionError:
    print('Test for submitting incomplete form FAILED')

# FILL IN DATE FIELD
DATE_1_FIELD.click()
START_DATE, END_DATE = get_dates()
DATE_1_FIELD.send_keys(START_DATE)
time.sleep(0.5)
actions = ActionChains(driver)
actions.send_keys(Keys.ENTER).pause(0.5).send_keys(END_DATE).pause(0.5).send_keys(Keys.ENTER)
actions.perform()
time.sleep(1)

# SUBMIT DESTINATION FORM
SUBMIT_BTN.click()
time.sleep(8)
try:
    assert not driver.find_elements(By.XPATH, SUBMIT_BTN_PATH)
    print('Test for submitting completed form PASSED')
except AssertionError:
    print('Test for submitting completed form FAILED')

HOTEL_DETAILS_PATH = '//*[@id="root"]/section/main/div/div/div[2]/div/div/div[3]/div/div/h3/b'
PREV_PAGE_PATH = '//*[@id="root"]/section/main/div/div/div[1]/div[2]/div/div[3]/div'
PREV_PAGE = driver.find_element(By.XPATH, PREV_PAGE_PATH)

for x in range(10):
    HOTEL_BUTTONS = driver.find_elements(By.XPATH, '//*[@id="selbtn"]')
    PAGINATION_BUTTONS_HOLDER = driver.find_element(By.XPATH, '//*[@id="root"]/section/main/div/div/div[2]/div/div/nav/ul')
    PAGINATION_BUTTONS = PAGINATION_BUTTONS_HOLDER.find_elements(By.XPATH, '*')
    select_hotel = random.randint(0, 1)
    if select_hotel:
        hotel_idx = random.randrange(0, len(HOTEL_BUTTONS))
        HOTEL_BUTTONS[hotel_idx].click()
        time.sleep(1)
        try:
            assert driver.find_element(By.XPATH, HOTEL_DETAILS_PATH)
            print(f'Select Hotel {hotel_idx} PASSED')
        except:
            print(f'Select Hotel {hotel_idx} FAILED')
        PREV_PAGE.click()
        time.sleep(1)
    else:
        pagination_idx = random.randrange(0, len(PAGINATION_BUTTONS))
        PAGINATION_BUTTONS[pagination_idx].click()
        time.sleep(1)
        try:
            assert PAGINATION_BUTTONS[pagination_idx].get_attribute('class') == 'page-item active'
            print(f'Pagination {pagination_idx} PASSED')
        except AssertionError:
            print(f'Pagination {pagination_idx} FAILED')

# Look for a room
while True:
    HOTEL_BUTTONS = driver.find_elements(By.XPATH, '//*[@id="selbtn"]')
    hotel_idx = random.randrange(0, len(HOTEL_BUTTONS))
    HOTEL_BUTTONS[hotel_idx].click()
    time.sleep(3)
    SELECT_ROOM_BTN = driver.find_elements(By.XPATH, '//*[@id="root"]/section/main/div/div/div[2]/div/div/div[4]/div[1]/div/div[2]/div/div[3]/div/button')
    if len(SELECT_ROOM_BTN):
        SELECT_ROOM_BTN[0].click()
        time.sleep(3)
        break
    PREV_PAGE.click()
    time.sleep(2)

SALUTATION_FIELD = driver.find_element(By.XPATH, '//*[@id="control-hooks_salutation"]')
SALUTATION_FIELD.click()
SALUTATION_FIELD.send_keys(Keys.ENTER)
time.sleep(0.5)
FIRST_NAME = driver.find_element(By.XPATH, '//*[@id="control-hooks_firstName"]')
FIRST_NAME.send_keys('Alif')
time.sleep(0.5)
LAST_NAME = driver.find_element(By.XPATH, '//*[@id="control-hooks_lastName"]')
LAST_NAME.send_keys('D.')
time.sleep(0.5)
COUNTRY_CODE = driver.find_element(By.XPATH, '//*[@id="control-hooks_countryCode"]')
COUNTRY_CODE.send_keys('Singapore')
COUNTRY_CODE.send_keys(Keys.ENTER)
time.sleep(0.5)
PHONE_NUMBER = driver.find_element(By.XPATH, '//*[@id="control-hooks_phoneNumber"]')
PHONE_NUMBER.send_keys('81234567')
time.sleep(0.5)
EMAIL = driver.find_element(By.XPATH, '//*[@id="control-hooks_email"]')
EMAIL.send_keys('gmail@alif.com')
time.sleep(0.5)
SUBMIT_BTN = driver.find_element(By.XPATH, '//*[@id="control-hooks"]/div/div[3]/button')
SUBMIT_BTN.click()


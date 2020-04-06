from selenium import webdriver
from utils import does_element_exist, open_browser, sign_in,\
  create_new_game, start_new_game, create_new_character

base_url = 'http://localhost:3000'

def test_app_title():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  title = browser.title

  assert title == 'Anorak GM'

  browser.close()

def test_sign_in():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  
  sign_in(browser)

  newGameButton = browser.find_element_by_name('newGame')
  loadGameButton = browser.find_element_by_name('loadGame')

  assert does_element_exist(browser, 'newGame')
  assert does_element_exist(browser, 'loadGame')

  browser.close()

def test_new_game_cancel_create():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  sign_in(browser)

  newGameButton = browser.find_element_by_name('newGame')
  newGameButton.click()

  cancelButton = browser.find_element_by_name('cancelNewGame')
  cancelButton.click()

  assert does_element_exist(browser, 'newGame')

  browser.close()

def test_load_game_cancel():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  sign_in(browser)

  loadGameButton = browser.find_element_by_name('loadGame')
  loadGameButton.click()

  cancelButton = browser.find_element_by_name('cancelLoadGame')
  cancelButton.click()

  assert does_element_exist(browser, 'loadGame')

  browser.close()

def test_new_game():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  
  create_new_game(browser)

  gameName = browser.find_element_by_name('gameName')

  assert gameName.text == 'Journey To Understanding'

  browser.close()

def test_new_game_cancel_start():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)
  sign_in(browser)

  newGameButton = browser.find_element_by_name('newGame')
  newGameButton.click()

  newGameInput = browser.find_element_by_name('newGameName')
  newGameInput.send_keys('Journey To Understanding')

  createButton = browser.find_element_by_name('createNewGame')
  createButton.click()

  cancelButton = browser.find_element_by_name('cancelGameStart')
  cancelButton.click()

  assert does_element_exist(browser, 'newGame')

  browser.close()

def test_start_new_game():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)

  start_new_game(browser)

  assert does_element_exist(browser, 'characterCreation')

  browser.close()

def test_create_new_character():
  browser = webdriver.Chrome()
  open_browser(browser, base_url)

  start_new_game(browser)
  create_new_character(browser)

  assert does_element_exist(browser, 'commandLine')

  browser.close()

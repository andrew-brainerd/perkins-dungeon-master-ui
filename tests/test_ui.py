from selenium import webdriver
from utils import open_browser, sign_in

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

  assert newGameButton.text == 'New Game'
  assert loadGameButton.text == 'Load Game'

  browser.close()

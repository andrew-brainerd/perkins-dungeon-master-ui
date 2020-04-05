import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

baseUrl = 'http://localhost:3000'

def test_appTitle():
  browser = webdriver.Chrome()
  browser.get(baseUrl)
  title = browser.title

  assert title == 'Anorak GM'

  browser.close()

def test_signIn():
  browser = webdriver.Chrome()
  browser.get(baseUrl)

  # Click Menu
  menu = browser.find_element_by_name('menu')
  menu.click()

  # Click Sign In
  signIn = browser.find_element_by_name('signIn')
  signIn.click()

  # Click 'Continue with Google'
  continueWithGoogle = browser.find_element_by_class_name('idp-social-button')
  continueWithGoogle.click()

  browser.implicitly_wait(5)

  # Type email
  emailInput = browser.find_element(By.XPATH, '//input[@type="email"]')
  emailInput.click()
  emailInput.send_keys(os.getenv('LOGIN_EMAIL'))
  emailInput.send_keys(Keys.RETURN)

  browser.implicitly_wait(30)

  # Type password
  passwordInput = browser.find_element(By.XPATH, '//input[@name="password"]')
  passwordInput.click()
  passwordInput.send_keys(os.getenv('LOGIN_PASSWORD'))
  passwordInput.send_keys(Keys.RETURN)

  browser.implicitly_wait(30)

  newGameButton = browser.find_element_by_name('newGame')
  loadGameButton = browser.find_element_by_name('loadGame')

  assert newGameButton.text == 'New Game'
  assert loadGameButton.text == 'Load Game'

  browser.close()
  
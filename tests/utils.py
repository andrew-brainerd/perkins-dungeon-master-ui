import os
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def open_browser(browser, base_url):
  browser.get(base_url)

def sign_in(browser):
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

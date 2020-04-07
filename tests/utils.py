import os
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import Select

def does_element_exist(browser, name):
    try:
        browser.find_element_by_name(name)
    except NoSuchElementException:
        return False
    return True

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
  continue_with_google = browser.find_element_by_class_name('idp-social-button')
  continue_with_google.click()

  browser.implicitly_wait(5)

  # Type email
  email_input = browser.find_element(By.XPATH, '//input[@type="email"]')
  email_input.click()
  email_input.send_keys(os.getenv('LOGIN_EMAIL'))
  email_input.send_keys(Keys.RETURN)

  browser.implicitly_wait(30)

  # Type password
  password_input = browser.find_element(By.XPATH, '//input[@name="password"]')
  password_input.click()
  password_input.send_keys(os.getenv('LOGIN_PASSWORD'))
  password_input.send_keys(Keys.RETURN)

  browser.implicitly_wait(30)

def create_new_game(browser):
  sign_in(browser)

  new_game_button = browser.find_element_by_name('newGame')
  new_game_button.click()

  new_game_input = browser.find_element_by_name('newGameName')
  new_game_input.send_keys('Journey To Understanding')

  create_button = browser.find_element_by_name('createNewGame')
  create_button.click()

def start_new_game(browser):
  create_new_game(browser)

  start_game_button = browser.find_element_by_name('startNewGame')
  start_game_button.click()

def create_new_character(browser):
  character_name = browser.find_element_by_name('characterName')
  character_name.send_keys('Merry Minstrel')

  character_class = Select(browser.find_element_by_name('characterClass'))
  character_class.select_by_value('bard')

  character_race = Select(browser.find_element_by_name('characterRace'))
  character_race.select_by_value('elf')

  character_order = Select(browser.find_element_by_name('characterOrder'))
  character_order.select_by_value('neutral')

  character_morality = Select(browser.find_element_by_name('characterMorality'))
  character_morality.select_by_value('good')

  create_button = browser.find_element_by_name('createCharacter')
  create_button.click()

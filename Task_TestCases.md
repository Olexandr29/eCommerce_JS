Legend / Status Keys of the file:
- [ ]  task
- [x] or ✅ completed task 
  - ⏳  In progress
  - ❌ Cancelled
  - ⚠️ Blocked
___

- [ ] Automate tests @Smoke (tc001-005)
<details><summary>✅ Automated:</summary>
TC-001: Successful login with valid credentials 

- Preconditions: The website saucedemo.com is open 
- Steps:
1. Enter standard_user in the Username field.
2. Enter secret_sauce in the Password field.
3. Click the Login button. 
- Expected Result:
The user is redirected to the products page (/inventory.html) with the heading "Products".

TC-002: Unsuccessful login with locked user
- Preconditions: The website saucedemo.com is open 
- Steps:
1. Enter locked_out_user in Username
2. Enter secret_sauce in Password
3. Click Login
- Expected Result: 
Error message "Sorry, this user has been locked out."

TC-003: Check presence of product list after login
- Preconditions: Login as standard_user
- Step: 1. Verify that multiple products are displayed
- Expected Result: Product list contains items with names and prices

TC-004: Logout from application
- Preconditions: Login as standard_user
- Steps:
1. Click the menu button
2. Click Logout
- Expected Result: 
User is redirected to login page

TC-005: Add item to cart and check badge
- Preconditions: Login as standard_user
- Steps: 
1. Click "Add to cart" for any item
2. Check the cart icon
- Expected Result: 
Cart icon shows badge with "1"
</details>




<br>
- [ ] Refactore code


https://img.shields.io/badge/Refactore%20code-Done-green

![Refactored](https://img.shields.io/badge/framework-[testData](39ffbe492f442c0f0b563c047ea96a5e0f503c9c)_[pages](3f91fc8c3162a5e17bd1585a2927e5b1f3bfdb94)_[titles](dd5741214c91e409f6c5062654e7f6277552082c)-green)


**Refactored:**

[![titles](https://img.shields.io/badge/some-titles-blue)](https://github.com/Olexandr29/Automation/tree/main/titles) 
[![pages](https://img.shields.io/badge/folder-pages-yellow)](https://github.com/Olexandr29/Automation/tree/main/pages)
[![testData](https://img.shields.io/badge/isolated-testData-blue)](https://github.com/Olexandr29/Automation/tree/main/data/testData.js)


- [ ] Add testing framework Mocha
[![title] (https://img.shields.io/badge/framework-Mocha-green)](https://github.com/Olexandr29/eCommerce_JS/commit/c76f77cba982e43cda830e8c71f9d7ee01990e9c)

- [ ] Run tests remotely via GitHub Actions
- [x] [![Remotely run tests via GitHub Actions on Windows](.github/workflows/tests.yml/badge.svg)](.github/workflows/tests.yml)

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


- [ ] Refactore code
<details><summary>✅ Refactored:</summary>

![title](https://img.shields.io/badge/Refactore%20code-Done-green)

**Links of the Refactored code:**

[![titles](https://img.shields.io/badge/some-titles-blue)](https://github.com/Olexandr29/eCommerce_JS/commit/dd5741214c91e409f6c5062654e7f6277552082c) 
[![pages](https://img.shields.io/badge/folder-pages-yellow)](https://github.com/Olexandr29/eCommerce_JS/commit/3f91fc8c3162a5e17bd1585a2927e5b1f3bfdb94)
[![testData](https://img.shields.io/badge/isolated-testData-blue)](https://github.com/Olexandr29/eCommerce_JS/commit/39ffbe492f442c0f0b563c047ea96a5e0f503c9c)
</details>

- [ ] Add testing framework Mocha 
- [x] Added [![title](https://img.shields.io/badge/Framework-Mocha-green)](https://github.com/Olexandr29/eCommerce_JS/commit/c76f77cba982e43cda830e8c71f9d7ee01990e9c)

- [ ] Run tests remotely via GitHub Actions
- [x]  [![Has remotely run Mocha tests via GitHub Actions (Windows)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)

- [ ] Run tests on different OS
<details> <summary>✅ Done</summary>

|OS|     Status|Test duration|
|---|-----|---|
|Windows|[![Run Mocha tests remotely via GitHub Actions (multy OS)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg?branch=main&job=Mocha%20tests%20(windows-latest)&label=Windows&logo=windows&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)|![Duration](https://img.shields.io/github/actions/duration/Olexandr29/eCommerce_JS/main?label=Duration&logo=clockify&style=flat-square)|
|Linux|[![Run Mocha tests remotely via GitHub Actions (multy OS)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg?branch=main&job=Mocha%20tests%20(ubuntu-latest)&label=Ubuntu&logo=linux&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)|![Ubuntu Duration](https://img.shields.io/github/actions/duration/Olexandr29/eCommerce_JS/main?job=Mocha%20tests%20(ubuntu-latest)&style=flat-square)|
|MacOS|[![Run Mocha tests remotely via GitHub Actions (multy OS)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg?branch=main&job=Mocha%20tests%20(macos-latest)&label=macOS&logo=apple&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)|![MacOS Duration](https://img.shields.io/github/actions/duration/Olexandr29/eCommerce_JS/main?job=Mocha%20tests%20(macos-latest)&style=flat-square)|


| OS | Status | Duration | Last run |
|----|--------|-----------|-----------|
| 🪟 **Windows** | [![Windows](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(windows-latest)&label=Windows&logo=windows&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/windows-duration.json&logo=clockify&label=Duration&style=flat-square) | ![Last Run](https://img.shields.io/github/last-commit/Olexandr29/eCommerce_JS/main?logo=git&label=Last%20run&style=flat-square) |
| 🐧 **Ubuntu** | [![Ubuntu](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(ubuntu-latest)&label=Ubuntu&logo=linux&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/ubuntu-duration.json&logo=clockify&label=Duration&style=flat-square) | ![Last Run](https://img.shields.io/github/last-commit/Olexandr29/eCommerce_JS/main?logo=git&label=Last%20run&style=flat-square) |
| 🍎 **macOS** | [![macOS](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(macos-latest)&label=macOS&logo=apple&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/macos-duration.json&logo=clockify&label=Duration&style=flat-square) | ![Last Run](https://img.shields.io/github/last-commit/Olexandr29/eCommerce_JS/main?logo=git&label=Last%20run&style=flat-square) |





</details>
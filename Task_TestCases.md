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

---

- [ ] Refactore code
<details><summary>✅ Refactored:</summary>
![title](https://img.shields.io/badge/Refactore%20code-Done-green)

**Links of the Refactored code:**

[![titles](https://img.shields.io/badge/some-titles-blue)](https://github.com/Olexandr29/eCommerce_JS/commit/dd5741214c91e409f6c5062654e7f6277552082c) 
[![pages](https://img.shields.io/badge/folder-pages-yellow)](https://github.com/Olexandr29/eCommerce_JS/commit/3f91fc8c3162a5e17bd1585a2927e5b1f3bfdb94)
[![testData](https://img.shields.io/badge/isolated-testData-blue)](https://github.com/Olexandr29/eCommerce_JS/commit/39ffbe492f442c0f0b563c047ea96a5e0f503c9c)
</details>

---

- [ ] Add testing framework Mocha 
<details><summary>✅ Done</summary>

- [x] Added [![title](https://img.shields.io/badge/Framework-Mocha-green)](https://github.com/Olexandr29/eCommerce_JS/commit/c76f77cba982e43cda830e8c71f9d7ee01990e9c)
</details>

---

- [ ] Run tests remotely via GitHub Actions
<details><summary>✅ Done</summary>

- [x] Has 
![Run remotely Mocha tests via GitHub Actions](https://img.shields.io/badge/Run_remotely_Mocha_tests_via_GitHub_Actions_Windows-passing-2ea44f?&logo=github&style=flat-square)
<!---(https://github.com/Olexandr29/eCommerce_JS/actions/runs/18462858294/workflow)--->


..............................................................................................................................................................


- [ ] Edit yml file and Run tests on different OS
- [x]
 Has [![Run Mocha tests remotely via GitHub Actions (multy OS)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg?branch=main&job=Mocha%20tests%20(windows-latest)&label=Windows&logo=windows&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)

<details><summary>⬇️ Details per OS</summary>

| OS | Status | Duration |
|----|--------|----------|
| **Windows** | [![Windows](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(windows-latest)&label=Windows&logo=windows&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/windows-duration.json&logo=clockify&label=Duration&style=flat-square) |
| **Linux** | [![Ubuntu](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(ubuntu-latest)&label=Ubuntu&logo=linux&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/ubuntu-duration.json&logo=clockify&label=Duration&style=flat-square) |
| **MacOS** | [![macOS](https://img.shields.io/github/actions/workflow/status/Olexandr29/eCommerce_JS/tests.yml?branch=main&job=Mocha%20tests%20(macos-latest)&label=macOS&logo=apple&style=flat-square)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml) | ![Duration](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Olexandr29/60e8687e89821ca943a0a79c2c2e77a8/raw/macos-duration.json&logo=clockify&label=Duration&style=flat-square) |

</details>

</details>

---


- [ ] Create Mochawesome report
- [x] 
 [Mochawesom report has created](https://github.com/Olexandr29/eCommerce_JS/blob/cc739568ffe82085adb685881c6b7844b412a6a5/reports/mochawesomeReport/mochawesom.png) 

 ---
 
- [ ] Create Allure report
- [x] 
[Allure report has created](https://github.com/Olexandr29/eCommerce_JS/blob/a3b8802776932f57f910d3deba2207d973a21867/utils/pictures/allure-report.png)

---


- [ ] Automate tests @Sanity (tc006-013)
<details><summary>✅ Automated</summary>
TC-006: Successful login as performance_glitch_user

Preconditions: The website saucedemo.com is open

Steps:
- Enter performance_glitch_user in the Username field.
- Enter secret_sauce in the Password field.
- Click the Login button.

Expected Result: The user is redirected to the products page (/inventory.html) with the heading "Products".

TC-007: Unsuccessful login with empty fields

Preconditions: The website saucedemo.com is open
Steps:
- Leave both Username and Password fields empty.
- Click the Login button.

Expected Result: An error message "Username is required" is displayed.

TC-008: Unsuccessful login with non-existent user

Preconditions: The website saucedemo.com is open

Steps:
- Enter fake_user in the Username field.
- Enter fake_password in the Password field.
- Click the Login button.

Expected Result: An error message "Username and password do not match any user" is displayed.

TC-009: Navigate to the cart page

Preconditions: The user is logged in as standard_user

Step: Click the shopping cart icon in the top-right corner.

Expected Result: The user is redirected to /cart.html and sees the contents of the cart.

TC-010: Remove item from the cart

Preconditions: The user is logged in as standard_user and has added one item to the cart

Step: Click the "Remove" button next to the added item.

Expected Result: The item is removed from the cart and the cart badge disappears.

TC-011: Proceed to checkout

Preconditions: The user is logged in as standard_user and has at least one item in the cart

Steps:
- Navigate to the cart page.
- Click the "Checkout" button.

Expected Result: The user is redirected to /checkout-step-one.html.

TC-012: Fill in user information at the checkout

Preconditions: The user is on the /checkout-step-one.html page

Steps:
- Enter First Name, Last Name, and Zip/Postal Code.
- Click the "Continue" button.

Expected Result: The user is redirected to /checkout-step-two.html.

TC-013: Cancel from the overview page

Preconditions: The user is on the /checkout-step-two.html page

Step: 
- Navigate to checkout1 with some added product.
- Click the "Cancel" button.

Expected Result: The user is redirected back to the inventory page (/inventory.html).

</details>

---

- [] Automate tests @Functional (tc014-024)

<details><summary>✅Automated </summary>

*Products Page*

TC-014: Sort products by price (low to high)

Preconditions: User is logged in as standard_user, on /inventory.html

Step: Select "Price (low to high)"

Expected Result: Items sorted correctly from cheapest to most expensive

TC-015: Sort products by name (Z to A)

Preconditions: User is logged in as standard_user, on /inventory.html

Step: Select "Name (Z to A)"

Expected Result: Items sorted in reverse alphabetical order

TC-016: Product details view

Preconditions: User is logged in as standard_user, on /inventory.html

Step: Click on product name

Expected Result: New page shows full info: image, name, description, price

</br>

*Cart Functionality*

TC-017: Add multiple items to cart

Preconditions: User is logged in as standard_user, on /inventory.html

Step: Add 3 different products

Expected Result: Cart badge shows "3"

TC-018: Remove one item from cart

Preconditions: Logged in as standard_user, 3 items already added

Steps:
- Navigate to cart
- Click "Remove" for one item

Expected Result: Badge shows "2", only 2 items remain

TC-019: Cart state persists across navigation

Preconditions: Logged in as standard_user, 1 item added to cart

Step: Navigate to another page (e.g. product detail) and return

Expected Result: Cart badge is preserved, item still in cart

</br>

*Checkout Flow*

TC-020: Full purchase flow

Preconditions: Logged in as standard_user, on /inventory.html

Steps: 
- Add product → Go to cart → Checkout → Fill info → Finish

Expected Result: Confirmation page with "Thank you for your order!"

TC-021: Checkout form validation

Preconditions: Logged in as standard_user, in checkout step one

Steps:
- Leave fields empty
- Click Continue

Expected Result: Error like "First Name is required"

TC-022: Total price with tax is calculated correctly

Preconditions: Logged in, 2+ known items added, in checkout overview

Step: Observe item prices, subtotal, tax, and total

Expected Result: Subtotal + Tax = Total (matches UI values)

</br>

*Navigation*

TC-023: Back from product detail to product list

Preconditions: Logged in as standard_user, on product detail page

Step: Click “Back to products”

Expected Result: Return to /inventory.html

TC-024: Use browser back button from product detail

Preconditions: Logged in as standard_user, on product detail page

Step: Press browser back

Expected Result: Returns to /inventory.html

</details>

---

- [ ] Automate @UI/UX & Negative tests (tc025-030)
<details><summary>✅ Automated tc025-027</summary>

TC-025: Logo and header visibility
- Preconditions: User is logged in as standard_user, on /inventory.html

- Step: 1. Observe top of the page

- Expected Result: Logo + "Products" heading visible


TC-026: Browser window resizing

- Preconditions: User is logged in as standard_user, on /inventory.html

- Step: 1. Resize browser window (e.g. shrink, expand)

- Expected Result: Layout adjusts responsively, no broken layout


TC-027: Button state change on interaction

- Preconditions: User is logged in as standard_user, on /inventory.html
- Steps:
1. Click “Add to cart”
2. Observe button changes
3. Click “Remove”
- Expected Result: Button text/color changes appropriately at each step

</details>

---

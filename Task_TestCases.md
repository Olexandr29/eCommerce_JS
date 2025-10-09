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
- [ ] Add testing framework Mocha 
- [ ] Run tests remotely via GitHub Actions
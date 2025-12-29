# Manual -> Automated test Coverage Matrix (Smoke, Sanity, Functional)

This document provides traceability between manual functional test cases and their corresponding automated tests.
It helps track test coverage, automation status, and gaps between manual and automated testing.


|Manual TC ID|Manual Test Description|Test Type|Automated Test ID|Automation Status|Automation Details|
|------------|-----------------------|---------|-----------------|-----------------|-----|
|TC-001|Successful login with valid credentials|Smoke|TC-001|Automated|Login Positive flow|
|TC-002|Unsuccessful login with locked user|Smoke|TC-002|Automated|Login Negative flow|
|TC-003|Check presence of product list after login|Smoke|TC-003|Automated|PLP presence|
|TC-004|Logout from application|Smoke|TC-004|Automated|Logout|
|TC-005|Add item to cart and check badge|Smoke|TC-005|Automated|Add single, random (via DataHelper) product to cart|
|TC-006|Successful login as performance_glitch_user|Sanity|TC-006|Automated|Positive login with performance issue|
|TC-007|Unsuccessful login with empty fields|Sanity|TC-007|Automated|Login, error validation|
|TC-008|Unsuccessful login with non-existent user|Sanity|TC-008|Automated|Login, error validation|
|TC-009|Navigate to the cart page|Sanity|TC-009|Automated|Navigation to cart|
|TC-010|Remove item from the cart|Sanity|TC-010|Automated|Remove single item from cart|
|TC-011|Proceed to checkout|Sanity|TC-011|Automated|Proceed to checkout (cart → step one)|
|TC-012|Fill in user information at the checkout|Sanity|TC-012|Automated|Navigating to checkout step two|
|TC-013|Cancel from the overview page|Sanity|TC-013|Automated|Cancel checkout from overview|
|TC-014|Sort products by price (low to high)|Functional|TC-014|Automated|UI sorting validation|
|TC-015|Sort products by name (Z to A)|Functional|TC-015|Automated|UI sorting validation|
|TC-016|Product details view|Functional|TC-016|Automated|Verifies image, name, description, price|
|TC-017|Add multiple items to cart|Functional|TC-017|Automated|Uses DataHelper.getRandomProducts(3)|
|TC-018|Remove one item from cart|Functional|TC-018|Automated|Removes random item|
|TC-019|Cart state persists across navigation|Functional|TC-019|Automated|Cart state persistence check|
|TC-020|Full purchase flow|Functional|TC-020|Automated|End-to-end purchase flow|
|TC-021|Checkout form validation|Functional|TC-021|Automated|Checkout form validation (negative)|
|TC-022|Total price with tax is calculated correctly|Functional|TC-022|Automated|Price calculation validation|
|TC-023|Back from product detail to product list|Functional|TC-023|Automated|UI navigation|
|TC-024|Use browser back button from product detail|Functional|TC-024|Automated|Browser navigation(history.back)|

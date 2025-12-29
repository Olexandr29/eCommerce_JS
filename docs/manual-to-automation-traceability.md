# Manual -> Automated test Coverage Matrix (Functional)

This document provides traceability between manual functional test cases and their corresponding automated tests.
It helps track test coverage, automation status, and gaps between manual and automated testing.


|Manual TC ID|Manual Test Description|Test Type|Automated Test ID|Automation Status|Automation Details|
|------------|-----------------------|---------|-----------------|-----------------|-----|
|TC-014|Sort products by price (low to high)|Functional|TC-014|Automated|UI sorting validation|
|TC-015|Sort products by name (Z to A)|Functional|TC-015|Automated|UI sorting validation|
|TC-016|Product details view|Functional|TC-016|Automated|Verifies image, name, description, price|
|TC-017|Add multiple items to cart|Functional|TC-017|Automated|Uses DataHelper.getRandomProducts(3)|
|TC-018|Remove one item from cart|Functional|TC-018|Automated|Removes random item|
|TC-019|Cart state persists across navigation|Functional|TC-019|Automated|Cart state persistence check|
|TC-020|Full purchase flow|Functional|TC-020|Automated|End to end successfull path|
|TC-021|Checkout form validation|Functional|TC-021|Automated|Negative scenario|
|TC-022|Total price with tax is calculated correctly|Functional|TC-022|Automated|Price calculation validation|
|TC-023|Back from product detail to product list|Functional|TC-023|Automated|UI navigation|
|TC-024|Use browser back button from product detail|Functional|TC-023|Automated|Browser navigation|

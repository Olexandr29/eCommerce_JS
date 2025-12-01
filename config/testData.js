module.exports = {
    baseUrl: "https://www.saucedemo.com/",
    users: {
        standard: {username: "standard_user", password: "secret_sauce"},
        locked: {username: "locked_out_user", password: "secret_sauce"}
    },
    expected: {
        inventoryPageUrl: "https://www.saucedemo.com/inventory.html",
        inventoryHeading: "Products"
    },
    errors: {
        lockedUserError: "Epic sadface: Sorry, this user has been locked out."
    },
    testCases: {
        TC001: "TC001",
        TC002: "TC002",
        TC003: "TC003"
    }
    
}
module.exports = {
    baseUrl: "https://www.saucedemo.com/",
    users: {
        standard: {username: "standard_user", password: "secret_sauce"},
        locked: {username: "locked_out_user", password: "secret_sauce"},
        performance_glitch: {username: "performance_glitch_user", password: "secret_sauce"},
        fake: {username: "fake_user", password: "fake_password"},
    },
    expected: {
        inventoryPageUrl: "https://www.saucedemo.com/inventory.html",
        inventoryHeading: "Products",
        cartPageUrl: "https://www.saucedemo.com/cart.html",
    },
    errors: {
        lockedUserError: "Epic sadface: Sorry, this user has been locked out.",
        emptyUsernameField: "Epic sadface: Username is required",
        emptyPasswordField: "Epic sadface: Password is required",
        notExistedUser: "Epic sadface: Username and password do not match any user in this service",

    }
    
    
}
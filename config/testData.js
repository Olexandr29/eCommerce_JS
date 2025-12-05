const random = require("../utils/randomData");

module.exports = {
    baseUrl: "https://www.saucedemo.com/",

    users: {
        standard: {username: "standard_user", password: "secret_sauce"},
        locked: {username: "locked_out_user", password: "secret_sauce"},
        performance_glitch: {username: "performance_glitch_user", password: "secret_sauce"},
        fake: {username: "fake_user", password: "fake_password"},
    },

    infoForCheckout1: {
        firstName: "John",
        lastName: "Smith",
        zip: "123456789",
    },

    random() {
        return {
        firstName: random.randomFirstName(),
        lastName: random.randomLastName,
        zip: random.randomZip(),
    };
},

    expected: {
        inventoryPageUrl: "https://www.saucedemo.com/inventory.html",
        inventoryHeading: "Products",
        cartPageUrl: "https://www.saucedemo.com/cart.html",
        checkoutPage1Url: "https://www.saucedemo.com/checkout-step-one.html",
        checkoutPage1Ur2: "https://www.saucedemo.com/checkout-step-two.html",
    },

    errors: {
        lockedUserError: "Epic sadface: Sorry, this user has been locked out.",
        emptyUsernameField: "Epic sadface: Username is required",
        emptyPasswordField: "Epic sadface: Password is required",
        notExistedUser: "Epic sadface: Username and password do not match any user in this service",
    }

    }
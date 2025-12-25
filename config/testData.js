const users = require("./users.json");
const random = require("../utils/randomData");

module.exports = {
    baseUrl: "https://www.saucedemo.com/",

    users,
    
    sqlInjectionUserName: "admin' OR '1'='1",
    longName500: "a".repeat(500),

    infoForCheckout1: {
        firstName: "John",
        lastName: "Smith",
        zip: "123456789",
    },

    randomCheckout() {
        return {
        firstName: random.randomFirstName(),
        lastName: random.randomLastName(),
        zip: random.randomZip(),
    };
},

    expected: {
        inventoryPageUrl: "https://www.saucedemo.com/inventory.html",
        inventoryHeading: "Products",
        cartPageUrl: "https://www.saucedemo.com/cart.html",
        checkoutPage1Url: "https://www.saucedemo.com/checkout-step-one.html",
        checkoutPage1Ur2: "https://www.saucedemo.com/checkout-step-two.html",
        productDetailsPageUrl: "https://www.saucedemo.com/inventory-item.html?id=",
        confirmationPageUrl: "https://www.saucedemo.com/checkout-complete.html",
    },

    messages: {
        confirmationPageText: "Thank you for your order!",
    },

    errors: {
        lockedUserError: "Epic sadface: Sorry, this user has been locked out.",
        emptyUsernameField: "Epic sadface: Username is required",
        emptyPasswordField: "Epic sadface: Password is required",
        notExistedUser: "Epic sadface: Username and password do not match any user in this service",
        checkout1FirstName: "Error: First Name is required",
    },

    windowSize: {
        mobile: {
            name: "Mobile",
            width: 375,
            height: 667
        },

        tablet: {
            name: "Tablet",
            width: 768,
            height: 1024
        },

        desktop: {
            name: "Desctop",
            width: 1440,
            height: 900
        }
    },


    }
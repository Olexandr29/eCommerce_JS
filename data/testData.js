module.exports = {
    baseUrl: "https://www.saucedemo.com/",
    users: {
        standard: {username: "standard_user", password: "secret_sauce"},
        locked: {username: "locked_out_user", password: "secret_sauce"}
    },
    expected: {
        inventPage: "https://www.saucedemo.com/inventory.html",
        inventHeading: "Products"
    },
    errors: {
        forLockedUser: "Epic sadface: Sorry, this user has been locked out."
    }
}
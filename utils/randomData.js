module.exports = {
    randomFirstName() {
        const names = ["John", "Alex", "Kate", "Emma", "Robert", "Viktor", "Oleg", "Anna", "Danylo"];
        return names[Math.floor(Math.random() * names.length)];
    },

    randomLastName() {
        const surnames = ["Brown", "Smith", "Johnson", "Stark", "Taylor", "Melnyk", "Shevchenko", "Ivanov"];
        return surnames[Math.floor(Math.random() * surnames.length)];
    },

    randomZip() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
};

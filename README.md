# JavaScript UI Automation Framework (Mocha + WebDriver)

## 📌 Project Purpose

This project aims to build a scalable and maintainable **UI automation framework** for testing eShop (the web application **saucedemo.com**) using:
- JavaScript (Node.js)
- Mocha test framework
- WebDriver (Selenium WebDriver)
- Page Object Model (POM)
- GitHub Actions for CI/CD
- Reporting tools (Allure / Mochawesome)

The goal is to create a professional-grade automation environment that demonstrates real industry practices and allows running automated tests locally and remotely.

---

## 📁 Project Structure (initial)

```

project-root/
│
├── test/                 # Mocha test file/s
├── pages/                # Page Object files
├── config/               # Configuration settings (baseUrl), credentials, test data, environment settings
├── utils/                # Reusable helper functions (custom waits, screenshots, actions, wrappers)
└── .gitignore            # List of folders and files that will not be commited on GitHub
├── package.json          # json file with scripts and dependencies
└── README.md             # Description of the project
└── Task_TestCases.md     # List of implemented test cases (Smoke, Sanity, Functional, etc.) and other tasks with status 




```

---

## 🧪 Test Execution (temporary)

Run all tests:

```

npm test

```

Mocha will run any test inside `/tests`.

---





<br>
Additional Information:

Project organized using SCRUM methodology (weekly sprints). 

Task management performed using Trello Kanban board
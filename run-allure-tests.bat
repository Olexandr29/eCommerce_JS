@echo off
echo Running tests with Allure ...
call npm run test:allure

echo Generating Allure report ...
call npm run allure:generate

echo Opening Allure report
call npm run allure:open
pause
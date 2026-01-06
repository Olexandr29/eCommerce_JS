@echo off
echo Running tests with Allure ...
call npm run test

echo Copying history if exists
if exist allure-report\history (
    mkdir allure-results\history
    xcopy allure-report\history allure-results\history /E /Y
)

echo Generating Allure report ...
call npm run allure:generate

echo Opening Allure report
call npm run allure:open
pause
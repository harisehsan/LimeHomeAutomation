# LimeHomeAutomation

This repository contains **End-to-End (E2E) and API tests** for the Limehome project using:

- Playwright
- TypeScript
- Page Object Model (POM)
- API testing with Playwright

The prerequisites are required to run the tests locally:

1.	Clone the repo “git clone https://github.com/harisehsan/LimeHomeAutomation.git”
2.	Go to the cloned project root directory in the terminal or command prompt. Like in my case, I used this command “cd limehome-e2e” 
3.	Execute the “npm install” command to install npm. 
4.	Then execute “npx playwright install” to install playwright. 
5.	Run the command “npm install dotenv --save “
6.	Then run “npm install --save-dev @types/dotenv”

Make sure each above steps must be completed properly without any error.

How to run the tests:

To run all tests, then execute the following command :

1.	Goto the tests directory by using the command “cd .\tests\”
2.	Then run “npx playwright test”

To run the specific .spec file only, use the following command (as an example):

“npx playwright test ui/cart.spec.ts” in the tests directory

Change the .spec file and/or directory to run a different .spec file

Note: The HTML reports are automatically shown when test(s) are completed. Additionally, the screenshot and video of failed scenarios are stored. The reports are stored in “/playwright-report” and the screenshots and videos (for failed scenarios only) are stored in “/test-results” directories. 

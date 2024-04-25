const { test, expect } = require('@playwright/test');

test.describe("Admin login",()=>{
    test("should login with valid credentials",async({page})=>{
        await page.goto("index.html");
        await page.fill('#email_input',"admin@gmail.com");
        await page.fill('#password_input',"admin123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("home");
    });
})

test.describe("Applicant login",()=>{
    test("Applicant should be able to login if already has an account",async({page})=>{
        await page.goto("index.html");
        await page.fill('#email_input',"testapplicant@gmail.com");
        await page.fill('#password_input',"applicant123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("home");
    });
})

test.describe("Funding manager pending",()=>{
    test("FM should be able to login in if already signed up and get a pending message",async({page})=>{
        await page.goto("index.html");
        await page.fill('#email_input',"testfund@gmail.com");
        await page.fill('#password_input',"fund123");
        await page.click('#submit_button');
        //goes to right page
        await expect(page).toHaveURL("home");

        //right title
        await expect(page).toHaveTitle("Awaiting Approval")

        const specificPTag = page.locator('p:has-text("Your account is under review and needs to be approved by a Platform Admin and this may take a while. You will recieve an email when verified.")')
        const isPresent = await specificPTag.isVisible();
        //p tag is visible
        await expect(isPresent).toBeTruthy();
    });
})
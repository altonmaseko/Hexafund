const { test, expect } = require('@playwright/test');

test.describe("Admin login",()=>{
    test("should login with valid credentials",async({page})=>{
        await page.goto("http://localhost:5500/frontend/login_page.html");
        await page.fill('#email_input',"admin@gmail.com");
        await page.fill('#password_input',"admin123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:5500/home");
    });
})


test.describe("Applicant signup",()=>{
    test("should be able to create an account and go to the home page",async({page})=>{
        await page.goto("http://localhost:5500/frontend/login_page.html");
        await page.fill('#email_input',"admin@gmail.com");
        await page.fill('#password_input',"admin123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:5500/home");
    });
})
const { test, expect } = require('@playwright/test');

test.describe("Admin login",()=>{
    test("should login with valid credentials",async({page})=>{
        await page.goto("http://localhost:3000/login.html");
        await page.fill('#email_input',"admin@gmail.com");
        await page.fill('#password_input',"admin123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:3000/home");
    });
})

test.describe("Applicant login",()=>{
    test("Applicant should be able to login if already has an account",async({page})=>{
        await page.goto("http://localhost:3000/login.html");
        await page.fill('#email_input',"applicant@gmail.com");
        await page.fill('#password_input',"applicant123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:3000/home");
    });
})


test.describe("Funding manager login",()=>{
    test("FM should be able to login if already has an account",async({page})=>{
        await page.goto("http://localhost:3000/login.html");
        await page.fill('#email_input',"fund@gmail.com");
        await page.fill('#password_input',"fund123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:3000/home");
    });
})
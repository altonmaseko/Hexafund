const { test, expect } = require('@playwright/test');
const { v4: uuidv4 } = require('uuid');

test.describe("Testing compontents",()=>{
    test("Dropdown should add/remove an extra field",async({page})=>{
        await page.goto("http://localhost:3000/signup.html");
        await page.selectOption('#drop_down',{label:'Fund Manager'})
        expect(await page.isVisible('input[name=Fund_Manager]'));
    });
})


/*
test.describe("Testing if Applicant can signup and login with same details",()=>{
    test("Applicant signup",async({page})=>{
        const user = "test@gmail.com"
        const pass = "test123";

        await page.goto("http://localhost:3000/signup.html");
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.fill('#confirm_password_input',pass);
        await page.click('#submit_button');


        await page.goto("http://localhost:3000/login.html");
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.click('#submit_button');
        await expect(page).toHaveURL("http://localhost:3000/home");
    });
})*/
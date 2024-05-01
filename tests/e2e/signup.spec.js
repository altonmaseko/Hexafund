import { test, expect } from "../e2e/_shared/app-fixtures";
const { v4: uuidv4 } = require('uuid');

test.describe("Testing compontents",()=>{
    test("Dropdown should add/remove an extra field",async({page})=>{
        await page.goto("signup.html");
        await page.selectOption('#drop_down',{label:'Funding Manager'})
        expect(await page.isVisible('input[name=Fund_Manager]'));
    });
})

test.describe("Testing if users can signup and login with same details",()=>{
    test("Applicant signup",async({page})=>{
        const name = uuidv4();
        const user = uuidv4()+"@gmail.com"
        const pass = uuidv4();

        await page.goto("signup.html");
        await page.fill('#name_input',name);
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.fill('#confirm_password_input',pass);
        await page.click('#submit_button');

        await page.goto("login.html");
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.click('#submit_button');

        await expect(page).toHaveURL("home");
    });

    test("FM signup",async({page})=>{
        const name = uuidv4();
        const user = uuidv4()+"@gmail.com"
        const pass = uuidv4();
        const company = uuidv4()+"testcompany"

        await page.goto("signup.html");
        await page.selectOption('#drop_down',{label:'Funding Manager'})

        await page.fill('#name_input',name);
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.fill('#confirm_password_input',pass);
        await page.fill('#company_input',company)
        await page.click('#submit_button');
        
        //should go to login screen
        await expect(page).toHaveURL("login.html");

        await page.goto("login.html");
        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.click('#submit_button');
        //should go to login
        await expect(page). toHaveURL("home");
    });
});

test.describe("Funding manager pending",()=>{
    test("FM should be able to sign up and get a pending message",async({page})=>{
        await page.goto("login.html");
        await page.fill('#email_input',"test-fund@gmail.com");
        await page.fill('#password_input',"fund123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("home");
    });
})
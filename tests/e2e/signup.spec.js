const { test, expect } = require('@playwright/test');
const { v4: uuidv4 } = require('uuid');

let flags = {}


test.describe("Testing compontents",()=>{
    test("Dropdown should add/remove an extra field",async({page})=>{
        await page.goto("signup.html");
        await page.selectOption('#drop_down',{label:'Funding Manager'})

        if (await page.isVisible('input[name=Fund_Manager]')){
            flags["FM_INPUT"] = true;
        }
        else{
            flags["FM_INPUT"] = false;
        }

        expect(await page.isVisible('input[name=Fund_Manager]'));
    });
})


test.describe("Testing if users can signup and login with same details",()=>{
    test("Applicant signup",async({page})=>{
        const user = uuidv4()+"@gmail.com"
        const pass = uuidv4();

        await page.goto("signup.html");
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
        const user = uuidv4()+"@gmail.com"
        const pass = uuidv4();
        const company = "testcompany"

        if (flags["FM_INPUT"] == false){
            test.skip();
        }

        await page.goto("signup.html");
        await page.selectOption('#drop_down',{label:'Funding Manager'})

        await page.fill('#email_input',user);
        await page.fill('#password_input',pass);
        await page.fill('#confirm_password_input',pass);
        await page.fill('#company_input',company)
        await page.click('#submit_button');
        
        //should go to login screen
        await expect(page).toHaveURL("login.html")


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
        await page.fill('#email_input',"testfund@gmail.com");
        await page.fill('#password_input',"fund123");
        await page.click('#submit_button');
        await expect(page).toHaveURL("home");
    });
})
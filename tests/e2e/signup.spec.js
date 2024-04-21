const { test, expect } = require('@playwright/test');

test.describe("Testing compontents",()=>{
    test("Dropdown should add/remove an extra field",async({page})=>{
        await page.goto("http://localhost:5500/frontend/signup.html");
        page.selectOption('select[name=Drop_Down]',{option:'Funding Manager'})
        expect(await page.isVisible('input[name=Funding_Manager]'));
    });
})
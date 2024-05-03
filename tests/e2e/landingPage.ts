import { test, expect } from "../e2e/_shared/app-fixtures";


test('Landing page button works', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign Up Today!' }).click();
  await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
});
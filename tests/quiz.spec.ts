import { test, expect } from '@playwright/test';

test.describe('Quiz Application E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure the app is running locally before testing
    await page.goto('http://localhost:5173');
  });

  test('app loads and shows the first question', async ({ page }) => {
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('text=KÜSIMUS 1 / 5')).toBeVisible();
  });

  test('score increases correctly on correct answer', async ({ page }) => {
    // Correct answer for first question is "1 374 687"
    await page.click('text=1 374 687');
    await expect(page.locator('text=Õige vastus!')).toBeVisible();
  });

  test('final summary table is displayed after completion', async ({ page }) => {
    // Cycle through all 5 questions
    for (let i = 0; i < 5; i++) {
      const buttons = page.locator('.options-list button');
      await buttons.first().click();
      // Wait for feedback transition delay
      await page.waitForTimeout(1300); 
    }

    // Verify final state
    await expect(page.locator('.header-title')).toHaveText(/Tulemused/i);
    await expect(page.locator('table.results-table')).toBeVisible();
    await expect(page.locator('.personalized-message')).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Viktoriini rakenduse testid', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('viktoriin laeb ja kuvab esimest küsimust', async ({ page }) => {
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('text=Küsimus 1 / 3')).toBeVisible();
  });

  test('punktisumma suureneb õige vastuse korral', async ({ page }) => {
    // First question (1 374 687 is correct)
    await page.click('text=1 374 687');
    await expect(page.locator('text=Õige vastus!')).toBeVisible();
  });

  test('vale vastuse korral kuvatakse vastavat teadet', async ({ page }) => {
    // Choose wrong answer
    await page.click('text=1 150 200');
    await expect(page.locator('text=Vale vastus!')).toBeVisible();
  });

  test('viktoriini lõpus kuvatakse tulemuste tabel', async ({ page }) => {
    // Answering all questions 
    for (let i = 0; i < 3; i++) {
      const buttons = page.locator('button');
      await buttons.first().click();
      await page.waitForTimeout(1100); 
    }

    await expect(page.locator('h1')).toHaveText('Viktoriini tulemused');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=Lõppskoor:')).toBeVisible();
  });
});
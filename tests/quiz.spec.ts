import { test, expect } from '@playwright/test';

test.describe('Viktoriini rakenduse testid', () => {
  
  test.beforeEach(async ({ page }) => {
    // Muuda porti, kui su rakendus jookseb kuskil mujal
    await page.goto('http://localhost:5173');
  });

  test('viktoriin laeb ja kuvab esimest küsimust', async ({ page }) => {
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('text=Küsimus 1 / 3')).toBeVisible();
  });

  test('punktisumma suureneb õige vastuse korral', async ({ page }) => {
    // Esimene küsimus (1 374 687 on õige)
    await page.click('text=1 374 687');
    await expect(page.locator('text=Õige vastus!')).toBeVisible();
  });

  test('vale vastuse korral kuvatakse vastavat teadet', async ({ page }) => {
    // Valime vale vastuse
    await page.click('text=1 150 200');
    await expect(page.locator('text=Vale vastus!')).toBeVisible();
  });

  test('viktoriini lõpus kuvatakse tulemuste tabel', async ({ page }) => {
    // Vastame kõigile küsimustele (ei ole oluline, kas õigesti)
    for (let i = 0; i < 3; i++) {
      const buttons = page.locator('button');
      await buttons.first().click();
      // Ootame, kuni tagasiside kaob ja järgmine küsimus laeb
      await page.waitForTimeout(1100); 
    }

    await expect(page.locator('h1')).toHaveText('Viktoriini tulemused');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=Lõppskoor:')).toBeVisible();
  });
});
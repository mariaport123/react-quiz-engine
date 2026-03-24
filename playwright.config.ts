import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Jooksuta teste failides paralleelselt */
  fullyParallel: true,
  /* CI peal kukkuda läbi, kui test.only on koodi unustanud */
  forbidOnly: !!process.env.CI,
  /* Retries - proovi uuesti ainult CI keskkonnas */
  retries: process.env.CI ? 2 : 0,
  /* Töölised (workers) */
  workers: process.env.CI ? 1 : undefined,
  /* Raporti formaat */
  reporter: 'html',
  
  use: {
    /* Põhiaadress, mida testid kasutavad */
    baseURL: 'http://localhost:5173',
    /* Salvesta trace ainult esimesel ebaõnnestunud katsel */
    trace: 'on-first-retry',
  },

  /* Testi projektid brauserite kaupa */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    /* Märkus: Webkit on eemaldatud ühilduvusprobleemide tõttu macOS 12-ga.
       Testimine toimub Chromis ja Firefoxis.
    */
  ],

  /* Käivita lokaalne server automaatselt enne testide algust (valikuline) */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  // },
});
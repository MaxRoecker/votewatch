import { expect, test } from '@playwright/test';

test('Navigation between legislator and bill pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Check the home page
  await expect(
    page.getByRole('heading', { name: 'Latest Legislators' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Latest Bills' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'DB Rep. Don Bacon R - NE -' }),
  ).toBeVisible();

  // Navigates to legislator page
  await page.getByRole('link', { name: 'DB Rep. Don Bacon R - NE -' }).click();
  await expect(
    page.locator('a').filter({ hasText: 'H.R. 5376: Build Back Better' }),
  ).toBeVisible();

  await expect(
    page.locator('a').filter({ hasText: 'H.R. 3684: Infrastructure' }),
  ).toBeVisible();

  // Navigates to bill page
  await page
    .locator('a')
    .filter({ hasText: 'H.R. 5376: Build Back Better' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'H.R. 5376: Build Back Better' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'JY Rep. John Yarmuth D - KY -' }),
  ).toBeVisible();
  await expect(
    page.locator('a').filter({ hasText: 'RTRep. Rashida TlaibD - MI -' }),
  ).toBeVisible();
  await expect(
    page.locator('a').filter({ hasText: 'DYRep. Don YoungR - AK -' }),
  ).toBeVisible();
});

test('Navigation between lists', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Navigate to the to the list of legislators page
  await page.getByRole('link', { name: 'See all legislators' }).click();

  // Goes to the end of the list
  await page.getByLabel('Go to next page').click();
  await page.getByLabel('Go to next page').click();
  await page.getByLabel('Go to next page').click();
  await page.getByLabel('Go to next page').click();

  // Check the end of the list message
  await expect(page.getByText('No other legislators were')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Back to First Page' }),
  ).toBeVisible();

  // Goes to the first page
  await page.getByRole('link', { name: 'Back to First Page' }).click();
  await expect(page).toHaveURL('/legislators');
});

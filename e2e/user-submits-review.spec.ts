import { test, expect } from '@playwright/test';
import { clerk } from '@clerk/testing/playwright'

test('user can sign in, submit a review, and sign out', async ({ page }) => {
  await page.goto('/sign-in');

  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });

  await page.goto('/submit-review');

  await expect(page).toHaveURL('/submit-review');

  // Fill in the review form
  await page.getByLabel(/review/i).fill('Had a great experience!');
  await page.getByLabel(/rating/i).fill('5');
  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page.getByText(/form submitted successfully/i)).toBeVisible();
  
  await clerk.signOut({ page });

  await expect(page).toHaveURL('/');
})
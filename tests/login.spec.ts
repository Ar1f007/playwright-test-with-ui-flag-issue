import { test, expect } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("/");
});

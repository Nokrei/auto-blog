import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.getByRole("link", { name: "Example" }).click();
  await page
    .getByRole("link", { name: "AB Auto Blog A platform that" })
    .click();
  await page.getByRole("button", { name: "Light" }).click();
  await page.getByRole("button", { name: "Dark" }).click();
  await page.getByRole("link", { name: "Example" }).click();
  await page
    .locator(".rounded-xl > div:nth-child(2) > a > .inline-flex")
    .first()
    .click();
  await page.getByRole("link", { name: "Example" }).click();
  await page.getByRole("button", { name: "Create new" }).click();
});

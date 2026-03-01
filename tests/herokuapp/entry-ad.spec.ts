import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test, Page } from "@playwright/test";

async function validate_pop_up(page: Page) {
    await expect(page.locator(".modal")).toHaveCount(1);
    await expect(page.locator(".modal-title").getByText("This is a modal window")).toHaveCount(1);
    await expect(page.locator(".modal-body").getByText("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).")).toHaveCount(1);
    await expect(page.locator(".modal-footer").getByText("Close")).toHaveCount(1);
}

test('ADEntry', async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/entry_ad");

    await validate_pop_up(page);

    await page.locator(".modal-footer").getByText("Close").click();

    const parent_text = page.locator(".example");
    await expect(parent_text.getByText("Entry Ad")).toHaveCount(1);
    await expect(parent_text.getByText("If closed, it will not appear on subsequent page loads.")).toHaveCount(1);
    await expect(parent_text.getByText("To re-enable it,")).toHaveCount(1);

    await page.getByRole("link", { name: "click here" }).click();
    await validate_pop_up(page);
  
});

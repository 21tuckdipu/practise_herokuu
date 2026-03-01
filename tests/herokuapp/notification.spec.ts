import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("notification_msg", async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/notification_message_rendered");

    const flash_container = page.locator("#flash");
    const click_here = page.getByRole("link", { name: "Click here" });
    expect(flash_container).toHaveCount(1);

    expect(click_here).toHaveCount(1);

    for (let i = 0; i < 5; i++) {
        await click_here.click();
        await page.waitForLoadState("load");
        await expect(flash_container).toHaveText(/Action successful|Action unsuccesful, please try again/);
        await page.waitForTimeout(100)
    }


})
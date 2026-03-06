import { expect, test } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test.fail("typo", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/typos");
    const header = page.locator("h3").getByText("Typos");
    const text_01 = page.locator("p").getByText("This example demonstrates a typo being introduced. It does it randomly on each page load.");
    const typo_text = page.getByText("Sometimes you'll see a typo, other times you won't.");

    await expect(header).toHaveCount(1);
    await expect(text_01).toHaveCount(1);

    for (let i = 0; i < 3; i++) {
        try {
            await expect(typo_text).toHaveCount(1)
        } catch (error) {
            throw new Error("Typo error");
        }
        await page.reload();
    }
   

    await page.pause();
})
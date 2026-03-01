{ }
import { test, expect, chromium, BrowserContext } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test('BrokenIMG-COUNT', async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/broken_images");

    const IMG_HOLDER = page.locator("#content");
    const IMG = IMG_HOLDER.getByRole("img");

    await expect(page.getByText("Broken Images")).toHaveCount(1);
    expect(IMG).toHaveCount(3);

    let img_01 = await IMG.nth(0).evaluate((image: HTMLImageElement) => image.naturalWidth);
    expect.soft(img_01).toBeGreaterThan(0);

    let img_02 = await IMG.nth(1).evaluate((image: HTMLImageElement) => image.naturalWidth);
    expect.soft(img_02).toBeGreaterThan(0);

    let img_03 = await IMG.nth(2).evaluate((image: HTMLImageElement) => image.naturalWidth);
    expect.soft(img_03).toBeGreaterThan(0);


})
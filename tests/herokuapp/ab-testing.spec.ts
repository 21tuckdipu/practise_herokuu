import { BASE_HEROKUAPP } from "../../config-data.ts";
import { test, defineConfig, Config, expect } from "@playwright/test";
export default defineConfig({
    use: {
        headless: false
    }
})

//TAG Functionality : tag:[]
test.describe("Checking Color Schemae", () => {

    test.use({ colorScheme: "dark" }); //use to check hte dark and ligh theme of the appliancs
    test("A/B Testing", { tag: ["@AB"] }, async ({ page }) => {
        await page.goto(BASE_HEROKUAPP);

        let ABTesting = page.getByRole('link', { name: "A/B Testing" });
        await expect(ABTesting).toHaveCount(1);
        await ABTesting.click();
        await expect(ABTesting).toHaveCount(0);

        //Navigation - backward Navigation
        await page.goBack();
        await expect(ABTesting).toHaveCount(1)

        //Navifation - Forward Naviation
        await page.goForward();
        await expect(ABTesting).toHaveCount(0);

        await test.info().attach("Screenshot", {
            body: await page.screenshot(),
            contentType: "image/png"
        });

    })

});
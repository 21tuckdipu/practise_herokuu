import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test, Locator, Page } from "@playwright/test";

test.describe("js-popup", async () => {
    test("js-alert", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/javascript_alerts");
        page.on("dialog", async (dialog) => {
            await page.waitForTimeout(1000)
            await dialog.accept()
        });
        const alert_button = page.getByRole("button", { name: "Click for JS Alert" });
        await alert_button.click();
    });
    test("confirm-js", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/javascript_alerts");
        let track_confirm_count = 0;
        page.on("dialog", async (dialog) => {
            await page.waitForTimeout(200);
            if (track_confirm_count % 2 == 0) {
                await dialog.accept();
            } else {
                await dialog.dismiss();
            }
        });

        for (let i = 0; i < 4; i++) {
            const alert_button = page.getByRole("button", { name: "Click for JS Confirm" });
            await alert_button.click();
            if (track_confirm_count % 2 == 0) {
                expect(page.locator("#result").getByText("You clicked: Ok")).toHaveCount(1)
            } else {
                expect(page.locator("#result").getByText("You clicked: Cancel")).toHaveCount(1)
            }
            track_confirm_count = i;
        }
    });
    test("prompt-js", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/javascript_alerts");
        let value = 'Dipu';
        let track_confirm_count = 0;
        page.on("dialog", async (dialog) => {
            await page.waitForTimeout(2000);
            if (track_confirm_count % 2 == 0) {
                await dialog.accept(value);
            } else {
                await dialog.dismiss();
            }
        });

        for (let i = 0; i < 4; i++) {
            await page.getByRole("button", { name: "Click for JS Prompt" }).click();
            if(track_confirm_count%2 ==0){
            await expect(page.locator("p#result").getByText(`you entered: ${value}`)).toHaveCount(1);
            }else{
                await expect(page.locator("p#result").getByText("you entered: null")).toHaveCount(1);
            }
            track_confirm_count +=1;
        }
    });
})
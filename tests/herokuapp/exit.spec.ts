import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test, Page } from "@playwright/test";

//not able ti do
test.skip("Eixt", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/exit_intent");
    await page.mouse.move(100, 100);
    await page.waitForTimeout(1000);
    await page.mouse.move(100, 0);

   

    await page.pause()
})
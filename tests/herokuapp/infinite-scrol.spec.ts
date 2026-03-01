//https://the-internet.herokuapp.com/infinite_scroll
import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test } from "@playwright/test";

test("Scroll-Need", async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/infinite_scroll");
    const scroll_able_event = page.locator("[class='scroll large-8 columns large-centered']");
    await scroll_able_event.screenshot({animations:"disabled",path:'./emiway.png'});
    await page.screenshot({path:"dipu.png",fullPage:true});
    await page.locator("[class='scroll large-8 columns large-centered']").hover();
    await page.mouse.wheel(0, 700);
    // Scroll down 500px
    await page.evaluate(() => {
        window.scrollBy(0, 5000);
    });
    await page.pause()
})
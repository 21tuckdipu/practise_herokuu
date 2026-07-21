{ }
import { test, expect, chromium, ChromiumBrowser, BrowserContext } from "@playwright/test";

let open_chrome: ChromiumBrowser;
let context_01: BrowserContext;
let context_02: BrowserContext;

test.beforeAll('Browser Setup', async () => {
    open_chrome = await chromium.launch({ headless: false });
    context_01 = await open_chrome.newContext();
    context_02 = await open_chrome.newContext();
});

//you can open multple tab in same browser and hit multiple pages
test("OPen Browser", async () => {

    const page_01 = await context_01.newPage();
    const page_03 = await context_01.newPage()
    await page_01.goto('https://playwright.dev/docs/intro');
    
    const darkModeToggleBtn =  page_01.locator(`div[class*="colorModeToggle_DEke"] button`);

    await expect(darkModeToggleBtn).toBeEnabled();
    await darkModeToggleBtn.focus()

    //bouding box conepcpt to check wther elemetn is actually clickable 
    // const isClickAble = await darkModeToggleBtn.boundingBox();
    // console.log(isClickAble)
    await darkModeToggleBtn.dblclick()

    await expect(darkModeToggleBtn).toHaveAttribute("title","dark mode")

    await page_03.goto("https://playwright.dev/docs/writing-tests")
    console.log(await page_03.url())
    await expect(await page_03.url()).toContain("/writing-tests");
    await expect(page_03.locator("header")).toContainText("Writing tests")

    // await context_01.close();

    // const page_02 = await context_02.newPage();
    // await page_02.pause()
    // await page_02.goto('https://playwright.dev/docs/browsers');
    // await page_02.waitForTimeout(10);

    // await page_02.close()

});

// test.afterAll('',async()=>{
//     await context_01.close();
//     await context_02.close();
//     await open_chrome.close();
// });

// npx playwright test browser.spec.ts
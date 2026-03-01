{}
import { test, expect, chromium, ChromiumBrowser, BrowserContext } from "@playwright/test";

let open_chrome : ChromiumBrowser;
let context_01 : BrowserContext;
let context_02 :BrowserContext;

test.beforeAll('Browser Setup',async()=>{
    open_chrome =  await chromium.launch({ headless: false });
    context_01 = await open_chrome.newContext();
    context_02 = await open_chrome.newContext();
});

test("OPen Browser", async () => {
   
    const page_01 = await context_01.newPage();
    await page_01.goto('https://playwright.dev/docs/browsers');
    await page_01.waitForTimeout(10);

    const page_02 = await context_02.newPage();
    await page_02.goto('https://playwright.dev/docs/browsers');
    await page_02.waitForTimeout(10);

    

});

test.afterAll('',async()=>{
    await context_01.close();
    await context_02.close();
    await open_chrome.close();
})
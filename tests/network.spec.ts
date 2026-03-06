
import { test, expect, chromium, ChromiumBrowser, BrowserContext } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL ?? "";
const username = process.env.USERID ?? "";
const password = process.env.PASSWORD ?? "";

let open_chrome: ChromiumBrowser;
let context_01: BrowserContext;
let context_02: BrowserContext;

test.describe.skip("network-call", async () => {
    test.beforeAll('Browser Setup', async () => {
        open_chrome = await chromium.launch({ headless: false });
        context_01 = await open_chrome.newContext();

    });

    test("OPen Browser", async () => {

        const page_01 = await context_01.newPage();

        // page_01.on('request', request => console.log(request.url()));
        await page_01.goto(`${BASE_URL}/login`);
        await page_01.getByRole("button", { name: "Non Marico Login" }).click()
        await page_01.getByPlaceholder("Username").fill(username);
        await page_01.getByPlaceholder("Password").fill(password);

        // page_01.on("response", response => console.log(response.status() + response.url()));
        await page_01.route("**/JWTAuth/GetToken", async (route) => {
            console.log(route.request().url());
            console.log(route.request().method());
            console.log(route.request().postData());
            // route.continue();
            // route.abort();
            route.fulfill({
                status: 500,
                contentType: "appliance/json",
                body: JSON.stringify({
                    token: "Expired! come again"
                })
            });
        });
        page_01.on("response", async (response) => {
            console.log(response.status());
            console.log(response.body());
            // console.log( await response.headerValue('content-type'));
            console.log(response.json());
        }
        )
        await page_01.getByRole('button', { name: "Login" }).click();



    });

    test.afterAll('', async () => {
        await context_01.close();
        await open_chrome.close();
    });

});

//npx playwright test network.spec.ts
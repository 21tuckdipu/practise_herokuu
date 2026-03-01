import { test } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";


test("slow", async ({ page }) => {
    test.setTimeout(120000);

    page.on('request', (request) => {
        if (request.url().includes("/slow")) {
            console.log(request.url() + " ");
        }
    });
    page.on("response", (response) => {
        if (response.url().includes("/slow_external")) {
            console.log(response.status() + " " + response.url());
        }
    });

    await page.goto(BASE_HEROKUAPP + "/slow", { waitUntil: "networkidle" });

});
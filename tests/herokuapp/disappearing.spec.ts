{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { test, expect, chromium, Page } from "@playwright/test";

//scope
// switch:case for better controller over the ElementInternals

test('Disappearing', async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/disappearing_elements");
    const TAB_MENU = ["Home", "About", "Contact Us", "Portfolio", "Gallery"];

    await page.getByRole("link", { name: TAB_MENU[0] }).click();
    expect(page.getByText("Welcome to the-internet")).toHaveCount(1);

    await page.getByRole("link", { name: "Disappearing Elements" }).click();
    await page.getByRole("link", { name: TAB_MENU[1] }).click();
    expect(page.getByText("Not Found")).toHaveCount(1);

    await page.goBack()
    await page.getByRole("link", { name: TAB_MENU[2] }).click();
    await expect(page.getByText("Not Found")).toHaveCount(1);

    await page.goBack()
    await page.getByRole("link", { name: TAB_MENU[3] }).click();
    await expect(page.getByText("Not Found")).toHaveCount(1);

    await page.goBack()
   
    while (true) {
        let status_Element = await page.getByRole("link", { name: TAB_MENU[4] }).isVisible();
        if (status_Element) {
            await page.getByRole("link", { name: TAB_MENU[4] }).click();
            await expect(page.getByText("Not Found")).toHaveCount(1);
            break;
        } else {
            await page.reload();
        }
    }




});

//npx playwright test herokuapp/disappearing.spec.ts --headed


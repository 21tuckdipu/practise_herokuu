import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test.describe("dynamic-loading", async () => {
    test.beforeEach("goto-dynamic-loading", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/dynamic_loading");
    });

    test("element on page -hidden", async ({ page }) => {
        const dynamic_01 = page.getByRole("link",{name:"Example 1: Element on page that is hidden"});
        const start_button = page.getByRole("button",{name:"Start"});

        await expect(dynamic_01).toHaveCount(1);

        await dynamic_01.click();
        await expect(start_button).toHaveCount(1);

        await start_button.click();
        await expect(page.locator("div#loading")).toHaveAttribute("style",'display: none;',{timeout:10000});
        await expect(page.getByText("Hello World!")).toHaveCount(1);
    });

    test("element not on page", async ({ page }) => {
        const dynamic_02 = page.getByRole("link",{name:"Example 2: Element rendered after the fact"});
        const start_button = page.getByRole("button",{name:"Start"});

        await expect(page).toHaveURL(/dynamic_loading/);
        await expect(dynamic_02).toHaveCount(1);
        await dynamic_02.click();

        await expect(start_button).toHaveCount(1);
        await start_button.click();

        await expect(page).toHaveURL(/2/);
        await expect(page.locator("div#loading")).toBeHidden({timeout:10000});
        await expect(page.getByText("Hello World!")).toHaveCount(1);
        
    });
})
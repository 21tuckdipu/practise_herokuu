import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test.describe("JQuery-UI", async () => {
    test.beforeEach("gothrough-jquery-ui-endpoint", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/jqueryui/menu");
    });

    test("button_disables", async ({ page }) => {
        const disabled_button = page.locator("ul#menu li").filter({ hasText: "Disabled" })
        await expect(disabled_button).toHaveClass(/ui-state-disabled/);//form control - disabled /else use class to chck disbality
    });

    test("button_enabled", async ({ page }) => {
        const enable_button = page.locator("ul#menu li").filter({ hasText: "Enabled" });
        const download_option = enable_button.getByRole("menuitem",{name:"Downloads"});
        const download_option_pdf = download_option.locator("ul li").filter({hasText:"PDF"});
        const download_option_csv =download_option.locator("ul li").filter({hasText:"CSV"});
        const download_option_excel = download_option.getByRole("menuitem",{name:"EXCEL"});
        const back_button = enable_button.locator("ul li").filter({ hasText: "Back to JQuery UI" });

        await enable_button.highlight();
        await expect(enable_button).toBeEnabled();

        await enable_button.hover()

        await test.step("go-back-button", async () => {
            await enable_button.hover();
            await expect(back_button).toHaveCount(1)
            await back_button.click();

            await expect(page).toHaveURL(/jqueryui/);
            await expect(page.getByRole("link", { name: "Menu" })).toHaveCount(1);
            await page.getByRole("link", { name: "Menu" }).click();
            await expect(page).toHaveURL(/menu/);
        });
        await test.step("download_option", async () => {

            await expect(enable_button).toHaveCount(1);
            await enable_button.hover();
            await expect(download_option).toHaveCount(1);

            await download_option.hover();

            await expect(download_option_csv).toHaveCount(1);
            await expect(download_option_excel).toHaveCount(1);
            await expect(download_option_pdf).toHaveCount(1);

            await download_option_csv.hover();
            await download_option_excel.hover();
            await download_option_pdf.hover();
        });
    });

})
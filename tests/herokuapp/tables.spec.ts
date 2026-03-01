import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("tables", async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/tables");

    const table_01 = page.locator("#table1");
    const table_01_header = table_01.locator("thead tr th");
    const table_01_row = table_01.locator("tbody tr");

    const table_02 = page.locator("#table2");
    const table_02_row = table_02.locator("tbody tr");

    let count = await table_01_row.count();
    let header_count = await table_01_header.count();
    let count02 = await table_02_row.count();

    await test.step("with-out-identifer", async () => {
        const edit_link = table_01_row.nth(1).getByRole("link", { name: "edit" });
        const delete_link = table_01_row.nth(1).getByRole("link", { name: "delete" });

        await edit_link.click();
        await expect(page).toHaveURL(/tables#edit/);

        await delete_link.click();
        await expect(page).toHaveURL(/tables#delete/);
    });

    await test.step("by-identifier", async () => {
        const edit_table_02 = table_02_row.nth(1).getByRole("link", { name: "edit" });
        const delete_table_02 = table_01_row.nth(1).getByRole("link", { name: "delete" });

        await edit_table_02.click();
        await expect(page).toHaveURL(/tables#edit/);

        await delete_table_02.click();
        await expect(page).toHaveURL(/tables#delete/);
    });
});

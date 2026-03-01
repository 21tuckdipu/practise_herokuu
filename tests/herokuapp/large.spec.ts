import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test } from "@playwright/test";

test("Deep Nested", async ({ page }) => {
    test.setTimeout(120000);

    await page.goto(BASE_HEROKUAPP + "/large");

    await page.waitForLoadState("domcontentloaded");
    await test.step("no-sibilibling", async () => {
        await page.locator(".parent  #no-siblings").highlight();
    });

    await test.step("Sibling", async () => {
        const sibling_div = page.locator("#siblings div[id*='sibling-']");
        const index_count = await sibling_div.count()
        console.log(index_count);
        for (let index = 0; index < index_count; index++) {
            await sibling_div.nth(index).scrollIntoViewIfNeeded();
            await sibling_div.nth(index).highlight();
            await page.waitForTimeout(100)
        }
    });

    await test.step("table-fetch", async () => {

        const table = page.locator("#large-table");
        const header = table.locator("thead").locator("th");
        const body = table.locator("tbody");
        const table_row = body.locator("tr");
        const table_row_column = table_row.locator("td");

        // await header.nth(1).highlight()

        await test.step("ScrollHeader", async () => {
            const head_table_count = await header.count();
            for (let i = 0; i < head_table_count; i++) {
                await header.nth(i).scrollIntoViewIfNeeded();
                await header.nth(i).highlight();
                await page.waitForTimeout(200);
            }
        })

        await test.step("RowHighlight", async () => {
            const row_count = await table_row.count()
            for (let i = 0; i < row_count; i++) {
                await table_row.nth(i).scrollIntoViewIfNeeded()
                await table_row.nth(i).highlight();
            }
        });

        //this is take time so use it for kwoning how it run donot run daily
        await test.step.skip("Count Table Columns", async () => {
            const column_count = await table_row_column.count();
            for (let i = 0; i < column_count; i++) {
                await table_row_column.nth(i).scrollIntoViewIfNeeded()
                await table_row_column.nth(i).highlight();
            }
        })
    })
})
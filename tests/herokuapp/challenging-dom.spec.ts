{ }
import { test, expect, defineConfig, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

export default defineConfig({
    timeout: 1000
})
let ROW: Locator;
let INDEX00 = 'Iuvaret';
let INDEX01 = 'Apeirian';
let INDEX02 = 'Adipisci';
let INDEX03 = 'Definiebas';
let INDEX04 = 'Consequuntur';
let INDEX05 = 'Phaedrum';

async function compareRowColumValue(index:number) {
    await expect(ROW.nth(index).locator("td").nth(0)).toContainText(`${INDEX00}${index}`);
    await expect(ROW.nth(index).locator("td").nth(1)).toContainText(`${INDEX01}${index}`);
    await expect(ROW.nth(index).locator("td").nth(2)).toContainText(`${INDEX02}${index}`);
    await expect(ROW.nth(index).locator("td").nth(3)).toContainText(`${INDEX03}${index}`);
    await expect(ROW.nth(index).locator("td").nth(4)).toContainText(`${INDEX04}${index}`);
    await expect(ROW.nth(index).locator("td").nth(5)).toContainText(`${INDEX05}${index}`);
}
async function clickOnEditDelete(page: Page, index: number) {
    await ROW.nth(index).getByRole("link", { name: "edit" }).click();
    expect(page.url()).toContain("/challenging_dom#edit");
    await ROW.nth(index).getByRole("link", { name: "delete" }).click();
    expect(page.url()).toContain("/challenging_dom#delete");
}

test('ChanDOM', async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/challenging_dom");

    const ButtonLocator = page.locator("a.button");

    await expect(ButtonLocator).toHaveCount(3);
    await ButtonLocator.nth(0).click();
    await ButtonLocator.nth(1).click();
    await ButtonLocator.nth(2).click();
});

test('fetchTable', async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/challenging_dom");
    const ButtonLocator = page.locator("a.button");

    await expect(ButtonLocator).toHaveCount(3);

    //data validations
    const BODY = page.locator("tbody");
    ROW = BODY.locator("tr");
    const HEADER = page.locator("thead");
    const COLUMN_HEADER = HEADER.locator("th");

    let count_row = await ROW.count();
    let count_column = await COLUMN_HEADER.count();
    console.log("ROW COUNT" + count_row);
    console.log("COLUMN-COUNT" + count_column);

    //Clicking on edit and delete verifying the URL
    for (let i = 0; i < count_row; i++) {
        await clickOnEditDelete(page, i);
    }
    //validating the data
    for(let i = 0 ; i < count_row;i++){
        await compareRowColumValue(i);
    }
});

//npx playwright test challenging-dom.spec.ts --headed

//feedbaclk:
// avoid gobal variable thes will impact the test-isolation and falkyness
// best partialDeepStrictEqual
// Test isolation
// Best practices
// Avoiding globals
// Smart assertions
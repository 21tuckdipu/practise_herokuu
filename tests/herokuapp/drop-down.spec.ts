{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test } from "@playwright/test";

test("DropDown : ", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/dropdown");
    let select = page.locator("#dropdown");
    await select.selectOption({ value: "2" });
    await page.waitForTimeout(1000);
    await select.selectOption({ value: "1" });
    await page.waitForTimeout(1000);
    await select.selectOption({ value: "2" });
    await page.waitForTimeout(1000);
    await select.selectOption([{ value: "2" },{ value: "1" }]);// if dropdown does  not have multiple selection than 
    //default last one got selecyed
    //thrown err in invalid selection

});
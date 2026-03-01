{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test } from "@playwright/test";

test("input-num",async({page})=>{
    await page.goto(BASE_HEROKUAPP+"/inputs");
    const input = page.locator("input[type='number']")
    await input.fill('23');
    await expect(input).toHaveValue("23");
    await input.focus();

    await input.press("ArrowDown");
    await page.waitForTimeout(100);
    await input.press("ArrowDown");
    await page.waitForTimeout(100);
    await input.press("ArrowDown");
    await page.waitForTimeout(100)
    await input.press("ArrowUp");
    
    await expect(input).toHaveValue("21");
})
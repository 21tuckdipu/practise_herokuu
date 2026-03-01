import { test} from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test.describe('CheckBOXES',()=>{
    test.beforeEach('log',async({page})=>{
        await page.goto(BASE_HEROKUAPP+"/checkboxes");
    })
    test('Check the CHECK-BOXE',{tag:["@check"]},async({page})=>{
        await page.locator("input[type='checkbox']").nth(0).check();
    });
    test('Check the CHECK-BOXE @uncheck',async({page})=>{
        await page.locator("input[type='checkbox']").nth(1).uncheck();
    })
});

//npx playwright test herokuapp/checkbox.spec.ts
import { test} from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test('shifting-content',async({page})=>{
    await page.goto(BASE_HEROKUAPP+"/shifting_content");
    for(let i = 0 ;i<5;i++){
        await page.waitForTimeout(500);
        await page.reload()
    }
});
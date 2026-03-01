{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test} from "@playwright/test";

test("DragDrop",async({page})=>{
    await page.goto(BASE_HEROKUAPP+"/drag_and_drop");

    let initial_Element = page.locator("#column-a");
    let target_Location =page.locator("#column-b");

    let text_initial_Element = await initial_Element.locator("header").allInnerTexts();
    let text_target_Location = await target_Location.locator("header").allInnerTexts();

    await initial_Element.highlight();
    await initial_Element.hover();
    await page.mouse.down();

    await target_Location.highlight();
    await target_Location.hover();
    await page.mouse.up();

    await expect(target_Location.locator("header")).toHaveText(text_initial_Element);
    await expect(target_Location.locator("header")).not.toHaveText(text_target_Location);
    
});


//https://the-internet.herokuapp.com/drag_and_drop
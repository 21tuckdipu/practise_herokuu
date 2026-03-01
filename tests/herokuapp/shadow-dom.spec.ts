import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("shadow-dom", async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/shadowdom");
    //directing accessing
    const text_field = await page.locator("span[slot='my-text']").innerText();
    console.log(text_field);

    //accessing via parnet shadow dom
    const shadow_dom =  page.locator("my-paragraph ");
    // const inner_text = shadow_dom.locator("ul[slot='my-text'] li");
    const another_text =shadow_dom.getByRole("listitem");
    
    let option_container = [];
    let total_list_count = await another_text.count();
    for(let i = 0; i < total_list_count; i++){
        // let value = await inner_text.nth(i).innerText();
        let value = await another_text.nth(i).allTextContents()
        option_container.push(value);
    }
    console.log(total_list_count)
    console.log(option_container)
    await page.pause()

});
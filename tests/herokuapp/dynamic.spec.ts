
import { promises } from "node:dns";
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test, Locator } from "@playwright/test";
let duplicate_count_before_static = 0;
let duplicate_count_after_static = 0;
let img_tag_parent: Locator;

let record_duplicate: Record<string, number> = { "reload01": 0, "reload02": 0, "reload03": 0 };

let store_location_on_reload: Record<string, string[]> = {
     "reload01": [],
     "reload02": [],
     "reload03": []
}

async function fetch_img_src_reload(total_img_count: number, insert_reload_index: string) {
     for (let i = 0; i < total_img_count; i++) {
          let store_Attribute = await img_tag_parent.nth(0).getAttribute("src");
          store_location_on_reload[insert_reload_index].push(store_Attribute ?? "");
     }
}

async function check_duplicate_count(reload_time: string) {
     let my_arr = store_location_on_reload[reload_time];
     let compare_arr = 0;
     let initial_element = my_arr[compare_arr]

     for (let index = 0; index < my_arr.length; index++) {
          for (let internal_index = index + 1; internal_index < my_arr.length; internal_index++) {
               if (initial_element == my_arr[internal_index]) {
                    record_duplicate[reload_time] += 1;
               }
          }
          compare_arr += 1;
     }

}
//single approach
test('dynamic-contect-img', async ({ page }) => {
     await page.goto(BASE_HEROKUAPP + "/dynamic_content");
     const parent_contatiner = page.locator("#content [class~='large-10']");
     const content_container = parent_contatiner.locator("div.row");
     const fetch_text_body = content_container.locator("[class^='large-10']");
     img_tag_parent = page.locator("img[src*='Profile-Avatar-']");

     await parent_contatiner.highlight();
     await content_container.highlight();
     let total_img_count = await img_tag_parent.count();

     await fetch_img_src_reload(total_img_count, "reload01");
     await check_duplicate_count("reload01");

     await fetch_text_body.highlight();
     await page.reload();
     await page.waitForTimeout(100);
     await fetch_img_src_reload(total_img_count, "reload02");
     await check_duplicate_count("reload02");
     // console.log(store_location_on_reload)

     await page.reload()
     await page.waitForTimeout(100)
     await fetch_img_src_reload(total_img_count, "reload03");
     await check_duplicate_count("reload03");
     console.log(store_location_on_reload);
     console.log(record_duplicate);

});

//second appp  --need work and improvement
test.skip("dynamic-body", async ({ page }) => {
     await page.goto(BASE_HEROKUAPP + "/dynamic_content");
     const parent_contatiner = page.locator("#content [class~='large-10']");
     const content_container = parent_contatiner.locator("div.row");
     const body_container = content_container.locator(".large-10");

     let count_body_text = await body_container.count()
     for (let i = 0; i < count_body_text; i++) {
          await body_container.nth(i).highlight();
          let text_content = await body_container.nth(i).allInnerTexts();
        
          for (let j = i + 1; j < count_body_text; j++) {
          
               let comparr_text = await body_container.nth(j).allInnerTexts();
               console.log(comparr_text[j]+"   "+text_content[i])
               console.log("----------------")
               if(text_content[0] == comparr_text[0]){
                    console.log("duplicate")
               }else{
                    console.log("not Triggered")
               }
          }
     }
     await page.pause()

})
//chck duplicate
//if attibute presnt add+1
//else add to dic with 1
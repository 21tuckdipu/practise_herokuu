import { BASE_HEROKUAPP } from "../../config-data.ts";
import { test, expect } from "@playwright/test";
//this is one is not working
test("context-menu",async({page})=>{
     await page.goto(BASE_HEROKUAPP+"/context_menu");
     await page.locator("#hot-spot").click({button:"right"});
     await page.locator("#hot-spot").highlight();
     await page.pause();

});
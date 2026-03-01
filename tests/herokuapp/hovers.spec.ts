{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test } from "@playwright/test";

test("HOVERS",async({page})=>{

    await page.goto(BASE_HEROKUAPP+"/hovers");
    await expect(page.getByText("Hovers")).toHaveCount(1);
    await expect(page.getByText("Hover over the image for additional information")).toHaveCount(1);
    
    const IMG_CONTAINER = page.locator("div.figure img[alt='User Avatar']")
    const img_count = await IMG_CONTAINER.count();
    console.log(img_count)
    
    for(let i = 0 ;i <img_count;i++){
        await IMG_CONTAINER.nth(i).hover();
        await expect(page.getByText(`name: user${i+1}`)).toHaveCount(1);
        await expect(page.getByRole("link",{name:"View profile"})).toHaveCount(1);
        await page.getByRole("link",{name:"View profile"}).click();
        await expect(page.getByText("Not Found")).toHaveCount(1);
        await page.goBack();
    }
    await page.pause();
});


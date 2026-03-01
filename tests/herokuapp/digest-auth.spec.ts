import { BASE_HEROKUAPP } from "../../config-data.ts";
import { test, expect, chromium } from "@playwright/test";

test('auth-digest',async()=>{
    const browser = await chromium.launch();
    const context =await browser.newContext({
        httpCredentials:{
            username:"admin",
            password:"admin"
        }
    });
    const paper = await context.newPage()
    await paper.goto(BASE_HEROKUAPP);

    await paper.getByRole("link",{name:"Digest Authentication"}).click()
    await expect(paper.getByText("Congratulations! You must have the proper credentials.")).toHaveCount(1);
    await expect(paper.getByText("Digest Auth")).toHaveCount(1);
    
})
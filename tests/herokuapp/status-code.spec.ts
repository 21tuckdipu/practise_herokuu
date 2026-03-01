import { test, expect ,Page, Locator} from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

let  header_title :Locator;
async function status_page(status_code:string,page:Page){
    await expect(header_title).toHaveCount(1);
    await expect(page.locator("p").getByText(`This page returned a ${status_code} status code.`)).toHaveCount(1);
    await expect(page.locator("p").getByText("For a definition and common list of HTTP status codes, go ")).toHaveCount(1);
    await expect(page.getByRole("link",{name:"here"})).toHaveCount(1);
    await page.getByRole("link",{name:"here"}).click();

}

test("status-code",async({page})=>{

    await page.goto(BASE_HEROKUAPP + "/status_codes");
    header_title = page.locator("h3").getByText("Status Codes");
    const body_content =page.locator("p").getByText("HTTP status codes are a standard set of numbers used to communicate from a web server to your browser to indicate the outcome of the request being made (e.g. Success, Redirection, Client Error, Server Error). For a complete list of status codes, go");
    const status_200 = page.getByRole("link",{name:"200"});
    const status_301 = page.getByRole("link",{name:"301"});
    const status_404 = page.getByRole("link",{name:"404"});
    const status_500 = page.getByRole("link",{name:"500"});

    await expect(header_title).toHaveCount(1);
    await expect(body_content).toHaveCount(1);

    await expect(status_200).toHaveCount(1);
    await expect(status_301).toHaveCount(1);
    await expect(status_404).toHaveCount(1);
    await expect(status_500).toHaveCount(1);

    await test.step("check_200",async()=>{
        await status_200.click();
        await expect(page).toHaveURL(/200/);
        await status_page("200",page);
    });

    await test.step("check_301",async()=>{
        await status_301.click();
        await expect(page).toHaveURL(/301/);
        await status_page("301",page);
    });

    await test.step("check_404",async()=>{
        await status_404.click();
        await expect(page).toHaveURL(/404/);
        await status_page("404",page);
    });

    await test.step("check_500",async()=>{
        await status_500.click();
        await expect(page).toHaveURL(/500/);
        await status_page("500",page);
    });
    
    await expect(header_title).toHaveCount(1);
    await expect(body_content).toHaveCount(1);

    await expect(status_200).toHaveCount(1);
    await expect(status_301).toHaveCount(1);
    await expect(status_404).toHaveCount(1);
    await expect(status_500).toHaveCount(1);

});
import { test, expect } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("redriect-role",async({page})=>{

    await page.goto(BASE_HEROKUAPP + "/redirector");

    await expect(page.locator("h3").getByText("Redirection")).toHaveCount(1);
    await expect(page.locator("p").getByText("This is separate from directly returning a redirection status code, in that some browsers cannot handle a raw redirect status code without a destination page as part of the HTTP response.")).toHaveCount(1);

    await expect(page.getByRole("link",{name:"here"})).toHaveCount(1);
    await expect(page.getByRole("link",{name:"here"})).toBeEnabled();
    await page.getByRole("link",{name:"here"}).click();

    await expect(page).toHaveURL(/status_codes/);
    await expect(page.locator("p").getByText("Status Codes")).toHaveCount(1);
    await expect(page.locator("p").getByText("    HTTP status codes are a standard set of numbers used to communicate from a web server to your browser to indicate the outcome of the request being made (e.g. Success, Redirection, Client Error, Server Error). For a complete list of status codes, go ")).toHaveCount(1);
    await expect(page.locator("ul li")).toHaveCount(4);

});
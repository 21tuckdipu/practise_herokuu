///forgot_password
///login
import { test, expect, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";


test("forget-pass", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/forgot_password");

    await page.locator("#email").fill("jonny@gmail.com");
    const retrive_password_btn = page.getByRole("button", { name: "Retrieve password" });
    await expect(retrive_password_btn).toHaveCount(1);
    await retrive_password_btn.click();

    await expect(page.getByText("Internal Server Error")).toHaveCount(1);
    await expect(page.locator("#email")).toHaveCount(0);

    await test.step("with blank", async () => {
        await page.goBack();
        await expect(retrive_password_btn).toHaveCount(1);
        await retrive_password_btn.click();
        await expect(page.getByText("Internal Server Error")).toHaveCount(1);
        await expect(page.locator("#email")).toHaveCount(0);
    })

});

;

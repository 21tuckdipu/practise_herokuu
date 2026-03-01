///login
import { test, expect, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";


test("form-auth", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/login");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    await expect(page.getByRole("button", { name: "Login" })).toHaveCount(1);
    await page.getByRole("button", { name: "Login" }).click();

    const success_contatiner = page.locator("#flash")
    await expect(success_contatiner.getByText("You logged into a secure area!")).toHaveCount(1);

    const body_area = page.locator("#content");
    await expect(body_area.locator("h2").getByText(" Secure Area")).toHaveCount(1);
    await expect(body_area.getByText("Welcome to the Secure Area. When you are done click logout below.")).toHaveCount(1);

    await expect(page.getByRole("link", { name: "Logout" })).toHaveCount(1);
    await page.getByRole("link", { name: "Logout" }).click();

    await expect(page.getByText(" You logged out of the secure area!")).toHaveCount(1);

    await expect(page.getByText("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.")).toHaveCount(1)

})

test("login-with-invalid", async ({ page }) => {

    await test.step("login with invalid", async () => {

        await page.goto(BASE_HEROKUAPP + "/login");
        await page.locator("#username").fill("toms");
        await page.locator("#password").fill("SuperSecretPassword!");
        await expect(page.getByRole("button", { name: "Login" })).toHaveCount(1);
        await page.getByRole("button", { name: "Login" }).click();

        const login_Err = page.locator("#flash-messages")
        await expect(login_Err.getByText("Your username is invalid!")).toHaveCount(1)

    });

    await test.step("login with blank password", async () => {

        await page.goto(BASE_HEROKUAPP + "/login");
        await page.locator("#username").fill("tomsmith");
        await page.locator("#password").fill("");
        await expect(page.getByRole("button", { name: "Login" })).toHaveCount(1);
        await page.getByRole("button", { name: "Login" }).click();

        const login_Err = page.locator("#flash-messages")
        await expect(login_Err.getByText("Your password is invalid!")).toHaveCount(1)

    });

    await test.step("login with blank ", async () => {

        await page.goto(BASE_HEROKUAPP + "/login");
        await page.locator("#username").fill("");
        await page.locator("#password").fill("");
        await expect(page.getByRole("button", { name: "Login" })).toHaveCount(1);
        await page.getByRole("button", { name: "Login" }).click();

        const login_Err = page.locator("#flash-messages")
        await expect(login_Err.getByText("Your username is invalid!")).toHaveCount(1)

    });
})
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test, Locator, Page } from "@playwright/test";

let remove_button: Locator;
let add_button: Locator;

async function remove_checkbox(page: Page, text: boolean = false) {
    await expect(remove_button).toHaveCount(1);
    if (text) {
        await expect(page.getByText("It's back!")).toHaveCount(1);
    }
    await remove_button.click();
    await expect(page.getByText("It's gone!")).toHaveCount(1);
    await expect(add_button).toHaveCount(1);
}

async function add_checkbox(page: Page, text: boolean = false) {
    await expect(add_button).toHaveCount(1);
    if (text) {
        await expect(page.getByText("It's gone!")).toHaveCount(1);
    }
    await expect(add_button).toHaveCount(1);
    await add_button.click();
    await expect(page.getByText("It's back!")).toHaveCount(1);
}

test.describe("dynamic control", async () => {

    test("dynamic control checkbox", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/dynamic_controls");

        const header_tittle = page.getByText("Dynamic Controls");
        add_button = page.getByRole("button", { name: "Add" });
        remove_button = page.getByRole("button", { name: "Remove" });

        await expect(header_tittle).toHaveCount(1);

        await expect(page.getByRole("checkbox")).toHaveCount(1);
        await page.getByRole("checkbox").check();
        await expect(page.getByRole("checkbox")).toBeChecked();

        let track_remove_btn = 0;

        for (let i = 0; i < 6; i++) {
            track_remove_btn = i;
            const count_button: number = await remove_button.count() ?? 0;
            const msg_of_remove = await page.locator("div").getByText("A checkbox").count();

            if (count_button == 0) {
                await add_checkbox(page);
            } else {
                if (count_button == 1) {
                    if (track_remove_btn > 0 && track_remove_btn % 2 == 0) {
                        await remove_checkbox(page, true);
                        await expect(page.locator("div:not(input#checkbox)").getByText("A checkbox")).toHaveCount(Math.floor(track_remove_btn / 2));
                        // let text_checkbox = await page.locator("div:not(input#checkbox)").count()
                        // for (let i = 0; i < text_checkbox; i++) {
                        //     await page.locator("div:not(input#checkbox)").getByText("A Checkbox").nth(i).highlight()
                        // }
                    } else {
                        await remove_checkbox(page);
                    }
                }
            }
        }
    });

    test("enable-disable", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/dynamic_controls");
        const header_tittle = page.getByText("Dynamic Controls");

        const form_container = page.locator("#input-example");
        const input_field = form_container.locator("input");
        const button_enable = form_container.getByRole("button").filter({ hasText: /Enable|Disable/ });

        for (let i = 0; i < 6; i++) {
            const status: boolean = await input_field.isEnabled() ?? true;
            if (!status) {
                await expect(button_enable).toContainText('Enable')
                await button_enable.click();
                await expect(button_enable).toBeEnabled();
                await expect(input_field).toBeEnabled();
                await input_field.pressSequentially('Dipu');
                await expect(page.locator("#message").getByText("It's enabled!")).toHaveCount(1);
            } else {
                await expect(button_enable).toContainText('Disable')
                await button_enable.click()
                await expect(input_field).toBeEnabled();
                await expect(button_enable).toBeEnabled()
                await input_field.pressSequentially('Dipu');
                await expect(page.locator("#message").getByText("It's disabled!")).toHaveCount(1);
            }
        }
    });
});


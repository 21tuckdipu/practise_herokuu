{ }
import { test, expect, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

let ADD_BUTTON: Locator;
let DELETE_BUTTON: Locator;
let counter: number = 0;
//asyn function
async function AddElement() {
    await ADD_BUTTON.click();
    counter = counter + 1;
}
async function delElement(index:number=0) {
    await DELETE_BUTTON.nth(0).click();
    counter = counter - 1;
}

test.describe("AddRemoveElement", () => {
    test('Add', async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/add_remove_elements/");

        ADD_BUTTON = page.getByRole("button", { name: "Add Element" });
        DELETE_BUTTON = page.getByRole("button", { name: "Delete" });

        await test.step('Click Add', async () => {
            expect(ADD_BUTTON).toHaveCount(1);
            expect(ADD_BUTTON).toBeEnabled();
            for (let i = 0; i < 10; i++) {
                await AddElement();
                expect(DELETE_BUTTON).toHaveCount(counter);
            }
        });

        await test.step('Click on Delete', async () => {
            if (counter > 0) {
                while (counter != 0) {
                    expect(DELETE_BUTTON).toHaveCount(counter);
                    await delElement(counter);
                }
            } else {
                expect(DELETE_BUTTON).toHaveCount(0);
            }
        })

    });

})

import { test, expect, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test.describe("frame", async () => {

    test("frame-old", async ({ page }) => {

        await page.goto(BASE_HEROKUAPP + "/frames");

        const nested_frame = page.getByRole("link", { name: "Nested Frames" });
        await expect(nested_frame).toHaveCount(1);
        await nested_frame.click();

        await expect(page).toHaveURL(/nested_frames/);

        await page.waitForLoadState('load'); //use this for frame to get attached

        await test.step("left-frame", async () => {
            const left_frame = page.frame({ name: "frame-left" });
            if (!left_frame) {
                throw new Error("not found")
            }
            await expect(left_frame!.locator('body')).toHaveText("LEFT");
            await left_frame!.locator("body").highlight();
        });

        await test.step("Middle-frame", async () => {
            const left_frame = page.frame({ name: "frame-middle" });
            if (!left_frame) {
                throw new Error("not found")
            }
            await expect(left_frame!.locator('body')).toHaveText("MIDDLE");
            await left_frame!.locator("body").highlight();
        });

        await test.step("Right-frame", async () => {
            const left_frame = page.frame({ name: "frame-right" });
            if (!left_frame) {
                throw new Error("not found")
            }
            await expect(left_frame!.locator('body')).toHaveText("RIGHT");
            await left_frame!.locator("body").highlight();
        });
    });

    test("iframe", async ({ page }) => {
        await page.goto(BASE_HEROKUAPP + "/frames");

        const nested_frame = page.getByRole("link", { name: "iFrame" });
        await expect(nested_frame).toHaveCount(1);
        await nested_frame.click();

        await expect(page).toHaveURL(/iframe/);

        const parent_frame = page.frameLocator("#mce_0_ifr");
        if(!parent_frame){
            throw new Error("this not valid one")
        }
        await expect(parent_frame.locator("#tinymce")).toContainText("Your content goes here.")
        

    })
})

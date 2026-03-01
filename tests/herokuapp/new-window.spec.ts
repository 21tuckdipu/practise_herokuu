///windows
import { test, expect, Page, Locator } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("new_window", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/windows");
    await expect(page.locator("h3").getByText("Opening a new window")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Click Here" })).toHaveCount(1);
    await expect(page).toHaveTitle("The Internet")

    const [newPage] = await Promise.all(
        [page.waitForEvent("popup"),
        page.getByRole("link", { name: "Click Here" }).click()
        ]
    );
    await expect(newPage).toHaveTitle("New Window");
    await expect(newPage.locator("h3")).toContainText("New Window");

})
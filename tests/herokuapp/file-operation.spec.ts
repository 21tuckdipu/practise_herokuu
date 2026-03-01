
import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test } from "@playwright/test";
import path from "path";

const __dirname = path.dirname(__filename);

test.skip("File-Operations", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/upload");
    const uploadFilePath = path.resolve("upload-file/averageCount.txt");
    console.log(uploadFilePath + "Path")
    await page.locator("#file-upload").setInputFiles(uploadFilePath);
    await page.locator("#file-submit").click();
    await expect(page.locator("#uploaded-files").getByText("averageCount.txt")).toHaveCount(1);

});

test("File-download", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/download");
    const downloadPromise = page.waitForEvent("download");
    await expect(page.getByRole("link", { name: "tmpxkqbs663.txt" })).toHaveCount(1);

    await page.getByRole("link", { name: "tmpxkqbs663.txt" }).click();

    const download = await downloadPromise;
    const downloadPath = path.resolve("my-download/some-file.txt");
    await download.saveAs(downloadPath);
    expect(await download.failure()).toBeNull();

});



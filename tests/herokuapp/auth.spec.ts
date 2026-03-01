{ }
import { test, expect, chromium, BrowserContext } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";
import { stringify } from "node:querystring";

//,Dialog BOX
async function createNewContext(name: string, password: string): Promise<BrowserContext> {
    const broswer = await chromium.launch();
    const context = await broswer.newContext({
        httpCredentials: {
            username: name || '',
            password: password || ''
        }
    });
    return context
}
test.describe('Dialog', () => {
    test('sign', async ({ }) => {

        const paper = await (await createNewContext("admin", "admin")).newPage()
        await paper.goto(BASE_HEROKUAPP + "/basic_auth");
        expect(paper.getByText("Basic Auth")).toHaveCount(1);
        expect(paper.getByText("Congratulations! You must have the proper credentials.")).toHaveCount(1);

        await test.info().attach('screenshot', {
            body: await paper.screenshot(),
            contentType: 'image/png',
        });

    });

    test("Sign-with-invalid", async () => {
        const paper = await (await createNewContext("Apple", "admin")).newPage()
        await paper.goto(BASE_HEROKUAPP + "/basic_auth");

        expect(paper.getByText("Basic Auth")).toHaveCount(0);
        expect(paper.getByText("Congratulations! You must have the proper credentials.")).toHaveCount(0);
        expect(paper.getByText("Not authorized")).toHaveCount(1);

        await test.info().attach('screenshot', {
            body: await paper.screenshot(),
            contentType: 'image/png',
        });
    });


})
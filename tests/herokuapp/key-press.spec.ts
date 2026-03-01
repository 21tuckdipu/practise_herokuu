{ }
import { BASE_HEROKUAPP } from "../../config-data.ts";
import { expect, test } from "@playwright/test";

test("Keyboard", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/key_presses");
    const ELEMENT_TARGET = page.locator("#target");

    let result_format = (user: string) => `You entered: ${user}`;
    const OUTPUT_OF_TARGET = page.locator("p#result");

    //Shift
    const BASIC_BUTTON = [{ "Shift": "SHIFT" }, { "Backspace": "BACK_SPACE" }, { "Escape": "ESCAPE" },
    { "Delete": "DELETE" }, { "Insert": "INSERT" }, { "End": "END" }, { "Home": "HOME" }, { "Tab": "TAB" },
    { "PageUp": "PAGE_UP" }, { "PageDown": "PAGE_DOWN" }
    ]
    for (let keys of BASIC_BUTTON) {
        for (let [key, value] of Object.entries(keys)) {
            await ELEMENT_TARGET.press(key);
            await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
            await page.waitForTimeout(500)
        }
    }

    //using : new optimize OBJ
    const ARROW_KEYS = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT"
    }
    for (let [key, value] of Object.entries(ARROW_KEYS)) {
        await ELEMENT_TARGET.press(key);
        await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
        await page.waitForTimeout(500)
    }
    //Modifer
    const MODIFER_BUTTON = {
        Shift: "SHIFT",
        Control: "CONTROL",
        Alt: "ALT",
        Meta: "WIN"
    }
    for (let [key, value] of Object.entries(MODIFER_BUTTON)) {
        await ELEMENT_TARGET.press(key);
        await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
        await page.waitForTimeout(500)
    }

    //MAPs
    const FUNCTION_BUTTON = new Map(
        [
            ['F1', "F1"],
            ['F12', "F12"],
            ['F5', "F5"],
            ['F6', "F6"]
        ]
    )
    for (let [key, value] of FUNCTION_BUTTON) {
        await ELEMENT_TARGET.press(key);
        await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
        await page.waitForTimeout(500)
    }

    const ALPHABHAT_BUTTON = new Map(
        [
            ['D','D'],
            ['I','I'],
            ['P','P'],
             ['U','U']
        ]
    )
    for(let[key,value] of ALPHABHAT_BUTTON){
         await ELEMENT_TARGET.press(key);
        await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
        await page.waitForTimeout(500)
    }

    //COMMA PERIOD SLASH QUOTE OPEN_BRACKET CLOSE_BRACKET BACK_SLASH
    const SIGN_BUTTON = new Map(
        [
            [',','COMMA'],
            ['.','PERIOD'],

            ['/','SLASH'],
            ["'",'QUOTE'],
            ['[','OPEN_BRACKET'],
            [']','CLOSE_BRACKET'],
            ["\\",'BACK_SLASH']

        ]
    )
     for(let[key,value] of SIGN_BUTTON){
         await ELEMENT_TARGET.press(key);
        await expect(OUTPUT_OF_TARGET).toHaveText(result_format(value));
        await page.waitForTimeout(500)
    }
});

//learn different way to use obkect in forloop ,with obkect nad map
import { test, expect } from "@playwright/test";
import { BASE_HEROKUAPP } from "../../config-data";

test("Horizontal_Slider", async ({ page }) => {

    await page.goto(BASE_HEROKUAPP + "/horizontal_slider");

    await expect(page.getByText('Horizontal Slider')).toHaveCount(1);
    await expect(page.getByText('Set the focus on the slider (by clicking on it) and use the arrow keys to move it right and left. Or click and drag the slider with your mouse. It will indicate the value of the slider to the right.')).toHaveCount(1);

    const slider = page.locator("input[type='range']");
    await expect(slider).toHaveCount(1);

    const min_value:any = await slider.getAttribute('min')||0;
    const max_value :any= await slider.getAttribute('max') || 0;
    const default_value:any = await slider.getAttribute('value')||0;
    const step_value:any = await slider.getAttribute('step')||0;
    const max_step:number = Math.floor(Number(step_value) * Number(max_value))*Number(max_value);

    await slider.focus()
    
    for (let i = default_value??0; i < max_step; i++) {
        await slider.press('ArrowRight');
        await page.waitForTimeout(200);
    }
     for (let i = max_step??0; i >0; i--) {
        await slider.press('ArrowLeft');
        await page.waitForTimeout(200);
    }
});
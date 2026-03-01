import { BASE_HEROKUAPP } from "../../config-data";
import { expect, test } from "@playwright/test";

test("floating-menu", async ({ page }) => {
    await page.goto(BASE_HEROKUAPP + "/floating_menu");

    const menu_container = page.locator("#menu");

    const page_footer = page.locator("#page-footer");
    await page_footer.getByRole("link", { name: "Elemental Selenium" }).scrollIntoViewIfNeeded();

    const home_menu = menu_container.getByRole("link", { name: "Home" });
    const news_menu = menu_container.getByRole("link", { name: "News" });
    const contact_menu = menu_container.getByRole("link", { name: "Contact" });
    const about_menu = menu_container.getByRole("link", { name: "About" });

    await expect(home_menu).toHaveCount(1);
    await home_menu.click();
    await expect(page).toHaveURL(/floating_menu#home/);

    await expect(news_menu).toHaveCount(1);
    await news_menu.click();
    await expect(page).toHaveURL(/floating_menu#news/);

    await expect(about_menu).toHaveCount(1);
    await about_menu.click();
    await expect(page).toHaveURL(/floating_menu#about/);

    await expect(contact_menu).toHaveCount(1);
    await contact_menu.click();
    await expect(page).toHaveURL(/floating_menu#contact/);

});
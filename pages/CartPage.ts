import { Page, Locator } from '@playwright/test';
import {waitUntilClickable, waitUntilCondition} from "../utils/helperMethods";
import {SearchPage} from "./SearchPage";

export class CartPage {
    readonly page: Page;
    readonly addButton: Locator;
    private searchPage: SearchPage;
    readonly exploreButton: Locator;
    readonly cartCloseButton: Locator;
    deleteButtonCart: Locator;
    cartSummaryLabel: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchPage = new SearchPage(page);
        this.addButton = page.locator('//button[normalize-space()="Add & review"]');
        this.exploreButton  = page.locator(`#qa_listing-button-0`);
        this.cartCloseButton = page.locator(`.lm-modal__close`);
        this.deleteButtonCart = page.locator(`[data-testid="qa-remove-from-cart"]`);
        this.cartSummaryLabel = page.locator(`//h2[normalize-space()='Summary']`);
    }

    async selectSuitButton(num: number) {
        return this.page.locator(`//button[@id="qa_unit-${num}-book-now"]`);
    }

    async getRoomLabel(num: number) {
        return this.page.locator(`//span[normalize-space()="room ${num}"]`);
    }
    async addItemsToCart(items: number) {
        for (let i = 0; i < items; i++) {
         if(await this.cartCloseButton.isVisible({timeout: 10000}))
              await this.cartCloseButton.click();
         let suitButton = await this.selectSuitButton(i);
         await waitUntilCondition(async () => {
             return (await suitButton.innerText()) === 'Select';
          }, 15000);
         await suitButton.click();
         await waitUntilClickable(this.addButton);
         await this.addButton.click();
        }
    }

    async deleteItemsFromCart(item: number)
    {
       await this.deleteButtonCart.nth(item-1).click()
    }
}
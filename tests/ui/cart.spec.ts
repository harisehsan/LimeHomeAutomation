import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { BasePage } from '../../pages/BasePage';
import {CartPage} from "../../pages/CartPage";
import {openNewTabWithPage, waitUntilClickable} from "../../utils/helperMethods";

test.describe('Cart Functionality', () => {
    let cartPage: CartPage;
    let basePage: BasePage;
    let searchPage: SearchPage;
    let num=0

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        cartPage = new CartPage(page);
        searchPage = new SearchPage(page);
        await basePage.visitURL();
    });

    test('Add a single item to the cart', async ({ page }) => {
      num = 1
      await searchPage.selectDatesAheadFromCurrent(10, 15);
      await cartPage.addItemsToCart(num);
      const getRoom =  await cartPage.getRoomLabel(num);
      await expect(getRoom).toBeVisible(); //verify the item is added to cart
    });

    test('Add 2 items to cart and delete the last item', async ({ page }) => {
        num = 2
        await searchPage.selectCity("vienna");
        await searchPage.selectDatesAheadFromCurrent(20,25);
        await searchPage.selectGuestsAndRooms(num,num);
        await waitUntilClickable(cartPage.exploreButton);
        cartPage = await openNewTabWithPage(page, cartPage.exploreButton, CartPage);
        await cartPage.addItemsToCart(num);
        await waitUntilClickable(cartPage.cartSummaryLabel);
         for (let i=1; i<=num; i++)
         {
            let getRoom =  await cartPage.getRoomLabel(i);
            await expect(getRoom).toBeVisible();   //verify the 2 item(s) are added to cart
         }
       await cartPage.deleteItemsFromCart(num);
       const getRoom =  await cartPage.getRoomLabel(num);
       await expect(getRoom).not.toBeVisible();  //verify the deleted item is no longer displayed in cart
    });

});

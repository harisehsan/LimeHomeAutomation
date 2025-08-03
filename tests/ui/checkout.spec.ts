import {expect, test} from "@playwright/test";
import { SearchPage } from '../../pages/SearchPage';
import { BasePage } from '../../pages/BasePage';
import {CITY, DEFAULT_TIME_OUT, GUEST_AND_ROOM} from "../constants/searchConstants";
import {CartPage} from "../../pages/CartPage";
import {openNewTabWithPage, waitUntilClickable} from "../../utils/helperMethods";
import {CheckoutPage} from "../../pages/CheckoutPage";
import {MANDATORY_FIELD_ELEMENTS} from "../../constants/checkoutConstant";

test.describe('Checkout Functionality', () => {
    let cartPage: CartPage;
    let basePage: BasePage;
    let searchPage: SearchPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        cartPage = new CartPage(page);
        searchPage = new SearchPage(page);
        checkoutPage = new CheckoutPage(page);
        await basePage.visitURL();
    });

    test('Verify the checkout process', async ({ page }) => {
        await searchPage.selectDatesAheadFromCurrent(10, 15);
        await cartPage.addItemsToCart(1);
        await checkoutPage.proceedToCheckout();
        await verifyThatAllMandatoryFieldsAreFilled(); //Verify that all the mandatory fields are filled on checkout page.
        await checkoutPage.completeCheckoutProcess();
        await expect(checkoutPage.paymentSectionLabel).toBeVisible({ timeout: 10000 }); // Verify that I should see the payment section
    });

    async function verifyThatAllMandatoryFieldsAreFilled(): Promise<boolean> {
        for (let i = 0; i < MANDATORY_FIELD_ELEMENTS.length; i++) {
            const textElement = checkoutPage.getPersonalDetailsTextBox(MANDATORY_FIELD_ELEMENTS[i]);
            const value = await textElement.inputValue();
            expect(value).not.toBe('');
        }
        return true;
    }
});



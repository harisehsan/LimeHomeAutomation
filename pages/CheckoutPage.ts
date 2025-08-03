import { Page, Locator } from '@playwright/test';
import {waitUntilClickable, waitUntilNotDisplayed} from "../utils/helperMethods";

export class CheckoutPage {
    readonly page: Page;
    readonly reserveButton: Locator;
    readonly loginButton: Locator;
    readonly signupButton: Locator;
    readonly continueToPaymentButton: Locator;
    readonly confirmContinueButton: Locator;
    readonly paymentSectionLabel:Locator;

    constructor(page: Page) {
        this.page = page;
        this.reserveButton = page.locator('//button[normalize-space()="Reserve"]');
        this.loginButton = page.locator(`#qa_checkout-auth-banner-button`);
        this.signupButton = page.locator(`#qa_auth-signup-btn`);
        this.continueToPaymentButton = page.locator(`#checkout-go-to-rates`);
        this.confirmContinueButton = page.locator(`//button[normalize-space()='Continue']`);
        this.paymentSectionLabel = page.locator(`//span[text()='Payment']`);
    }

     getLoginTextBox(num: number) {
        return this.page.locator(`#ngp-input-${num}`);
    }

    getPersonalDetailsTextBox(fieldName: string)
    {
        return this.page.locator(`#checkout-guest-info-${fieldName}`);
    }

    async proceedToCheckout()
    {
       await waitUntilClickable(this.reserveButton.nth(1))
       await this.reserveButton.nth(1).click();
       await waitUntilClickable(this.loginButton)
       await this.loginButton.click();
       await waitUntilClickable(await this.getLoginTextBox(1));
       await this.getLoginTextBox(1).fill(process.env.EMAIL);
       await this.getLoginTextBox(2).fill(process.env.PASSWORD);
       await this.signupButton.click();
       await waitUntilNotDisplayed(this.signupButton);
    }

    async completeCheckoutProcess()
    {
        await waitUntilClickable(this.continueToPaymentButton);
        await this.continueToPaymentButton.click();
        await waitUntilClickable(this.confirmContinueButton);
        await this.confirmContinueButton.click();
    }
}
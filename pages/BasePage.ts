import {Locator} from "@playwright/test";

export class BasePage {
    readonly denyPrivacyBtn: Locator;

    constructor(protected page) {
        this.page = page;
        this.denyPrivacyBtn = page.locator('[data-testid="uc-deny-all-button"]');
    }

    async visitURL(path: string = '') {
        await this.page.goto(path);
        try {
            await this.denyPrivacyBtn.waitFor({ state: 'visible', timeout: 5000 });
            await this.denyPrivacyBtn.click({ force: true });
        } catch {
            console.log('Privacy Deny button not found within 5s.');
        }
    }




}
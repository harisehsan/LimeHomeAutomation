import {Locator, expect, Page} from '@playwright/test';

export async function waitUntilClickable(locator: Locator, timeout: number = 15000) {
    await expect(locator).toBeVisible({ timeout });
    await expect(locator).toBeEnabled({ timeout });
    await locator.hover({ timeout });
}

export async function getDateAfterDays(days: number = 0) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return `${mm}-${dd}-${yyyy}`;
}

export async function openNewTabWithPage<T>(
    page: Page,
    clickableLocator: Locator,
    PageObjectClass: new (page: Page) => T
): Promise<T> {
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),   // Wait for new tab
        clickableLocator.click(),     // Click triggers popup
    ]);

    await newPage.waitForLoadState('domcontentloaded'); // Wait until new tab DOM is ready

    return new PageObjectClass(newPage); // Return page object bound to new tab
}

export async function waitUntilCondition(
    conditionFn: () => Promise<boolean>,
    timeout: number = 5000,
    interval: number = 200
): Promise<void> {
    const start = Date.now();

    while (true) {
        try {
            if (await conditionFn()) return;
        } catch {
        }

        if (Date.now() - start > timeout) {
            throw new Error('Timeout waiting for condition to be true');
        }

        await new Promise(res => setTimeout(res, interval));
    }
}

export async function waitUntilNotDisplayed(
    locator: Locator,
    timeout: number = 5000
): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
}



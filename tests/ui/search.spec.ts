import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { BasePage } from '../../pages/BasePage';

test.describe('Search Functionality', () => {
    let searchPage: SearchPage;
    let basePage: BasePage;

    test.beforeEach(async ({ page }) => {
        basePage = new BasePage(page);
        searchPage = new SearchPage(page);
        await basePage.visitURL();
    });

    test('Search suit by using City and Dates', async ({ page }) => {
        const city = "berlin"
        await searchPage.selectCity(city);
        await searchPage.selectDatesAheadFromCurrent(2,6);
        await expect(searchPage.whereToSearchTextBox).toHaveText(city);
        await expect(searchPage.datepickerDropDown).toHaveText(/\S+/);
        await verifySearchResult();
    });

    test('Search suit by using search filter using City, Dates with custom Rooms and Guests', async ({ page }) => {
        const city= "vienna"
        const guests = 2
        const rooms =2
        await searchPage.selectCity(city);
        await searchPage.selectDatesAheadFromCurrent(15,20);
        await searchPage.selectGuestsAndRooms(guests,rooms);
        await expect(searchPage.whereToSearchTextBox).toHaveText(city);
        await expect(searchPage.datepickerDropDown).toHaveText(/\S+/);
        await expect(searchPage.guestDropDown).toContainText(` ${guests} Guests, ${rooms} rooms`);
        await verifySearchResult();
    });

    async function verifySearchResult() {
        const totalItems = await searchPage.getTotalNumberOfItems();
        expect(totalItems).toBeGreaterThan(0); // Total number of searched items (displayed) should be greater than 0
        await expect(searchPage.itemCard.first()).toBeVisible({timeout: 10000}); //Atleast One item card should be displayed in the search result
    }
});

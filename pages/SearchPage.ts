import { Page, Locator } from '@playwright/test';
import {waitUntilClickable, getDateAfterDays} from "../utils/helperMethods";
import {CITY} from "../constants/searchConstants";

export class SearchPage {
    readonly page: Page;
    readonly denyPrivacyBtn: Locator;
    readonly whereToSearchTextBox: Locator;
    cityOptionList: Locator;
    readonly searchDropDown: Locator;
    readonly datepickerDropDown: Locator;
    dateElement: Locator;
    readonly guestDropDown: Locator;
    readonly guestIncrementButton;
    readonly roomIncrementButton;
    readonly searchButton;
    readonly totalNumberOfItemsLabel;
    readonly itemCard;

     constructor(page: Page) {
        this.page = page;
        this.denyPrivacyBtn = page.locator('[data-testid="uc-deny-all-button"]');
        this.whereToSearchTextBox = page.locator('[id="qa_city-picker-name"]');
        this.searchDropDown = page.locator('#search')
        this.datepickerDropDown = page.locator('[id="qa_open-datepicker-overlay"]');
        this.guestDropDown = page.locator('[id="qa_open-guests-overlay"]');
        this.guestIncrementButton = page.locator('//div[@data-testid="qa-guest-picker"]//span[@id="qa_increment-guests-mobile"]');
        this.roomIncrementButton = page.locator('//div[@class="widget__guest-picker-item capitalize"]//span[@id="qa_increment-guests-mobile"]')
        this.searchButton = page.locator('#qa_search-button');
        this.totalNumberOfItemsLabel = page.locator('.text-secondary.text-md.leading-md.m-0');
        this.itemCard = page.locator('#qa_listing-card-0');
    }

    getCity(city: string){
       return this.page.locator(`[id="qa_city-${city}"]`);
    }

    async selectCity(city: string) {
        await this.whereToSearchTextBox.click();
        await this.searchDropDown.fill(city);
        this.cityOptionList = this.getCity(city);
        await waitUntilClickable(this.cityOptionList);
        await this.cityOptionList.click();
    }

    async selectDatesAheadFromCurrent(startDate : number, endDate: number) {
        await this.datepickerDropDown.click();
        for (let i of [startDate, endDate]) {  // select today + (Start date) and today + (End date)
            const currentDateAfterDays = await getDateAfterDays(i);
            this.dateElement = this.page.locator(`#qa_calendar-day-${currentDateAfterDays}`);
            await waitUntilClickable(this.dateElement);
            await this.dateElement.click();
        }
    }

    async selectGuestsAndRooms(guests: number, rooms: number) {
        await this.guestDropDown.click();
        await waitUntilClickable(this.guestIncrementButton);
        for (let i=1; i<guests; i++)
            await this.guestIncrementButton.click();
        for (let j=1; j<rooms; j++)
            await this.roomIncrementButton.click();
        await this.searchButton.click();
    }

    async getTotalNumberOfItems(){
        const text = await this.totalNumberOfItemsLabel.textContent();
        const numberMatch = text?.match(/\d+/);
        return numberMatch ? parseInt(numberMatch[0], 10) : 0;
    }
}

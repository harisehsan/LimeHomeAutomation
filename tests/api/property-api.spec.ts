import {test, expect, APIResponse} from '@playwright/test';
import { PropertyService } from '../../apiService/propertyService';
import {
    DESCRIPTION,
    DISTANCE,
    expectedLocation, HOUSE_RULE,
    ID,
    NAME,
    PARKING,
    THINGS_TO_KNOW,
    TIMEZONE
} from "../../constants/apiPropertyConstant";

test.describe('Property API Functionality', () => {
    let propertyService: PropertyService;

    test.beforeAll(async ({ request }) => {
        propertyService = new PropertyService(request);
        await propertyService.callAPI(ID);
    });

    test('Verify that Status Code is 200', async () => {
        const statusCode = await propertyService.getStatusCode();
        expect(statusCode).toBe(200);
    });

    test('Verify the ID', async () => {
        const id = await propertyService.getID();
        expect(id).toBe(ID);
    });

    test('Verify the Name', async () => {
        const name = await propertyService.getName();
        expect(name).toBe(NAME);
    });

    test('Verify the Description', async () => {
        const description = await propertyService.getDescription();
        expect(description).toBe(DESCRIPTION);
    });

    test('Verify the location attributes', async () => {
        const locationAttributes = await propertyService.getLocationAttributes();
        expect(locationAttributes[0]).toBe(expectedLocation.lat);
        expect(locationAttributes[1]).toBe(expectedLocation.lng);
        expect(locationAttributes[2]).toBe(expectedLocation.city);
        expect(locationAttributes[3]).toBe(expectedLocation.postalCode);
        expect(locationAttributes[4]).toBe(expectedLocation.countryCode);
        expect(locationAttributes[5]).toBe(expectedLocation.addressLine1);
        expect(locationAttributes[6]).toBe(expectedLocation.countryName);
    });

    test('Verify the time zone', async () => {
        const timeZone = await propertyService.getTimeZone();
        expect(timeZone).toBe(TIMEZONE);
    });

    test('Verify the Distance', async () => {
        const distance = await propertyService.getDistance();
        expect(distance).toBe(DISTANCE);
    });

    test('Verify the Parking', async () => {
        const parking = await propertyService.getParking();
        expect(parking).toBe(PARKING);
    });

    test('Verify the Things To know', async () => {
        const thingsToKnow = await propertyService.getThingsToKnow();
        expect(thingsToKnow).toBe(THINGS_TO_KNOW);
    });

    test('Verify the House Rules', async () => {
        const houseRules = await propertyService.getHouseRules();
        expect(houseRules).toBe(HOUSE_RULE);
    });
});
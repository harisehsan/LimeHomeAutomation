import { APIRequestContext } from '@playwright/test';
import { Endpoints } from '../utils/apiEndpoints';
import { GET } from '../utils/apiHttpMethods';

export class PropertyService {
    private readonly request: APIRequestContext;
    response;
    payload;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async callAPI(id: number) {
        this.response = await GET(this.request, Endpoints.propertyById(id));
        const json = await this.response.json();
        this.payload = json.payload;
    }

    async getStatusCode(): Promise<number> {
        return this.response.status();
    }

    async getID():  Promise<number> {
        return this.payload.id;
    }

    async getName(): Promise<String> {
        return this.payload.name;
    }

    async getDescription(): Promise<String> {
        return this.payload.description;
    }

    async getTimeZone(): Promise<String> {
        return this.payload.timezone;
    }

    async getDistance(): Promise<String> {
        return this.payload.distance;
    }

    async getParking(): Promise<String> {
        return this.payload.parking;
    }

    async getThingsToKnow(): Promise<String> {
        return this.payload.things_to_know;
    }

    async getHouseRules(): Promise<String> {
        return this.payload.house_rules;
    }

    async getLocationAttributes(): Promise<(string | number)[]> {
        const location = this.payload.location;
        return [
            location.lat,
            location.lng,
            location.city,
            location.postalCode,
            location.countryCode,
            location.addressLine1,
            location.countryName
        ];
    }






    // async getPropertyDetailsJson(id: number) {
    //     const response = await this.getResponse(id);
    //
    //     if (response.status() !== 200) {
    //         throw new Error(`Property ${id} request failed with status ${response.status()}`);
    //     }
    //
    //     return response.json();
    // }
}

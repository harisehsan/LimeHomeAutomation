export const ID=129
export const NAME= "aachen vereinsstraße"
export const DESCRIPTION= "In the middle of Aachen's city center you will find our Limehome Aachen Vereinsstraße in a quiet side street. Due to the convenient location, you will find the perfect place to escape the hustle and bustle of the city center and start the day relaxed. The connection with public transport could not be better, as the main train station is only 270 m away."
export const TIMEZONE = "Europe/Berlin"
export const DISTANCE = 0.4408815508237934
export const PARKING = "Unfortunately, there are no private parking spaces available in our Limehome. However, with a little luck you will find a paid parking space in the surrounding streets. If you are looking for a covered parking space, you can also park your car in the nearest APAG parking garage Hauptbahnhof, which is only 400 meters away on foot."
export const THINGS_TO_KNOW = "Please note: in order to receive your personal access code, you have to complete our online check-in. You will receive the link and detailed instructions by email after your booking."
export const HOUSE_RULE = "Short and simple: no smoking, no parties or events and no pets. Quiet hours 10 p.m. - 7 a.m."


export interface Location {
    lat: number;
    lng: number;
    city: string;
    postalCode: string;
    countryCode: string;
    addressLine1: string;
    countryName: string;
}

export const expectedLocation: Location = {
    lat: 50.7697713,
    lng: 6.0931558,
    city: 'Aachen',
    postalCode: '52062',
    countryCode: 'DE',
    addressLine1: 'Vereinsstraße 2',
    countryName: 'Germany'
};
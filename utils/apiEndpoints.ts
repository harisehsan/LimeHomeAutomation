export const BASE_URL = 'https://api.limehome.com/properties/v1/public';

export const Endpoints = {
    propertyById: (id: number) => `${BASE_URL}/properties/${id}`,
};

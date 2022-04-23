import { GeoJsonProperties } from "geojson";

export type GeoJsonPropertiesExt = GeoJsonProperties & {
        name:string;
        address_line1: string,
        address_line2: string, 
        categories: string[],
        city: string,
        country: string,
        country_code: string,
        county: string,
        details: string[],
        distance: number,
        formatted: string,
        lat: number,
        lon: number,
        place_id: string;
        postcode: string;
        quarter: string;
        state: string;
        street: string;
        suburb: string;
    }

// interface GeoJsonPropertiesExt extends GeoJsonProperties{

// }
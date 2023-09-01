import {ISelectedBreed} from "./IBreeds";

interface IRandomPhoto {
    breeds: [
        {
            weight: {
                metric: string,
            },
            id: string,
            name: string,
            temperament: string,
            origin: string,
            country_code: string,
            description: string,
            life_span: string,
            reference_image_id: string,
        }
    ],
    // breeds: ISelectedBreed[],
    url: string,
    id: string
}

export type {
    IRandomPhoto,
}
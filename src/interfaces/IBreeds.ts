interface IBreed {
    id: string;
    name: string;
}

interface ISelectedBreed {
    breeds: {
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
    }[];
}


export type {
    IBreed,
    ISelectedBreed,
}
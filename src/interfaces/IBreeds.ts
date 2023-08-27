interface IBreeds {
    id: string;
    name: string;
}

interface IBreedsId {
    breeds: {
        name: string
        temperament: string;
        origin: string;
        weight: {
            imperial: string;
            metric: string;
        };
        life_span: string;
        description: string;
    }[];
}


export type {
    IBreeds,
    IBreedsId
}
import {IBreeds} from "./IBreeds";

interface IImages {
    id: string
    url: string,
    breeds: IBreeds[],
}

export type {
    IImages,
}
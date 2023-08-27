import {axiosService, IRes} from "./axios.service";

import {IBreeds} from "../interfaces/IBreeds";
import {endPoints} from "../constants/urls";

const breedsService = {
    getAll: ():IRes<IBreeds[]> => axiosService.get(endPoints.breeds.base),
    getById: (id:string):IRes<IBreeds> => axiosService.get(endPoints.breeds.byId(id)),
};

export {
    breedsService,
}
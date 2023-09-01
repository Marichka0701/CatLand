import {axiosService, IRes} from "./axios.service";

import {IBreed} from "../interfaces/IBreeds";
import {endPoints} from "../constants/urls";

const breedsService = {
    getAll: ():IRes<IBreed[]> => axiosService.get(endPoints.breeds.base),
    // getById: (id:string):IRes<IBreed> => axiosService.get(endPoints.breeds.byId(id)),
};

export {
    breedsService,
}
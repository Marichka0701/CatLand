import {axiosService, IRes} from "./axios.service";
import {endPoints} from "../constants/urls";
import {IImages} from "../interfaces/IImages";

const imagesService = {
    getByIds: (ids: string, limit: number):IRes<IImages[]> => axiosService.get(`${endPoints.images.base}`, {
        params: {
            breed_ids: ids,
            limit,
        },
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        }
    }),
    getRandom: ():IRes<IImages[]> => axiosService.get(endPoints.images.base, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        }
    }),
}

export {
    imagesService,
}
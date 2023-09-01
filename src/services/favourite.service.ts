import {axiosService} from "./axios.service";

import {endPoints} from "../constants/urls";
import {IFavourite} from "../interfaces/IFavourite";

const favouriteService = {
    getAll: () => axiosService.get(endPoints.favourites.base, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        },
        params: {
            order: 'DESC'
        }
    }),
    addToFavourite: (params: IFavourite) => axiosService.post(endPoints.favourites.base, params, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        },
    }),
    deleteFavouriteById: (id: number) => axiosService.delete(`${endPoints.favourites.base}/${id}`, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        },
    }),
}

export {
    favouriteService,
}
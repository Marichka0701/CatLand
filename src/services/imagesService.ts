import {axiosService, IRes} from "./axios.service";
import {endPoints} from "../constants/urls";
import {IRandomPhoto} from "../interfaces/IRandomPhoto";

const imagesService = {
    // getByIds: (ids: string, limit: number): IRes<IImages[]> => axiosService.get(`${endPoints.images.base}`, {
    //     params: {
    //         breed_ids: ids,
    //         limit,
    //     },
    //     headers: {
    //         'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //     }
    // }),
    getRandomPhotoForVoting: (): IRes<IRandomPhoto[]> => axiosService.get(endPoints.images.base, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        }
    }),

    //
    //
    // getRandomPhotos: (limit: number): IRes<IRandomPhoto[]> => axiosService.get(endPoints.images.base, {
    //     headers: {
    //         'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //     },
    //     params: {
    //         has_breeds: 1,
    //         limit,
    //     }
    // }),
    // getRandomPhotosByBreed: (ids: string, limit: number): IRes<IRandomPhoto[]> => axiosService.get(endPoints.images.base, {
    //     headers: {
    //         'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //     },
    //     params: {
    //         breed_ids: ids,
    //         limit,
    //     }
    // }),



    getPhotos: (ids: string, limit: number): IRes<IRandomPhoto[]> => axiosService.get(endPoints.images.base, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        },
        params: {
            has_breeds: 1,
            breed_ids: ids,
            limit,
        }
    }),

    uploadPhoto: (file: File, sub_id: string) => axiosService.post(endPoints.images.upload, {file, sub_id}, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9',
            "Content-type": "multipart/form-data"
        },
    }),
    // getUploadedPhotos: () => axiosService.get(endPoints.images.getUploaded, {
    //     headers: {
    //         'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //     },
    // })
}

export {
    imagesService,
}
import {axiosService} from "./axios.service";
import {endPoints} from "../constants/urls";
import {IVote} from "../interfaces/IVote";

const votingService = {
    vote: (params: IVote) => axiosService.post(endPoints.votes.base, params, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        }
    }),
    getMoreInfo: () => axiosService.get(endPoints.votes.base, {
        headers: {
            'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
        },
        params: {
            order: 'DESC',
        }
    }),
    // getAllVotes: () => axiosService.get(endPoints.votes.base, {
    //     headers: {
    //         'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //     },
    //     params: {
    //         order: 'DESC',
    //     }
    // })
}

export {
    votingService,
}
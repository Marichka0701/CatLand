import {IResVote} from "./IResVote";

interface IResMoreInfoVote extends IResVote{
    created_at: string,
    image: {
        id: string,
        url: string,
    }
}

export type {
    IResMoreInfoVote
}
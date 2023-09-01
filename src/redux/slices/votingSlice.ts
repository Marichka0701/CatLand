import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {votingService} from "../../services/voting.service";
import {IVote} from "../../interfaces/IVote";
import {IRes} from "../../services/axios.service";
import {IResVote} from "../../interfaces/IResVote";
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";
import {favouriteActions} from "./favouritesSlice";
import {IFavourite} from "../../interfaces/IFavourite";
import {favouriteService} from "../../services/favourite.service";

interface IState {
    sub_id: string,
    like: number,
    dislike: number,
    history: any,
    historyExtended: any,
    likedPhotos: IResMoreInfoVote[],
    dislikedPhotos: IResMoreInfoVote[],
    loading: string,
    // votesHistory: IResMoreInfoVote[],
}

const initialState:IState = {
    sub_id: 'marichka_tanechnyk',
    like: 1,
    dislike: -1,
    history: [],
    historyExtended: null,
    likedPhotos: [],
    dislikedPhotos: [],
    loading: '',
}

const vote = createAsyncThunk<IResVote, {params:IVote}>(
    'votingSlice/vote',
    async ({params}, {rejectWithValue}) => {
        try {
            const {data} = await votingService.vote(params);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data)
        }
    }
)

const addToFavourite = createAsyncThunk<{id: string}, {params: IFavourite}>(
    'votingSlice/addToFavourite',
    async ({params}, {rejectWithValue }) => {
        try {
            const {data} = await favouriteService.addToFavourite(params);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)


const getMoreInfo = createAsyncThunk<IResMoreInfoVote, void>(
    'votingSlice/getMoreInfo',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await votingService.getMoreInfo();
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)


const votingSlice = createSlice({
    name: 'votingSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => builder
        .addCase(vote.fulfilled, (state, action) => {
            state.history = [action.payload, ...state.history];
        })
        .addCase(addToFavourite.fulfilled, (state, action) => {
            state.history = [action.payload, ...state.history];
        })
        .addCase(getMoreInfo.fulfilled, (state, action) => {
            state.historyExtended = action.payload;
            state.likedPhotos = state.historyExtended.filter((item:IResMoreInfoVote) => item.value === 1);
            state.dislikedPhotos = state.historyExtended.filter((item:IResMoreInfoVote) => item.value === -1);
            state.loading = 'success';
        })
        .addCase(getMoreInfo.pending, (state, action) => {
            state.loading = 'loading';
        })
});

const {reducer: votingReducer, actions} = votingSlice;

const votingActions = {
    ...actions,
    vote,
    getMoreInfo,
    addToFavourite,
}

export {
    votingReducer,
    votingActions,
}
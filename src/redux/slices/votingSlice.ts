import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {AxiosError} from "axios";
import {votingService} from "../../services/voting.service";
import {IVote} from "../../interfaces/IVote";
import {IRes} from "../../services/axios.service";
import {IResVote} from "../../interfaces/IResVote";
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";

interface IState {
    sub_id: string,
    like: number,
    dislike: number,
    history: IResVote[],
    historyExtended: any;
}

const initialState:IState = {
    sub_id: 'marichka_tanechnyk',
    like: 1,
    dislike: -1,
    history: [],
    historyExtended: null
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

const getMoreInfo = createAsyncThunk<IResMoreInfoVote, {id: number}>(
    'votingSlice/getMoreInfo',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await votingService.getMoreInfo(id);
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
        .addCase(getMoreInfo.fulfilled, (state, action) => {
            state.historyExtended = action.payload;
        })
});

const {reducer: votingReducer, actions} = votingSlice;

const votingActions = {
    ...actions,
    vote,
    getMoreInfo,
}

export {
    votingReducer,
    votingActions,
}
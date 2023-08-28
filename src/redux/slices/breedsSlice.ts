import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBreeds, IBreedsId} from "../../interfaces/IBreeds";
import {breedsService} from "../../services/breeds.service";

interface IState {
    breeds: IBreeds[],
    breeds_ids_default: string,
    selected_breeds: IBreedsId,
    limited_ids: number,
}

const initialState: IState = {
    breeds: [],
    breeds_ids_default: 'abys,aege,abob,acur,asho',
    selected_breeds: null,
    limited_ids: null,
}

const getAll = createAsyncThunk<IBreeds[], void>(
    'breedsSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await breedsService.getAll();
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const getByBreedsName = createAsyncThunk(
    'breedsSlice/getByBreedsId',
    async (_, {rejectWithValue}) => {
        try {

        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

// const getById = createAsyncThunk<IBreeds, {id: string}>(
//     'breedsSlice/getById',
//     async ({id}, {rejectWithValue}) => {
//         try {
//             const {data} = await breedsService.getById(id);
//             return data;
//         } catch (e) {
//             const error = e as AxiosError;
//             return rejectWithValue(error.response.data);
//         }
//     }
// )

const breedsSlice = createSlice({
    name: 'breedsSlice',
    initialState,
    reducers: {
        setSelectedBreeds: (state, action) => {
            state.selected_breeds = action.payload;
        },

        setCountIds: (state, action) => {
            state.limited_ids = action.payload;
            const limitedBreeds = state.breeds.slice(0, state.limited_ids);
            const breedsIds = limitedBreeds.map(breed => breed.id);
            state.breeds_ids_default = breedsIds.join(',');
            // state.breeds_ids_default = state.breeds.slice(0, state.count_ids).join(',');
        }

    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.breeds = action.payload;
            // state.breeds_ids_default = 'abys,aege,abob,acur,asho';
        })
        // .addCase(getById.fulfilled, (state, action) => {
        //     state.selected_breeds = action.payload;
        // })
});

const {reducer: breedsReducer, actions} = breedsSlice;

const breedsActions = {
    ...actions,
    getAll,
    // getById,
}

export {
    breedsReducer,
    breedsActions,
}
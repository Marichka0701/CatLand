import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBreeds, IBreedsId} from "../../interfaces/IBreeds";
import {breedsService} from "../../services/breeds.service";

interface IState {
    breeds: IBreeds[],
    breeds_ids_default: string,
    selected_breeds: IBreedsId,
}

const initialState: IState = {
    breeds: [],
    breeds_ids_default: 'abys,aege,abob,acur,asho',
    selected_breeds: null,
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
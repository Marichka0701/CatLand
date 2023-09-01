import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IBreed, ISelectedBreed} from "../../interfaces/IBreeds";
import {breedsService} from "../../services/breeds.service";

interface IState {
    breeds: IBreed[],
    selected_breed: ISelectedBreed,
    filtered_breeds: IBreed[],
    input_breed_name: string,
}

const initialState: IState = {
    breeds: [],
    selected_breed: null,
    filtered_breeds: [],
    input_breed_name: '',
}

const getAll = createAsyncThunk<IBreed[], void>(
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

const breedsSlice = createSlice({
    name: 'breedsSlice',
    initialState,
    reducers: {
        setSelectedBreed: (state, action) => {
            state.selected_breed = action.payload;
        },
        setFilteredBreeds: (state, action) => {
            state.filtered_breeds = action.payload;
        },
        setInputBreedName: (state, action) => {
            state.input_breed_name = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.filtered_breeds = action.payload;
            state.breeds = action.payload;
        })
});

const {reducer: breedsReducer, actions} = breedsSlice;

const breedsActions = {
    ...actions,
    getAll,
}

export {
    breedsReducer,
    breedsActions,
}
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {imagesService} from "../../services/imagesService";
import {IRandomPhoto} from "../../interfaces/IRandomPhoto";

interface IState {
    status: string,
    error: null,
    randomPhotoForVoting: IRandomPhoto[],
    // selectedPhoto: IRandomPhoto,
    photos: IRandomPhoto[],
}

const initialState:IState = {
    status: '',
    error: null,
    randomPhotoForVoting: [],
    // selectedPhoto: null,
    photos: [],
}

const getRandomPhotoForVoting = createAsyncThunk<IRandomPhoto[], void>(
    'imagesSlice/getRandomPhotoForVoting',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await imagesService.getRandomPhotoForVoting();
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const getPhotos = createAsyncThunk<IRandomPhoto[], {ids: string, limit: number}>(
    'imagesSlice/getPhotos',
    async ({ids, limit}, {rejectWithValue}) => {
        try {
            const {data} = await imagesService.getPhotos(ids, limit);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const imagesSlice = createSlice({
    name: 'imagesSlice',
    initialState,
    reducers: {
        // setSelectedPhoto: (state, action) => {
        //     state.selectedPhoto = action.payload;
        // }
    },
    extraReducers: builder => builder
        .addCase(getRandomPhotoForVoting.fulfilled, (state, action) => {
            state.randomPhotoForVoting = action.payload;
            state.status = 'success';
        })
        .addCase(getRandomPhotoForVoting.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getPhotos.fulfilled, (state, action) => {
            state.photos = action.payload;
            state.status = 'success';
        })
        .addCase(getPhotos.pending, (state, action) => {
            state.status = 'loading';
        })
});

const {reducer: imagesReducer, actions} = imagesSlice;

const imagesActions = {
    ...actions,
    getRandomPhotoForVoting,
    getPhotos,
}

export {
    imagesReducer,
    imagesActions,
}
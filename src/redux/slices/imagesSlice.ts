import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {imagesService} from "../../services/imagesService";
import {IRandomPhoto} from "../../interfaces/IRandomPhoto";
import {IUploadedPhoto} from "../../interfaces/IUploadedPhoto";

interface IState {
    status: string,
    error: null,
    randomPhotoForVoting: IRandomPhoto[],
    // selectedPhoto: IRandomPhoto,
    photos: IRandomPhoto[],
    uploadedPhotos: IUploadedPhoto[],
}

const initialState:IState = {
    status: '',
    error: null,
    randomPhotoForVoting: [],
    // selectedPhoto: null,
    photos: [],
    uploadedPhotos: [],
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

const uploadPhoto = createAsyncThunk<void, {file: File, sub_id: string}>(
    'imagesSlice/uploadPhoto',
    async ({file, sub_id}, {rejectWithValue}) => {
        try {
            await imagesService.uploadPhoto(file, sub_id);
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const getUploadedPhotos = createAsyncThunk<IUploadedPhoto[], void>(
    'imagesSlice/getUploadedPhotos',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await imagesService.getUploadedPhotos();
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
        .addCase(getUploadedPhotos.fulfilled, (state, action) => {
            // if (Array.isArray(action.payload)) {
            console.log(...action.payload, 'action payload')
            console.log(...state.uploadedPhotos, 'state')
                state.uploadedPhotos = [...state.uploadedPhotos, ...action.payload];
            // } else {
            //     state.uploadedPhotos = [...state.uploadedPhotos, action.payload];
            // }
            state.status = 'success';
        })
        .addCase(getUploadedPhotos.pending, (state, action) => {
            state.status = 'loading';
        })
});

const {reducer: imagesReducer, actions} = imagesSlice;

const imagesActions = {
    ...actions,
    getRandomPhotoForVoting,
    getPhotos,
    uploadPhoto,
    getUploadedPhotos,
}

export {
    imagesReducer,
    imagesActions,
}
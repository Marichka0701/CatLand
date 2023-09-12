import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {imagesService} from "../../services/imagesService";
import {IRandomPhoto} from "../../interfaces/IRandomPhoto";
import {IUploadedPhoto} from "../../interfaces/IUploadedPhoto";

interface IState {
    status: string,
    error: string,
    randomPhotoForVoting: IRandomPhoto[],
    photos: IRandomPhoto[],
    uploadedPhotos: IUploadedPhoto[],
    uploadResponseStatus: number,
}

const initialState:IState = {
    status: '',
    error: '',
    randomPhotoForVoting: [],
    photos: [],
    uploadedPhotos: [],
    uploadResponseStatus: null,
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

const uploadPhoto = createAsyncThunk<{data: IUploadedPhoto, status: number}, {file: File, sub_id: string}>(
    'imagesSlice/uploadPhoto',
    async ({file, sub_id}, {rejectWithValue}) => {
        try {
            const {data, status} = await imagesService.uploadPhoto(file, sub_id);
            return {data, status};
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
        .addCase(uploadPhoto.fulfilled, (state, action) => {
            state.uploadedPhotos = [...state.uploadedPhotos, action.payload.data];
            state.uploadResponseStatus = action.payload.status;
            state.status = 'success';
            state.error = '';
        })
        .addCase(uploadPhoto.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(uploadPhoto.rejected, (state, action) => {
            state.error = action.payload as string;
            state.uploadResponseStatus = 400;
        })
});

const {reducer: imagesReducer, actions} = imagesSlice;

const imagesActions = {
    ...actions,
    getRandomPhotoForVoting,
    getPhotos,
    uploadPhoto,
}

export {
    imagesReducer,
    imagesActions,
}
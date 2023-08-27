import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {imagesService} from "../../services/imagesService";
import {IImages} from "../../interfaces/IImages";

interface IState {
    // selectedImage: number,
    images: IImages[],
    status: string,
    error: null,
    randomImage: IImages[],
    // order: string,
}

const initialState:IState = {
    // selectedImage: null,
    images: [],
    status: '',
    error: null,
    randomImage: [],
    // order: '',
}

const getImages = createAsyncThunk<IImages[], {ids: string, limit: number}>(
    'imagesSlice/getImages',
    async ({ids, limit}, {rejectWithValue}) => {
        try {
            const {data} = await imagesService.getByIds(ids, limit);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const getRandomImage = createAsyncThunk<IImages[], void>(
    'imagesSlice/getRandomImage',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await imagesService.getRandom();
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
        // setOrder: (state, action) => {
        //     state.order = action.payload;
        // }
    },
    extraReducers: builder => builder
        .addCase(getImages.fulfilled, (state, action) => {
            state.images = action.payload;
            state.status = 'success';
        })
        .addCase(getImages.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getRandomImage.fulfilled, (state, action) => {
            state.randomImage = action.payload;
            state.status = 'success';
        })
        .addCase(getRandomImage.pending, (state, action) => {
            state.status = 'loading';
        })
});

const {reducer: imagesReducer, actions} = imagesSlice;

const imagesActions = {
    ...actions,
    getImages,
    getRandomImage,
}

export {
    imagesReducer,
    imagesActions,
}
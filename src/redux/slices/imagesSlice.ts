import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {imagesService} from "../../services/imagesService";
import {IImages} from "../../interfaces/IImages";

interface IState {
    // selectedImage: number,
    images: IImages[],
}

const initialState:IState = {
    // selectedImage: null,
    images: []
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

const imagesSlice = createSlice({
    name: 'imagesSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => builder
        .addCase(getImages.fulfilled, (state, action) => {
            state.images = action.payload;
        })
});

const {reducer: imagesReducer, actions} = imagesSlice;

const imagesActions = {
    ...actions,
    getImages,
}

export {
    imagesReducer,
    imagesActions,
}
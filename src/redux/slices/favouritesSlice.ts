import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";
import {AxiosError} from "axios";
import {favouriteService} from "../../services/favourite.service";
import {IFavourite} from "../../interfaces/IFavourite";

interface IState {
    loading: string,
    favouritePhotos: IResMoreInfoVote[],
    // history: []
}

const initialState:IState = {
    loading: '',
    favouritePhotos: [],
}

const getAll = createAsyncThunk<IResMoreInfoVote[], void>(
    'favouritesSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await favouriteService.getAll();
            return data;

        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

// const addToFavourite = createAsyncThunk<{id: string}, {params: IFavourite}>(
//     'favouritesSlice/addToFavourite',
//     async ({params}, {rejectWithValue }) => {
//         try {
//             const {data} = await favouriteService.addToFavourite(params);
//             return data;
//         } catch (e) {
//             const error = e as AxiosError;
//             return rejectWithValue(error.response.data);
//         }
//     }
// )

const deleteFavouriteById = createAsyncThunk<number, {id: number}>(
    'favouritesSlice/deleteFavouriteById',
    async ({id}, {rejectWithValue }) => {
        try {
            await favouriteService.deleteFavouriteById(id);
            return id;
            // const {data} = await favouriteService.deleteFavouriteById(id);
            // return data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response.data);
        }
    }
)

const favouritesSlice = createSlice({
    name: 'favouritesSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.favouritePhotos = action.payload;
            state.loading = 'success';
        })
        .addCase(getAll.pending, (state, action) => {
            state.loading = 'loading';
        })
        .addCase(deleteFavouriteById.fulfilled, (state, action) => {
            state.favouritePhotos = state.favouritePhotos.filter(item => item.id !== action.payload);
        })
});

const {reducer: favouriteReducer, actions} = favouritesSlice;

const favouriteActions = {
    ...actions,
    getAll,
    deleteFavouriteById,
    // addToFavourite,
}

export {
    favouriteReducer,
    favouriteActions,
}
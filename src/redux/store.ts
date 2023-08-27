import {configureStore} from "@reduxjs/toolkit";
import {breedsReducer} from "./slices/breedsSlice";
import {imagesReducer} from "./slices/imagesSlice";

const store = configureStore({
    reducer: {
        breeds: breedsReducer,
        images: imagesReducer,
    }
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch,
}

export {
    store,
}
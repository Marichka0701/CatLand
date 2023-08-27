import {configureStore} from "@reduxjs/toolkit";

import {breedsReducer} from "./slices/breedsSlice";
import {imagesReducer} from "./slices/imagesSlice";
import {votingReducer} from "./slices/votingSlice";

const store = configureStore({
    reducer: {
        breeds: breedsReducer,
        images: imagesReducer,
        voting: votingReducer,
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
import {configureStore} from "@reduxjs/toolkit";

import {breedsReducer} from "./slices/breedsSlice";
import {imagesReducer} from "./slices/imagesSlice";
import {votingReducer} from "./slices/votingSlice";
import {favouriteReducer} from "./slices/favouritesSlice";
import {UIReducer} from "./slices/UISlice";

const store = configureStore({
    reducer: {
        breeds: breedsReducer,
        images: imagesReducer,
        voting: votingReducer,
        favourite: favouriteReducer,
        UI: UIReducer,
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
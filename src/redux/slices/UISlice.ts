import {createSlice} from "@reduxjs/toolkit";

interface IState {
    modalIsOpen: boolean,
}

const initialState:IState = {
    modalIsOpen: false,
}

const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        setModalIsOpen: (state, action) => {
            state.modalIsOpen = action.payload;
        }
    },
    extraReducers: {

    }
});

const {reducer: UIReducer, actions} = UISlice;

const UIActions = {
    ...actions,
}

export {
    UIActions,
    UIReducer,
}
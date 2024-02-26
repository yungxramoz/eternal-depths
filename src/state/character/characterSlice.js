import { createSlice } from "@reduxjs/toolkit";
import Character from "../../models/Character";

const initialState = {
    current:  new Character(),
    availableAttributePoints: 2,
};

export const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        assignAttributePoint: (state, action) => {
            if (state.availableAttributePoints > 0) {
                state.current[action.payload]++;
                state.availableAttributePoints--;
            }
        },
    },
});

export const { assignAttributePoint } = characterSlice.actions;

export default characterSlice.reducer;
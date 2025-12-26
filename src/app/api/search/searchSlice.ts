import type { RootState } from "src/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

type SearchProps = {
    value: string;
}

const initialState: SearchProps = {
    value: '',
}

const searchSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeValue: (state, action: PayloadAction<SearchProps>) => action.payload
    },
});

export const {
    changeValue
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchValue = (state: RootState) => state.search.value;
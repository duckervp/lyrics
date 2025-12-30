import type { RootState } from "src/app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

type SearchProps = {
    value?: string;
    mode?: string;
}

const initialState: SearchProps = {
    value: '',
    mode: 'song'
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changeValue: (state, action: PayloadAction<SearchProps>) => {

            const { value, mode } = action.payload;
            if (value != null) {
                state.value = value;
            }
            if (mode != null) {
                state.mode = mode;
            }
        }
    },
});

export const {
    changeValue
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchValue = (state: RootState) => state.search.value;
export const selectSearchMode = (state: RootState) => state.search.mode;
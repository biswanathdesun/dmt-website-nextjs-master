import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postContactAsync } from "../services/contactUs";
interface UsersState {
    isSubmitting: boolean;
    contact: any[];
}
const initialState: UsersState = {
    isSubmitting: false,
    contact: [],
};
const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // contact us  ----------
        builder.addMatcher(isAnyOf(postContactAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(postContactAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(postContactAsync.rejected), (state) => {
            state.isSubmitting = false;
        });
    }
});
export default contactSlice.reducer;
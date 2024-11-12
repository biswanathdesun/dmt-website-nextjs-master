import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { changePasswordAsync } from "../services/changePassword";

interface UsersState {
    isSubmitting: boolean;
    changePassword: any[];
}
const initialState: UsersState = {
    isSubmitting: false,
    changePassword: [],
};
const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // contact us  ----------
        builder.addMatcher(isAnyOf(changePasswordAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(changePasswordAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(changePasswordAsync.rejected), (state) => {
            state.isSubmitting = false;
        });
    }
});
export default changePasswordSlice.reducer;
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getPlanDetailAsync, getPlansByTypeAsync } from "../services/plans";

interface Distribution {
  _id: string;
  name: string;
  productTypes: string;
  balance: number;
}
interface EnquirySlice {
  isLoading: boolean;
  plans: any[];
  planDetails: {
    musicDistribution: Distribution[]; // Array of Distribution objects
  };
}

const initialState: EnquirySlice = {
  isLoading: false,
  plans: [],
  planDetails: {
    musicDistribution: [
      {
        _id: '',
        name: '',
        productTypes: '',
        balance: 0
      }
    ]
  }
}

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    clearAlert(state) {}
  },
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(
      isAnyOf(getPlansByTypeAsync.pending),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(getPlansByTypeAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.plans = payload?.data;
      }
    );
    builder.addMatcher(
      isAnyOf(getPlansByTypeAsync.rejected),
      (state, { payload }) => {
        state.isLoading = false;
        state.plans = [];
      }
    );

    // ------------
     builder.addMatcher(isAnyOf(getPlanDetailAsync.pending), (state) => {});
     builder.addMatcher(
       isAnyOf(getPlanDetailAsync.fulfilled),
       (state, { payload }) => {
         state.planDetails = payload?.data; // Add user type here
       }
     );
  }
});

// export const { clearAlert } = planSlice.actions;

export default planSlice.reducer;

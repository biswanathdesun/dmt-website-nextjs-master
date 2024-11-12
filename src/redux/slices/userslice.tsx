import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addUserAsync, loginUserAsync, verifyOtpAsync } from "../services/user";
import { getUsersDetailsAsync } from "../services/profile";

interface Address {
  line1: string;
  country: { label: string; value: string };
  pincode: string;
}

interface SocialMedia {
  soundcloud: string;
  spotify: string;
  apple: string;
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

interface ProductCounts {
  musicDistributionUnit: number;
  aIMasteringUnit: number;
  socialMediaUnit: number;
  portfolioUnit: number;
}

interface SubscriptionCount {
  musicDistribution: number;
  aIMastering: number;
  socialMedia: number;
  portfolio: number;
}
interface Users {
  _id: string;
  email: string;
  role: string;
  name: {
    first: string;
    last: string;
  };
  stageName: string;
  phone: string;
  gender: string;
  dob: string | any; // Or another type if you are using a date library
  address: Address | any;
  profileDescription: string;
  socialMedia: SocialMedia;
  wallet: number;
  productCounts: ProductCounts;
  subscriptionCount: SubscriptionCount;
  profilePicture: string;
  is_aadhar_verified:boolean;
}

interface UsersState {
  isSubmitting: boolean;
  isLoading: boolean;
  users: Users;
}

const initialState: UsersState = {
  isSubmitting: false,
  isLoading: false,
  users: {
    _id: "",
    email: "",
    role: "",
    name: {
      first: "",
      last: ""
    },
    stageName: "",
    phone: "",
    gender: "",
    dob: null, // Or another type if you are using a date library
    address: {
      country: "",
      pincode: "",
      line1: ""
    },
    profileDescription: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: "",
      soundcloud: "",
      spotify: "",
      apple: ""
    },
    wallet: 0,
    productCounts: {
      musicDistributionUnit: 0,
      aIMasteringUnit: 0,
      portfolioUnit: 0,
      socialMediaUnit: 0
    },
    subscriptionCount: {
      musicDistribution: 0,
      aIMastering: 0,
      portfolio: 0,
      socialMedia: 0
    },
    profilePicture: "",
    is_aadhar_verified:false
  }
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add User ----------
    builder.addMatcher(isAnyOf(addUserAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(addUserAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(addUserAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Verify OTP ----------
    builder.addMatcher(isAnyOf(verifyOtpAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(verifyOtpAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(verifyOtpAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Login User ----------
    builder.addMatcher(isAnyOf(loginUserAsync.pending), (state) => {
      state.isSubmitting = true;
    });
    builder.addMatcher(isAnyOf(loginUserAsync.fulfilled), (state) => {
      state.isSubmitting = false;
    });
    builder.addMatcher(isAnyOf(loginUserAsync.rejected), (state) => {
      state.isSubmitting = false;
    });

    // Get User in Profile ----------
    builder.addMatcher(isAnyOf(getUsersDetailsAsync.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getUsersDetailsAsync.fulfilled),
      (state, { payload }) => {
        state.isLoading = false;
        state.users = payload?.data; // Add user type here
      }
    );
    builder.addMatcher(isAnyOf(getUsersDetailsAsync.rejected), (state) => {
      state.isLoading = false;
    });
  }
});

export default usersSlice.reducer;

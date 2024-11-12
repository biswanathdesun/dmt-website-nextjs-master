import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userslice";
import contactReducer from "./slices/contactslice";
import releasesReducer from "./slices/releasesSlice";
import cartReducer from "./slices/cartSlice";
import changePasswordReducer from "./slices/changepasswordSlice";
import mainDashboardReducer from "./slices/mainDashboardSlice";
import couponReducer from "./slices/couponslice";
import paymentReducer from "./slices/createpaymentslice";
import ordersReducer from './slices/ordersDetailSlice';
import oneOrderReducer from './slices/oneOrderDetailSlice';
import uploadAudioReducer from "./slices/uploadAudioSlice";
import royaltyReducer from "./slices/royaltySlice";
import enquiryReducer from './slices/enquirySlice';
import ledgerReducer from './slices/ledgerSlice';
import planReducer from './slices/planSlice'
import usersReducer from "./slices/userslice";
import masteredAudio from "./slices/masterAudioSlice";
import refferalReducer from "./slices/referralSlice"
import bankReducer from "./slices/bankSlice";
import socialMediaReducer from "./slices/socialMediaSlice"
import noticeReducer from "./slices/noticeSlice";
import faqReducer from "./slices/faqSlice";
import videoReducer from './slices/videoSlice';
import helpReducer from "./slices/helpSlice";
import ProfessionalReducer from "./slices/creativeprofessionalSlice"
import categoryAndSubCategoryReducer from "./slices/categoryAndSubCategorySlice";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  users: userReducer,
  contactUs: contactReducer,
  release: releasesReducer,
  cart: cartReducer,
  changePassword: changePasswordReducer,
  couponSlice: couponReducer,
  mainDashboard: mainDashboardReducer,
  payment: paymentReducer,
  royaltyData: royaltyReducer,
  newRelease: uploadAudioReducer,
  masteredAudio: masteredAudio,
  enquiry: enquiryReducer,
  ledger: ledgerReducer,
  orderDetails: ordersReducer,
  oneOrderDetail: oneOrderReducer,
  plans: planReducer,
  referrals: refferalReducer,
  userProfile: usersReducer,
  bank: bankReducer,
  socialMedia: socialMediaReducer,
  notice: noticeReducer,
  faq: faqReducer,
  help: helpReducer,
  professional: ProfessionalReducer,
  video: videoReducer,
  categoryAndSubCategory: categoryAndSubCategoryReducer,
});

export default rootReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";
import { UserDatas, UserState } from "../../types/UserState";

// interface userState {
//   // user: object;
// }

let initialState: UserDatas = {
  // user: {},
  id: "",
  name: "",
  email: "",
  profile_image: "",
  country_code: 0,
  country_iso: "",
  contact_number: 0,
  address: null,
  access_token: "",
  default_delivery_method: "",
  pickup_location_id: null,
  stripe_customer_id: "",
  stripe_payment_id: null,
  is_offline_user: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDatas>) => {
      // state.user = action.payload;
      // console.log("action  Payload", action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profile_image = action.payload.profile_image;
      state.country_code = action.payload.country_code;
      state.country_iso = action.payload.country_iso;
      state.contact_number = action.payload.contact_number;
      state.access_token = action.payload.access_token;
      state.default_delivery_method = action.payload.default_delivery_method;
      state.pickup_location_id = action.payload.pickup_location_id;
      state.stripe_customer_id = action.payload.stripe_customer_id;
      state.stripe_payment_id = action.payload.stripe_payment_id;
      state.is_offline_user = action.payload.is_offline_user;
      state.address = action.payload.address;

      // state = action.payload;

      // state.id = action.payload.id;

      // console.log("id :----", state.id);
      // console.log("InitialState", action.payload);
      // console.log("state.address ", state.address);
    },
    logoutUser: (state) => {
      // state: initialState;
      state.id = "";
      state.name = "";
      (state.email = ""), (state.profile_image = "");
      state.country_code = 0;
      (state.country_iso = ""), (state.contact_number = 0);
      state.address = null;
      state.access_token = "";
      state.default_delivery_method = "";
      state.pickup_location_id = null;
      state.stripe_customer_id = "";
      state.stripe_payment_id = null;
      state.is_offline_user = 0;
      state.address = null;
    },
  },
});

export const { setUser } = userSlice.actions;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;

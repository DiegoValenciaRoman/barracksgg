import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: { token: "", isAuth: false },
  },
  reducers: {
    setLoggedUser: (state, action) => {
      state.user = { token: action.payload, isAuth: true };
      localStorage.setItem("Token", action.payload);
    },
    logOutUser: (state, action) => {
      state.user = { token: "", isAuth: false };
      localStorage.removeItem("Token");
    },
  },
});

export const { setLoggedUser, logOutUser } = appSlice.actions;

export const sendUserCredentials = (payload) => (dispatch) => {
  axios({
    method: "post",
    url: "https://beta-api.barracks.gg/v2/Auth/Authenticate",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        dispatch(setLoggedUser(response.data.token));
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error.response.status);
      }
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.app.user;

export default appSlice.reducer;

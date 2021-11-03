import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../Firebase/config";

const AuthReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  async ({ email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = await userCredentials.user;
        console.log(user);
      })
      .catch((error) => alert(error.message));
  };
};
const signin = (dispatch) => {
  async ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = await userCredentials.user;
        console.log(user);
      })
      .catch((error) => alert(error.message));
  };
};
const signout = (dispatch) => {
  () => {
    auth
      .signOut()
      .then(() => {})
      .catch((error) => alert(error.message));
  };
};

export const { Context, Provider } = createDataContext(
  AuthReducer,
  { signin, signup, signout },
  { email: "", errorMessage: "" }
);

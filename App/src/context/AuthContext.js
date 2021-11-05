import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../Firebase/config";
import { Alert } from "react-native";

const AuthReducer = (state, action) => {
  switch (action.type) {
    // case "show_error":
    //   return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload };
    case "signout":
      return { ...state, user: {} };
    default:
      return state;
  }
};

const automaticSignin = (dispatch) => {
  return async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      dispatch({ type: "signin", payload: user });
    }

    //navigate("AppFlow")
    // else
    //   // navigate("AuthFlow")
    //
  };
};

const signup = (dispatch) => {
  return async ({ email, password, firsName, lastName, home }) => {
    if (password === "" || email === "") {
      Alert.alert("Email or Password can't be Empty");
    } else {
      if (firsName === "" || lastName === "") {
        Alert.alert("FirstName or LastName can't be Empty");
      } else {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            AsyncStorage.setItem("user", user);
            dispatch({ type: "signin", payload: user });
            home();
            //console.log(user);
          })
          .catch((error) => Alert.alert(error.message));
      }
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password, home }) => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        AsyncStorage.setItem("user", user);
        dispatch({ type: "signin", payload: user });
        home();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
};
const signout = (dispatch) => {
  return async ({ authNavigation }) => {
    await auth
      .signOut()
      .then(() => {
        AsyncStorage.removeItem("user");
        dispatch({ type: "signout" });
        authNavigation();
      })
      .catch((error) => Alert.alert(error.message));
  };
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signin, signup, signout, automaticSignin },
  { user: {} }
);

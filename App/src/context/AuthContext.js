import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const AuthReducer = (state, action) => {
  switch (action.type) {
    // case "show_error":
    //   return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload };
    case "signout":
      return { ...state, user: {} };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const automaticSignin = (dispatch) => {
  return async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      dispatch({ type: "signin", payload: user });
      replace("AppFlow");
    } else {
      replace("Welcome");
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password, firstName, lastName }) => {
    //loader
    dispatch({ type: "loader", payload: true });
    //Verification
    if (password === "" || email === "") {
      Alert.alert("Email or Password can't be Empty");
    } else {
      if (firstName === "" || lastName === "") {
        Alert.alert("FirstName or LastName can't be Empty");
      } else {
        // USER SIGNUP
        await Firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            // const userId = Firebase.auth().currentUser.uid;
            // USER REFERENCE IN REALTIME DATABASE
            await Firebase.database()
              .ref("Users/" + user.uid)
              .set({
                userId: user.uid,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                bio: "",
                country: "",
                image: "",
              })
              .then(() => {
                //loader
                dispatch({ type: "loader", payload: false });
              })
              .catch((error) => {
                //loader
                dispatch({ type: "loader", payload: false });
                Alert.alert(error.message);
              });
            // ASYNC STORAGE
            await AsyncStorage.setItem("user", user.uid);
            dispatch({ type: "signin", payload: user });
            replace("AppFlow");
          })
          .catch((error) => {
            //loader
            dispatch({ type: "loader", payload: false });
            Alert.alert(error.message);
          });
      }
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    //loader
    dispatch({ type: "loader", payload: true });
    await Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        //loader
        dispatch({ type: "loader", payload: false });
        const user = userCredentials.user;
        await AsyncStorage.setItem("user", user.uid);
        dispatch({ type: "signin", payload: user });
        replace("AppFlow");
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert(error.message);
      });
  };
};
const signout = (dispatch) => {
  return async () => {
    await Firebase.auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem("user");
        dispatch({ type: "signout" });
        replace("AuthFlow", { screen: "Welcome" });
      })
      .catch((error) => Alert.alert(error.message));
  };
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signin, signup, signout, automaticSignin },
  { user: {}, loading: false }
);

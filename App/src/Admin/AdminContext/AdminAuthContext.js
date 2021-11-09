import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const AdminAuthReducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, adminData: action.payload };
    default:
      return state;
  }
};

const automaticAdminSignin = (dispatch) => {
  return async () => {
    const admin = await AsyncStorage.getItem("admin");
    if (admin) {
      replace("AdminFlow");
    } else {
      replace("AuthFlow", { screen: "Welcome" });
    }
  };
};

const admin_signin = (dispatch) => {
  return async ({ email, password }) => {
    if (email === "") {
      Alert.alert("ERROR!", "Email can't be Empty");
    } else if (password === "") {
      Alert.alert("ERROR!", "Password can't be Empty");
    } else {
      dispatch({ type: "loader", payload: true });
      try {
        //const uid = await AsyncStorage.getItem("user");
        Firebase.database()
          .ref("Admin")
          .once("value", async (snapshot) => {
            const data = snapshot.val();
            dispatch({ type: "setData", payload: data });
            await AsyncStorage.setItem("admin", data.email);
            if (email === data.email && password === data.password) {
              dispatch({ type: "loader", payload: false });
              replace("AdminFlow");
            } else {
              Alert.alert(
                "ERROR!",
                "Admin Credentials are invalid, Try Again..."
              );
            }
          });
      } catch (error) {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      }
    }
  };
};

const admin_signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("admin");
    replace("AuthFlow", { screen: "Welcome" });
  };
};

export const { Provider, Context } = createDataContext(
  AdminAuthReducer,
  { admin_signin, admin_signout, automaticAdminSignin },
  { loading: false, adminData: {} }
);

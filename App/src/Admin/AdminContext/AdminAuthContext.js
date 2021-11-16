import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { replace } from "../../Navigation/NavigationRef";

const AdminAuthReducer = (state, action) => {
  switch (action.type) {
    case "loader":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, adminData: action.payload };
    default:
      return state;
  }
};

const admin_signin = (dispatch) => {
  return async ({ email, password }) => {
    dispatch({ type: "loader", payload: true });
    if (email === "") {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", "Email can't be Empty");
    } else if (password === "") {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", "Password can't be Empty");
    } else {
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
    replace("AdminAuth");
  };
};

export const { Provider, Context } = createDataContext(
  AdminAuthReducer,
  { admin_signin, admin_signout },
  { loading: false, adminData: {} }
);

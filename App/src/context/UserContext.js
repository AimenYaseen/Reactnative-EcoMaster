import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, userData: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const updateUser = (dispatch) => {
  return async (image, bio, firstName, lastName, country) => {
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref("Users/" + uid)
      .update({
        firstName: firstName,
        lastName: lastName,
        bio: bio,
        country: country,
        image: image,
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
  };
};

const getUser = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");
    //const userId = Firebase.auth().currentUser.uid;
    console.log(uid);
    await Firebase.database()
      .ref("Users/" + uid)
      .on("value", async (snapshot) => {
        dispatch({ type: "loader", payload: false });
        const data = await snapshot.val();
        console.log(data);
        dispatch({ type: "setData", payload: data });
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert(error.message);
      });
  };
};

export const { Provider, Context } = createDataContext(
  UserReducer,
  { getUser, updateUser },
  { userData: {}, loading: false }
);

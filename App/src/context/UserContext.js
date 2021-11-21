import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { navigate } from "../Navigation/NavigationRef";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, userData: action.payload };
    case "setImage":
      return { ...state, imageUrl: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const updateUser = (dispatch) => {
  return async (imgUrl, userBio, fName, lName, contry) => {
    if (fName === "") {
      Alert.alert("ERROR!", "FirstName can't be Empty");
    } else {
      dispatch({ type: "loader", payload: true });
      try {
        const uid = await AsyncStorage.getItem("user");
        // console.log(uid);
        await Firebase.database()
          .ref("Users/" + uid)
          .update({
            image: imgUrl,
            bio: userBio,
            firstName: fName,
            lastName: lName,
            country: contry,
          });
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "UPDATED!",
          "Congratulations, Your data has updated...",
          [
            {
              text: "OK",
              onPress: () => navigate("Profile"),
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      }
    }
  };
};

const changePassword = (dispatch) => {
  return async ({ current, newPassword }) => {
    const password = await AsyncStorage.getItem("password");
    //console.log(password.toString());
    if (current === password) {
      if (newPassword === "") {
        Alert.alert(
          "ERROR!",
          "You must Enter New Password in order to complete this Operation"
        );
      } else {
        try {
          //loader
          dispatch({ type: "loader", payload: true });
          const user = Firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(async () => {
              //loader
              dispatch({ type: "loader", payload: false });
              await AsyncStorage.removeItem("password");
              await AsyncStorage.setItem("password", newPassword);
              Alert.alert("Congratulations!", "Your Password has updated");
            })
            .catch((error) => {
              //loader
              dispatch({ type: "loader", payload: false });
              Alert.alert("ERROR!", error.message);
            });
        } catch (error) {
          //loader
          dispatch({ type: "loader", payload: false });
          Alert.alert("ERROR!", error.message);
        }
      }
    } else {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", "You Entered Wrong Current Password");
    }
  };
};

const getUser = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    try {
      const uid = await AsyncStorage.getItem("user");
      await Firebase.database()
        .ref("Users/" + uid)
        .once("value", async (snapshot) => {
          dispatch({ type: "loader", payload: false });
          const data = await snapshot.val();
          dispatch({ type: "setData", payload: data });
        });
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert(error.message);
    }
  };
};

export const { Provider, Context } = createDataContext(
  UserReducer,
  { getUser, updateUser, changePassword },
  { userData: {}, loading: false }
);

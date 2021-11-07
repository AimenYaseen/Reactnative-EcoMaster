import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

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

const uploadImage = (dispatch) => {
  return (image) => {
    if (image === "") {
      dispatch({ type: "setImage", payload: image });
    }
    dispatch({ type: "loader", payload: true });
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    // ADD TIMESTAMP TO FILENAME
    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    fileName = name + Date.now() + "." + extension;

    const storageRef = Firebase.storage().ref("userImages/").child(fileName);

    try {
      storageRef.put(uploadUri).then((snapshot) => {
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "Image Uploaded!",
          "Your image has been successfully Uploaded"
        );
        storageRef.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          dispatch({ type: "setImage", payload: downloadURL });
        });
      });
    } catch (error) {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR", error.message);
    }
  };
};

const updateUser = (dispatch) => {
  return async (imageUrl, userBio, fName, lName, contry) => {
    dispatch({ type: "loader", payload: true });
    try {
      const uid = await AsyncStorage.getItem("user");
      console.log(uid);
      Firebase.database()
        .ref("Users/" + uid)
        .update({
          image: imageUrl,
          bio: userBio,
          firstName: fName,
          lastName: lName,
          country: contry,
        });
      dispatch({ type: "loader", payload: false });
      Alert.alert("UPDATED!", "Congratulations, Your data has updated...");
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert(error.message);
    }
  };
};

const changePassword = (dispatch) => {
  return async () => {
    try {
    } catch (error) {
      Alert.alert(error.message);
    }
  };
};

const getUser = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    try {
      const uid = await AsyncStorage.getItem("user");
      Firebase.database()
        .ref("Users/" + uid)
        .once("value", (snapshot) => {
          dispatch({ type: "loader", payload: false });
          const data = snapshot.val();
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
  { getUser, updateUser, uploadImage },
  { userData: {}, loading: false, imageUrl: "" }
);

import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const PostReducer = (state, action) => {
  switch (action.type) {
    case "setImage":
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};

const getPost = (dispatch) => {
  return () => {};
};

const uploadPostImage = (dispatch) => {
  return async (image) => {
    if (image === "") {
      dispatch({ type: "setImage", payload: image });
    }
    dispatch({ type: "loader", payload: true });
    // FILENAME
    let fileName = image.substring(image.lastIndexOf("/") + 1);
    // ADD TIMESTAMP TO FILENAME
    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    fileName = name + Date.now() + "." + extension;
    let uploadUri;
    try {
      const response = await fetch(image);
      uploadUri = await response.blob();
    } catch (error) {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR", error.message);
    }

    const storageRef = Firebase.storage().ref("postImages/").child(fileName);

    try {
      storageRef
        .put(uploadUri, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          dispatch({ type: "loader", payload: false });
          Alert.alert(
            "Image Uploaded!",
            "Your image has been successfully Uploaded"
          );
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
            dispatch({ type: "setImage", payload: downloadURL });
            // resolve(snapshot);
          });
        });
    } catch (error) {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR", error.message);
    }
  };
};

const addPost = (dispatch) => {
  return async ({ post, image, time, likes }) => {
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref("Posts/")
      .set({
        userId: uid,
        post: post,
        postImage: image,
        postTime: time,
        likes: likes,
      })
      .then(() => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("Post Uploaded!", "Your post has successfully Uploaded");
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      });
  };
};

const deletePost = (dispatch) => {
  return () => {};
};

export const { Context, Provider } = createDataContext(
  PostReducer,
  { addPost, deletePost, getPost, uploadPostImage },
  { posts: [], loading: false, imageUrl: "" }
);

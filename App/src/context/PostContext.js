import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { navigate } from "../Navigation/NavigationRef";

const PostReducer = (state, action) => {
  switch (action.type) {
    case "posts":
      return { ...state, posts: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getPost = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Posts/")
      .orderByKey()
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const postArr = [];
          snapshot.forEach((element) => {
            const {
              postId,
              userId,
              post,
              postImage,
              postTime,
              likedBy,
              likes,
            } = element.val();
            //pushValues in likedBy
            const liked = Object.keys(likedBy);
            //pushValues of Object
            postArr.push({
              id: postId,
              userId,
              post,
              postImage,
              postTime,
              likes,
              likedBy: liked,
              liked: false,
            });
          });
          dispatch({ type: "posts", payload: postArr });
        } else {
          dispatch({ type: "loader", payload: false });
          console.log("No data available");
        }
      })
      .catch((error) => {
        dispatch({ type: "loader", payload: false });
        console.error(error);
      });
  };
};

const addPost = (dispatch) => {
  return async (post, image, time, likes) => {
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref("Posts/" + time)
      .set({
        postId: time,
        userId: uid,
        post,
        postImage: image,
        postTime: Date.now(),
        likes: "",
      })
      .then(async () => {
        await Firebase.database()
          .ref(`Posts/${time}/likedBy/` + time)
          .set(1);
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "Post Uploaded!",
          "Your post has successfully Uploaded",
          [
            {
              text: "OK",
              onPress: () => navigate("Post"),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      });
  };
};

const getLikes = (dispatch) => {
  return () => {};
};

const deletePost = (dispatch) => {
  return () => {};
};

export const { Context, Provider } = createDataContext(
  PostReducer,
  { addPost, deletePost, getPost, getLikes },
  { posts: [], loading: false }
);

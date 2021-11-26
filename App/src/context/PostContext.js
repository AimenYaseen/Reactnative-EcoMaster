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
    case "delete":
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

const getPost = (dispatch) => {
  return async () => {
    dispatch({ type: "delete", payload: false });
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
            const { postId, userId, post, postImage, postTime, likedBy } =
              element.val();
            //pushValues in likedBy
            const liked = Object.keys(likedBy);
            //pushValues of Object
            postArr.push({
              id: postId,
              userId,
              post,
              postImage,
              postTime,
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
  return async (post, image, time) => {
    dispatch({ type: "delete", payload: false });
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

const editPost = (dispatch) => {
  return async (id, post, image) => {
    dispatch({ type: "delete", payload: false });
    if (post) {
      dispatch({ type: "loader", payload: true });
      try {
        await Firebase.database()
          .ref("Posts/" + id)
          .update({
            post,
            postImage: image,
          });
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "UPDATED!",
          "Congratulations, Your data has updated...",
          [
            {
              text: "OK",
              onPress: () => navigate("Post"),
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      }
    } else {
      Alert.alert("ERROR!", " Please Enter All the fields...");
    }
  };
};

const deletePost = (dispatch) => {
  return (postId) => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Posts/" + postId)
      .once("value", (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImage } = documentSnapshot.val();

          if (postImage == "") {
            Firebase.database()
              .ref("Posts/" + postId)
              .remove()
              .then(() => {
                dispatch({ type: "loader", payload: false });
                Alert.alert(
                  "Post Deleted!",
                  "Your post has been deleted successfully!",
                  [
                    {
                      text: "OK",
                      onPress: () =>
                        dispatch({ type: "delete", payload: true }),
                    },
                  ],
                  { cancelable: false }
                );
              })
              .catch((e) => {
                dispatch({ type: "loader", payload: false });
                Alert.alert("ERROR!", e.message);
              });
          } else {
            const storageRef = Firebase.storage().refFromURL(postImage);
            const imageRef = Firebase.storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImage} has been deleted successfully.`);
                Firebase.database()
                  .ref("Posts/" + postId)
                  .remove()
                  .then(() => {
                    dispatch({ type: "loader", payload: false });
                    Alert.alert(
                      "Post Deleted!",
                      "Your post has been deleted successfully!",
                      [
                        {
                          text: "OK",
                          onPress: () =>
                            dispatch({ type: "delete", payload: true }),
                        },
                      ],
                      { cancelable: false }
                    );
                  })
                  .catch((e) => {
                    dispatch({ type: "loader", payload: false });
                    Alert.alert("ERROR!", e.message);
                  });
              })
              .catch((e) => {
                dispatch({ type: "loader", payload: false });
                Alert.alert("ERROR!", e.message);
              });
          }
        }
      });
  };
};

export const { Context, Provider } = createDataContext(
  PostReducer,
  { addPost, deletePost, getPost, editPost },
  { posts: [], loading: false, deleted: false }
);

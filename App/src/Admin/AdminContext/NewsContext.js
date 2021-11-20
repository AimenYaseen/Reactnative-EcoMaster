import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { navigate } from "../../Navigation/NavigationRef";

const NewsReducer = (state, action) => {
  switch (action.type) {
    case "newsTips":
      return { ...state, newsTips: action.payload };
    case "newsInformation":
      return { ...state, newsInformation: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    case "delete":
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

const addNews = (dispatch) => {
  return async (newsCategory, newsTitle, newsCaption, newsImage, time) => {
    if (newsCategory && newsTitle && newsCaption) {
      dispatch({ type: "loader", payload: true });
      await Firebase.database()
        .ref(`News/${newsCategory}/` + time)
        .set({
          newsId: time,
          title: newsTitle,
          caption: newsCaption,
          image: newsImage,
        })
        .then(() => {
          //loader
          dispatch({ type: "loader", payload: false });
          Alert.alert(
            "News Uploaded!",
            "Your News has successfully Uploaded",
            [
              {
                text: "OK",
                onPress: () =>
                  navigate("AdminMainFlow", { screen: "AdminNews" }),
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
    } else {
      Alert.alert("ERROR!", " Please Enter All the fields...");
    }
  };
};

const getNewsTips = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("News/Tips")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { newsId, title, caption, image } = element.val();
            //pushValues of Object
            newsArr.push({
              id: newsId,
              title,
              caption,
              image,
            });
          });
          dispatch({ type: "newsTips", payload: newsArr });
        } else {
          dispatch({ type: "newsTips", payload: [] });
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

const getNewsInformation = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("News/Information")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { newsId, title, caption, image } = element.val();
            //pushValues of Object
            newsArr.push({
              id: newsId,
              title,
              caption,
              image,
            });
          });
          dispatch({ type: "newsInformation", payload: newsArr });
        } else {
          dispatch({ type: "newsInformation", payload: [] });
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

const editNews = (dispatch) => {
  return async (id, newsCategory, newsTitle, newsCaption, newsImage) => {
    if (newsCategory && newsCaption && newsTitle) {
      dispatch({ type: "loader", payload: true });
      try {
        await Firebase.database()
          .ref(`News/${newsCategory}/` + id)
          .update({
            title: newsTitle,
            caption: newsCaption,
            image: newsImage,
          });
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "UPDATED!",
          "Congratulations, Your data has updated...",
          [
            {
              text: "OK",
              onPress: () => navigate("AdminMainFlow", { screen: "AdminNews" }),
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

const deleteNews = (dispatch) => {
  return (newsId, title) => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref(`News/${title}/` + newsId)
      .once("value", (documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { image } = documentSnapshot.val();
          const storageRef = Firebase.storage().refFromURL(image);
          const imageRef = Firebase.storage().ref(storageRef.fullPath);

          imageRef
            .delete()
            .then(() => {
              console.log(`${image} has been deleted successfully.`);
              Firebase.database()
                .ref(`News/${title}/` + newsId)
                .remove()
                .then(() => {
                  dispatch({ type: "delete", payload: true });
                  dispatch({ type: "loader", payload: false });
                  Alert.alert(
                    "News Deleted!",
                    "Your News has been deleted successfully!"
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
      });
  };
};

export const { Context, Provider } = createDataContext(
  NewsReducer,
  { addNews, getNewsTips, getNewsInformation, editNews, deleteNews },
  { newsTips: [], newsInformation: [], loading: false, deleted: false }
);

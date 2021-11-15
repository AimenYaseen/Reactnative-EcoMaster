import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { navigate } from "../../Navigation/NavigationRef";

const NewsReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const addNews = (dispatch) => {
  return async (newsCategory, newsTitle, newsCaption, newsImage, time) => {
    dispatch({ type: "loader", payload: true });
    await Firebase.database()
      .ref(`News/${newsCategory}` + time)
      .set({
        newsId: time,
        title: newsTitle,
        caption: newsCaption,
        image: newsImage,
      })
      .then(() => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("News Uploaded!", "Your News has successfully Uploaded");
        navigate("AdminMainFlow");
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      });
  };
};

const getNewsTips = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("News/Tips")
      .orderByKey()
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const postArr = [];
          snapshot.forEach((element) => {
            const { newsId, title, caption, image } = element.val();
            //pushValues of Object
            postArr.push({
              id: newsId,
              title,
              caption,
              image,
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

const getNewsDYK = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("News/Tips")
      .orderByKey()
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const postArr = [];
          snapshot.forEach((element) => {
            const { newsId, title, caption, image } = element.val();
            //pushValues of Object
            postArr.push({
              id: newsId,
              title,
              caption,
              image,
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

const editNews = (dispatch) => {
  return () => {};
};

const deleteNews = (dispatch) => {
  return () => {};
};

const { Context, Provider } = createDataContext(
  NewsReducer,
  { addNews, getNewsTips, getNewsDYK, editNews, deleteNews },
  { newsTips: [], newsDYN: [] }
);

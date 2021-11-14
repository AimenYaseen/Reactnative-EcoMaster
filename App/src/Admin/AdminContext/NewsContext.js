import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { replace } from "../../Navigation/NavigationRef";

const NewsReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const addNews = (dispatch) => {
  return () => {};
};

const getNews = (dispatch) => {
  return () => {};
};

const editNews = (dispatch) => {
  return () => {};
};

const deleteNews = (dispatch) => {
  return () => {};
};

const { Context, Provider } = createDataContext(
  NewsReducer,
  { addNews, getNews, editNews, deleteNews },
  {}
);

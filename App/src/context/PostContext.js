import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const PostReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const getPost = (dispatch) => {
  return () => {};
};

const addPost = (dispatch) => {
  return () => {};
};

const deletePost = (dispatch) => {
  return () => {};
};

export const { Context, Provider } = createDataContext(
  PostReducer,
  { addPost, deletePost, getPost },
  { loading: false }
);

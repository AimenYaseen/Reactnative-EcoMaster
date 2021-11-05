import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const UserReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const updateUser = (dispatch) => {
  return () => {};
};

const getUser = (dispatch) => {
  return () => {};
};

export const { Context, Provider } = createDataContext(
  UserReducer,
  { getUser, updateUser },
  { loading: false }
);

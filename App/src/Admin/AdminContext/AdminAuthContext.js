import createDataContext from "../../context/createDataContext";
import { Firebase } from "../../Firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminAuthReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const admin_signin = (dispatch) => {
  return () => {};
};

const admin_signout = (dispatch) => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  AdminAuthReducer,
  { admin_signin, admin_signout },
  { loading: false }
);

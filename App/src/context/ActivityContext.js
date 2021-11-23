import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { navigate } from "../Navigation/NavigationRef";

const ActivityReducer = (state, action) => {
  switch (action.type) {
    case "ActivityHabit":
      return { ...state, activity: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const addActivity = (dispatch) => {
  return async ({ customId }) => {
    const time = Date.now();
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref("Activity/" + time)
      .set({
        activityId: time,
        userId: uid,
        customId: customId,
      })
      .then(() => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          " Habit Uploaded!",
          "Your Habit has successfully Uploaded",
          [
            {
              text: "OK",
              onPress: () => navigate("Activity"),
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

const getActivity = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Activity/")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { activityId, userId, customId } = element.val();
            //pushValues of Object
            newsArr.push({
              id: activityId,
              userId,
              customId,
            });
          });
          dispatch({ type: "ActivityHabit", payload: newsArr });
        } else {
          dispatch({ type: "ActivityHabit", payload: [] });
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

export const { Context, Provider } = createDataContext(
  ActivityReducer,
  { addActivity, getActivity },
  { activity: [], loading: false }
);

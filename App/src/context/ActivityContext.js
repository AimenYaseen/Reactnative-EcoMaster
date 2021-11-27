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
    case "delete":
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

const addActivity = (dispatch) => {
  return async ({ Id }) => {
    dispatch({ type: "delete", payload: false });
    const time = Date.now();
    dispatch({ type: "loader", payload: true });
    const uid = await AsyncStorage.getItem("user");

    Firebase.database()
      .ref("Activity/")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          let present = false;
          snapshot.forEach((element) => {
            // console.log(element.val());
            const { customId, userId } = element.val();
            // Checking
            if (customId == Id && userId == uid) {
              present = true;
            }
          });
          if (present) {
            dispatch({ type: "loader", payload: false });
            Alert.alert(
              "ERROR",
              "You Have already select this Habit, Please select another one..."
            );
          } else {
            Firebase.database()
              .ref("Activity/" + time)
              .set({
                activityId: time,
                userId: uid,
                customId: Id,
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
                      onPress: () => navigate("Custom", { screen: "Activity" }),
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
          }
        } else {
          console.log("No data available");
        }
      });
  };
};

const getActivity = (dispatch) => {
  return async () => {
    dispatch({ type: "delete", payload: false });
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

const deleteActivity = (dispatch) => {
  return (customId) => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Activity/" + customId)
      .remove()
      .then(() => {
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          " Habit Deleted!",
          "Your Habit has been deleted successfully!",
          [
            {
              text: "OK",
              onPress: () => dispatch({ type: "delete", payload: true }),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((e) => {
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", e.message);
      });
  };
};

export const { Context, Provider } = createDataContext(
  ActivityReducer,
  { addActivity, getActivity, deleteActivity },
  { activity: [], loading: false, deleted: false }
);

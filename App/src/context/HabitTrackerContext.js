import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { navigate } from "../Navigation/NavigationRef";

const HabitReducer = (state, action) => {
  switch (action.type) {
    case "habits":
      return { ...state, habits: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getHabit = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    const userId = Firebase.auth().currentUser.uid;
    Firebase.database()
      .ref(`HabitTracker/${userId}/`)
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { habitId, completed, select, time } = element.val();
            //pushValues of Object
            newsArr.push({
              id: habitId,
              completed,
              selected: select,
              time,
            });
          });
          dispatch({ type: "habits", payload: newsArr });
        } else {
          dispatch({ type: "habits", payload: [] });
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

const updateHabit = (dispatch) => {
  return (habitId, completed, selected, time) => {
    try {
      const userId = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref(`HabitTracker/${userId}/` + habitId)
        .update({
          time: time,
          select: selected,
          completed: completed,
        });
      dispatch({ type: "loader", payload: false });
      Alert.alert(
        "UPDATED!",
        "Congratulations, Your data has updated...",
        [
          {
            text: "OK",
            //onPress: () => navigate("AdminHabit"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", error.message);
    }
  };
};

export const { Context, Provider } = createDataContext(
  HabitReducer,
  { getHabit, updateHabit },
  { habits: [], loading: false, deleted: false }
);

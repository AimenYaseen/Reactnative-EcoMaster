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
    case "reward":
      return { ...state, reward: action.payload };
    default:
      return state;
  }
};

const getHabit = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    const userId = Firebase.auth().currentUser.uid;
    console.log(userId);
    Firebase.database()
      .ref(`HabitTracker/${userId}/`)
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { habitId, completed, select, time, lock } = element.val();
            //pushValues of Object
            newsArr.push({
              id: habitId,
              completed,
              selected: select,
              locked: lock,
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
  return (habitId, completed) => {
    try {
      const userId = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref(`HabitTracker/${userId}/` + habitId)
        .update({
          completed: completed,
        });
      dispatch({ type: "loader", payload: false });
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", error.message);
    }
  };
};

const getReward = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    const userId = Firebase.auth().currentUser.uid;
    // console.log(userId);
    Firebase.database()
      .ref(`HabitTracker/${userId}/`)
      .orderByKey()
      .once("value", (snapshot) => {
        let reward = 0;
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          snapshot.forEach((element) => {
            const { habitId, completed, select, time, lock } = element.val();
            if (completed) {
              Firebase.database()
                .ref("Habits/" + habitId)
                .once("value", async (snapshot) => {
                  if (snapshot.exists) {
                    const data = await snapshot.val();
                    //console.log(data.reward);
                    reward = reward + parseInt(data.reward);
                    //console.log(reward);
                    dispatch({ type: "reward", payload: reward });
                  }
                });
            }
          });
          dispatch({ type: "loader", payload: false });
        } else {
          // dispatch({ type: "reward", payload: reward });
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

const clearReward = (dispatch) => {
  return () => {
    dispatch({ type: "reward", payload: 0 });
  };
};

const setLock = (dispatch) => {
  return (habitId, locked) => {
    try {
      const userId = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref(`HabitTracker/${userId}/` + habitId)
        .update({
          lock: locked,
        });
      dispatch({ type: "loader", payload: false });
      // Alert.alert(
      //   "ECO-MASTER!",
      //   "Congratulations, Your have completed your Habit, Swipe right to select next habit...",
      //   [
      //     {
      //       text: "OK",
      //     },
      //   ],
      //   { cancelable: false }
      // );
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", error.message);
    }
  };
};

const startHabit = (dispatch) => {
  return (habitId, selected, time) => {
    try {
      const userId = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref(`HabitTracker/${userId}/` + habitId)
        .update({
          time: time,
          select: selected,
        });
      dispatch({ type: "loader", payload: false });
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", error.message);
    }
  };
};

export const { Context, Provider } = createDataContext(
  HabitReducer,
  { getHabit, startHabit, updateHabit, setLock, getReward, clearReward },
  { habits: [], loading: false, deleted: false, reward: 0 }
);

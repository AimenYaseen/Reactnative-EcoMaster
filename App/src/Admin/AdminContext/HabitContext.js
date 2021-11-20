import createDataContext from "../../context/createDataContext";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { navigate } from "../../Navigation/NavigationRef";

const HabitReducer = (state, action) => {
  switch (action.type) {
    case "habits":
      return { ...state, habits: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    case "delete":
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

const addHabit = (dispatch) => {
  return async (
    habitSteps,
    habitTitle,
    habitDescription,
    habitDuration,
    habitImage,
    time
  ) => {
    if (habitSteps && habitTitle && habitDescription && habitDuration) {
      dispatch({ type: "loader", payload: true });
      await Firebase.database()
        .ref("Habits/" + time)
        .set({
          habitId: time,
          title: habitTitle,
          steps: habitSteps,
          description: habitDescription,
          duration: habitDuration,
          image: habitImage,
        })
        .then(() => {
          //loader
          dispatch({ type: "loader", payload: false });
          Alert.alert(
            "Habit Uploaded!",
            "Your Habit has successfully Uploaded",
            [
              {
                text: "OK",
                onPress: () => navigate("AdminHabit"),
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

const getHabit = (dispatch) => {
  return async () => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Habits/")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { habitId, title, steps, description, duration, image } =
              element.val();
            //pushValues of Object
            newsArr.push({
              id: habitId,
              title,
              steps,
              description,
              duration,
              image,
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

const editHabit = (dispatch) => {
  return async (
    id,
    habitCategory,
    habitTitle,
    habitDescription,
    habitDuration,
    habitImage
  ) => {
    if (habitCategory && habitTitle && habitDescription && habitDuration) {
      dispatch({ type: "loader", payload: true });
      try {
        await Firebase.database()
          .ref("Habits/" + id)
          .update({
            title: habitTitle,
            category: habitCategory,
            description: habitDescription,
            duration: habitDuration,
            image: habitImage,
          });
        dispatch({ type: "loader", payload: false });
        Alert.alert(
          "UPDATED!",
          "Congratulations, Your data has updated...",
          [
            {
              text: "OK",
              onPress: () => navigate("AdminHabit"),
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

const deleteHabit = (dispatch) => {
  return (habitId) => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("Habits/" + habitId)
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
                .ref("Habits/" + habitId)
                .remove()
                .then(() => {
                  dispatch({ type: "loader", payload: false });
                  dispatch({ type: "delete", payload: true });
                  Alert.alert(
                    "Custom Habit Deleted!",
                    "Your Custom Habit has been deleted successfully!"
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
  HabitReducer,
  { addHabit, getHabit, editHabit, deleteHabit },
  { habits: [], loading: false, deleted: false }
);

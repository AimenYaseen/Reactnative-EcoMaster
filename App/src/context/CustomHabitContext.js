import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { navigate } from "../Navigation/NavigationRef";

const CustomReducer = (state, action) => {
  switch (action.type) {
    case "customHabit":
      return { ...state, customHabit: action.payload };
    case "loader":
      return { ...state, loading: action.payload };
    case "delete":
      return { ...state, deleted: action.payload };
    default:
      return state;
  }
};

const addCustom = (dispatch) => {
  return async (
    customTitle,
    customDescription,
    customDuration,
    customImage,
    time
  ) => {
    dispatch({ type: "delete", payload: false });
    if (customTitle && customDescription && customDuration) {
      if (customDuration > 1) {
        dispatch({ type: "loader", payload: true });
        const uid = await AsyncStorage.getItem("user");
        Firebase.database()
          .ref("UserHabits/")
          .orderByKey()
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              let pending = false;
              snapshot.forEach((element) => {
                // console.log(element.val());
                const { customId, userId, completed } = element.val();
                // Checking
                if (userId == uid) {
                  if (completed == false) {
                    pending = true;
                  }
                }
              });
              if (pending) {
                dispatch({ type: "loader", payload: false });
                Alert.alert(
                  "ERROR",
                  "You already Have an incomplete Habit, Please complete that first to create another...",
                  [
                    {
                      text: "OK",
                      onPress: () =>
                        navigate("Custom", { screen: "CreateHabit" }),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                Firebase.database()
                  .ref("UserHabits/" + time)
                  .set({
                    customId: time,
                    userId: uid,
                    title: customTitle,
                    description: customDescription,
                    duration: customDuration,
                    time: Date.now(),
                    image: customImage,
                    completed: false,
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
                          onPress: () =>
                            navigate("Custom", { screen: "CreateHabit" }),
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
            }
          });
      } else {
        Alert.alert("ERROR!", " Duration must be greater than 1");
      }
    } else {
      Alert.alert("ERROR!", " Please Enter All the fields...");
    }
  };
};

const getCustom = (dispatch) => {
  return async () => {
    dispatch({ type: "delete", payload: false });
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("UserHabits/")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const {
              customId,
              userId,
              title,
              description,
              duration,
              image,
              time,
            } = element.val();
            //pushValues of Object
            newsArr.push({
              id: customId,
              userId,
              title,
              description,
              duration,
              image,
              time,
            });
          });
          dispatch({ type: "customHabit", payload: newsArr });
        } else {
          dispatch({ type: "customHabit", payload: [] });
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

const editCustom = (dispatch) => {
  return async (
    id,
    customTitle,
    customDescription,
    customDuration,
    customImage
  ) => {
    dispatch({ type: "delete", payload: false });
    if (customTitle && customDescription && customDuration) {
      if (customDuration > 1) {
        dispatch({ type: "loader", payload: true });
        try {
          await Firebase.database()
            .ref("UserHabits/" + id)
            .update({
              title: customTitle,
              description: customDescription,
              duration: customDuration,
              image: customImage,
            });
          dispatch({ type: "loader", payload: false });
          Alert.alert(
            "UPDATED!",
            "Congratulations, Your data has updated...",
            [
              {
                text: "OK",
                onPress: () => navigate("Custom", { screen: "CreateHabit" }),
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
        Alert.alert("ERROR!", " Duration must be greater than 1");
      }
    } else {
      Alert.alert("ERROR!", " Please Enter All the fields...");
    }
  };
};

const deleteCustom = (dispatch) => {
  return (customId) => {
    dispatch({ type: "loader", payload: true });
    Firebase.database()
      .ref("UserHabits/" + customId)
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
                .ref("UserHabits/" + customId)
                .remove()
                .then(() => {
                  dispatch({ type: "loader", payload: false });
                  Alert.alert(
                    "Custom Habit Deleted!",
                    "Your Custom Habit has been deleted successfully!",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          dispatch({ type: "delete", payload: true }),
                      },
                    ],
                    { cancelable: false }
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

const updateCustom = (dispatch) => {
  return (habitId, completed) => {
    try {
      const userId = Firebase.auth().currentUser.uid;
      Firebase.database()
        .ref("UserHabits/" + habitId)
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

export const { Context, Provider } = createDataContext(
  CustomReducer,
  { addCustom, getCustom, editCustom, deleteCustom, updateCustom },
  { customHabit: [], loading: false, deleted: false }
);

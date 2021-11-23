import createDataContext from "../../context/createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../../Firebase/config";
import { navigate } from "../../Navigation/NavigationRef";

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
    customCategory,
    customTitle,
    customDescription,
    customDuration,
    customImage,
    time
  ) => {
    dispatch({ type: "delete", payload: false });
    if (customCategory && customTitle && customDescription && customDuration) {
      if (customDuration > 1) {
        dispatch({ type: "loader", payload: true });
        await Firebase.database()
          .ref("CustomHabits/" + time)
          .set({
            customId: time,
            title: customTitle,
            category: customCategory,
            description: customDescription,
            duration: customDuration,
            image: customImage,
          })
          .then(() => {
            //loader
            dispatch({ type: "loader", payload: false });
            Alert.alert(
              "Custom Habit Uploaded!",
              "Your Habit has successfully Uploaded",
              [
                {
                  text: "OK",
                  onPress: () => navigate("AdminCustom"),
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
      .ref("CustomHabits/")
      .orderByKey()
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "loader", payload: false });
          const newsArr = [];
          snapshot.forEach((element) => {
            const { customId, title, category, description, duration, image } =
              element.val();
            //pushValues of Object
            newsArr.push({
              id: customId,
              title,
              category,
              description,
              duration,
              image,
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
    customCategory,
    customTitle,
    customDescription,
    customDuration,
    customImage
  ) => {
    dispatch({ type: "delete", payload: false });
    if (customCategory && customTitle && customDescription && customDuration) {
      if (customDuration > 1) {
        dispatch({ type: "loader", payload: true });
        try {
          await Firebase.database()
            .ref("CustomHabits/" + id)
            .update({
              title: customTitle,
              category: customCategory,
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
                onPress: () => navigate("AdminCustom"),
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
      .ref("CustomHabits/" + customId)
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
                .ref("CustomHabits/" + customId)
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

export const { Context, Provider } = createDataContext(
  CustomReducer,
  { addCustom, getCustom, editCustom, deleteCustom },
  { customHabit: [], loading: false, deleted: false }
);

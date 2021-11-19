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
          "Your Habit has successfully Uploaded"
        );
        navigate("AdminCustom");
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      });
  };
};

const getCustom = (dispatch) => {
  return async () => {
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
      Alert.alert("UPDATED!", "Congratulations, Your data has updated...");
    } catch (error) {
      //loader
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR!", error.message);
    }
    navigate("AdminCustom");
  };
};

const deleteCustom = (dispatch) => {
  return (customId, title) => {
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
                .ref("CustomHabits/" + newsId)
                .remove()
                .then(() => {
                  Alert.alert(
                    "Custom Habit Deleted!",
                    "Your Custom Habit has been deleted successfully!"
                  );
                  dispatch({ type: "delete", payload: true });
                  dispatch({ type: "loader", payload: false });
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

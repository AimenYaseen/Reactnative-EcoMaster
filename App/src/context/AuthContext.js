import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Firebase } from "../Firebase/config";
import { replace } from "../Navigation/NavigationRef";

const AuthReducer = (state, action) => {
  switch (action.type) {
    // case "show_error":
    //   return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, user: action.payload };
    case "signout":
      return { ...state, user: {} };
    case "loader":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const automaticSignin = (dispatch) => {
  return async () => {
    const user = await AsyncStorage.getItem("user");
    const admin = await AsyncStorage.getItem("admin");

    if (user) {
      Firebase.auth().onAuthStateChanged((userPresent) => {
        if (userPresent) {
          if (userPresent.emailVerified) {
            replace("AppFlow");
          }
        }
      });
    } else if (admin) {
      replace("Admin", { screen: "AdminFlow" });
    } else {
      replace("AuthFlow", { screen: "Welcome" });
    }
  };
};

const verifyEmail = (dispatch) => {
  return async ({ email, password, firstName, lastName }) => {
    //Verification
    if (password === "" || email === "") {
      Alert.alert("ERROR!", "Email or Password can't be Empty");
    } else {
      if (firstName === "" || lastName === "") {
        Alert.alert("ERROR!", "FirstName or LastName can't be Empty");
      } else {
        //loader
        dispatch({ type: "loader", payload: true });
        // USER SIGNUP
        await Firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            try {
              await user.sendEmailVerification().then(async () => {
                dispatch({ type: "loader", payload: false });
                Alert.alert(
                  "Email Verification!",
                  `Verification Link Has been sent to ${email}...`
                );
              });
            } catch (error) {
              dispatch({ type: "loader", payload: false });
              Alert.alert("ERROR!", error.message);
            }
          })
          .catch((error) => {
            //loader
            dispatch({ type: "loader", payload: false });
            Alert.alert("ERROR!", error.message);
          });
      }
    }
  };
};

const signup = (dispatch) => {
  return async ({ email, password, firstName, lastName }) => {
    //Verification
    if (password === "" || email === "") {
      Alert.alert("ERROR!", "Email or Password can't be Empty");
    } else {
      if (firstName === "" || lastName === "") {
        Alert.alert("ERROR!", "FirstName or LastName can't be Empty");
      } else {
        dispatch({ type: "loader", payload: true });
        await Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            //loader
            const user = userCredentials.user;
            if (user.emailVerified) {
              //loader
              dispatch({ type: "loader", payload: true });
              // USER REFERENCE IN REALTIME DATABASE
              await Firebase.database()
                .ref("Users/" + user.uid)
                .set({
                  userId: user.uid,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  bio: "",
                  country: "",
                  image: "",
                })
                .then(async () => {
                  //loader
                  // dispatch({ type: "loader", payload: false });
                  await AsyncStorage.setItem("user", user.uid);
                  await AsyncStorage.setItem("password", password);

                  //creating its seperate habit module
                  await Firebase.database()
                    .ref("Habits/")
                    .orderByKey()
                    .once("value", (snapshot) => {
                      if (snapshot.exists()) {
                        dispatch({ type: "loader", payload: false });
                        // console.log(snapshot.val())
                        snapshot.forEach((element) => {
                          console.log(element.val());
                          const { habitId } = element.val();
                          console.log(habitId);
                          //pushValues of Object
                          Firebase.database()
                            .ref(`HabitTracker/${user.uid}/` + habitId)
                            .set({
                              habitId: habitId,
                              time: "",
                              completed: false,
                              select: false,
                            });
                        });
                      }
                    })
                    .catch((error) => {
                      dispatch({ type: "loader", payload: false });
                      console.error(error);
                    });
                });
              dispatch({ type: "signin", payload: user });
              replace("AppFlow");
            } else {
              dispatch({ type: "loader", payload: false });
              Alert.alert(
                "Email Verification ERROR!",
                "Please Verify Your Email First using the above link..."
              );
            }
          })
          .catch((error) => {
            //loader
            dispatch({ type: "loader", payload: false });
            Alert.alert(
              "Email Verification ERROR!",
              "Please Verify Your Email First using the above link..."
            );
          });
      }
    }
  };
};
const signin = (dispatch) => {
  return async ({ email, password }) => {
    //loader
    dispatch({ type: "loader", payload: true });
    await Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredentials) => {
        //loader
        dispatch({ type: "loader", payload: false });
        const user = userCredentials.user;
        await AsyncStorage.setItem("user", user.uid);
        await AsyncStorage.setItem("password", password);
        dispatch({ type: "signin", payload: user });
        replace("AppFlow");
      })
      .catch((error) => {
        //loader
        dispatch({ type: "loader", payload: false });
        Alert.alert("ERROR!", error.message);
      });
  };
};

const forgotPassword = (dispatch) => {
  return async ({ email }) => {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Reset Password",
          `An Email has been sent to ${email}, Follow the link to reset your password`
        );
      })
      .catch((error) => {
        Alert.alert("ERROR!", error.message);
      });
  };
};

const signout = (dispatch) => {
  return async () => {
    await Firebase.auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("password");
        dispatch({ type: "signout" });
        replace("AuthFlow");
      })
      .catch((error) => Alert.alert("ERROR!", error.message));
  };
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signin, signup, signout, automaticSignin, verifyEmail, forgotPassword },
  { user: {}, loading: false }
);

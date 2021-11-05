import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Context as AuthContext } from "../../context/AuthContext";
import { GradientButton } from "../../components/GradientButton";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const home = () => navigation.replace("AppFlow");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.replace("AppFlow");
  //     }
  //   });
  //   return unsubscribe();
  // }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        hidden={false}
      />
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../../assets/images/selfprint2.jpeg")}
        >
          <Text style={styles.headerText}>Create Account</Text>
          <View style={styles.input}>
            <SimpleInput
              label="Email"
              placeholder="abc@example.com"
              onChangeText={(text) => setEmail(text)}
            />
            <IconInput
              label="Password"
              placeholder="password"
              name="eye"
              type="entypo"
              onChangeText={(text) => setPassword(text)}
            />
            <SimpleInput
              label="First Name"
              placeholder="first name"
              onChangeText={(text) => setFirstname(text)}
            />
            <SimpleInput
              label="Last Name"
              placeholder="last name"
              onChangeText={(text) => setLastname(text)}
            />
          </View>
          <View style={{ marginHorizontal: screenWidth * 0.04 }}>
            <GradientButton
              text="Sign Up"
              onPress={() =>
                signup({ email, password, firstName, lastName, home })
              }
            />
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.text}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.white,
  },
  background: {
    //paddingTop: screenHeight * 0.15,
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
  headerText: {
    textAlign: "center",
    // marginHorizontal: screenWidth * 0.02,
    marginBottom: screenHeight * 0.08,
    fontSize: 45,
    fontWeight: "bold",
    color: colors.green,
  },
  text: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
  input: {
    marginHorizontal: screenWidth * 0.02,
  },
});

export default SignUpScreen;

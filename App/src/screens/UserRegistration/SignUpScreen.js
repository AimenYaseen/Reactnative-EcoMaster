import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";

import { Context as AuthContext } from "../../context/AuthContext";
import { GradientButton } from "../../components/GradientButton";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpScreen = ({ navigation }) => {
  const { state, signup, verifyEmail } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

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
            <TouchableOpacity
              onPress={() =>
                verifyEmail({ email, password, firstName, lastName })
              }
            >
              <Text style={[styles.text, { marginBottom: 20, marginTop: -3 }]}>
                First Verify Your Email then Sign Up...
              </Text>
            </TouchableOpacity>
            <GradientButton
              text="Sign Up"
              onPress={() => signup({ email, password, firstName, lastName })}
            />
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.text}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Spinner
          visible={state.loading}
          color={colors.secondary}
          animation="fade"
          overlayColor={"rgba(0,0,0, 0.50)"}
          textContent={"Loading..."}
          textStyle={{
            fontSize: 18,
            // marginTop: -130,
            marginLeft: 15,
            //  textAlign: "center",
            color: colors.secondary,
          }}
        />
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
    marginBottom: screenHeight * 0.07,
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

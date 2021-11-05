import React, { useState, useContext } from "react";
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

const SignInScreen = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const home = () => navigation.replace("AppFlow");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");

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
          source={require("../../assets/images/blur.jpeg")}
        >
          <Text style={styles.headerText}>Welcome Back!</Text>
          <View style={styles.input}>
            <SimpleInput
              label="Email"
              value={email}
              placeholder="abc@example.com"
              onChangeText={(text) => setEmail(text)}
            />
            <IconInput
              label="Password"
              placeholder="password"
              value={password}
              name="eye"
              type="entypo"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{ marginHorizontal: screenWidth * 0.04 }}>
            <GradientButton
              text="Sign In"
              onPress={() => signin({ email, password, home })}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
              <Text style={styles.text}>Forgot your Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={styles.text}>New Here? </Text>
                <Text style={[styles.text, { color: colors.secondary }]}>
                  Signup
                </Text>
              </View>
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
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
  headerText: {
    textAlign: "center",
    margin: 30,
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

export default SignInScreen;

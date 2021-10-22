import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { GradientButton } from "../../components/GradientButton";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <View style={styles.input}>
          <SimpleInput
            label="Email"
            placeholder="abc@example.com"
            onChangeText={(text) => setEmail(text)}
          />
          <IconInput
            label="Password"
            value={password}
            name="eye"
            type="entypo"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ marginHorizontal: screenWidth * 0.04 }}>
          <GradientButton
            text="Sign In"
            onPress={() => navigation.navigate("MainFlow")}
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
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
    // paddingTop: screenHeight * 0.2,
    backgroundColor: colors.white,
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
  },
  input: {
    marginHorizontal: screenWidth * 0.02,
  },
});

export default SignInScreen;

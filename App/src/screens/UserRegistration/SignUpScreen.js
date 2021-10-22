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

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const [username, setUsername] = useState("");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.headerText}>Create Account</Text>
        <View style={styles.input}>
          <SimpleInput
            label="Username"
            placeholder="Abc"
            onChangeText={(text) => setUsername(text)}
          />
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
            text="Sign Up"
            onPress={() => navigation.navigate("MainFlow")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.text}>Already have an account?</Text>
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
    margin: 20,
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

export default SignUpScreen;

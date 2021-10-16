import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GradientButton } from "../../components/GradientButton";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignInScreen = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.secondary} />
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign In</Text>
        <View style={styles.input}>
          <Input
            label="Email"
            labelStyle={{ color: colors.black }}
            placeholder="abc@example.com"
            placeholderTextColor={colors.gray}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Input
            secureTextEntry
            label="Password"
            labelStyle={{ color: colors.black }}
            value="password"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
            rightIcon={
              <Icon
                name="eye"
                type="entypo"
                color={colors.gray}
                size={15}
                onPress={() => (secure ? setSecure(false) : setSecure(true))}
              />
            }
          />
        </View>
        <View style={{ marginHorizontal: screenWidth * 0.04 }}>
          <GradientButton
            text="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
            <Text style={styles.text}>Forgot your Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.text}>Don't have an Account?</Text>
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
    backgroundColor: colors.lightBlue,
  },
  headerText: {
    //textAlign: "center",
    margin: 15,
    fontSize: 50,
    fontWeight: "bold",
    color: colors.secondary2,
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

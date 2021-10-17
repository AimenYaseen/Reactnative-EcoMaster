import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { GradientButton } from "../../components/GradientButton";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUpScreen = ({ navigation }) => {
  const [secure, setSecure] = useState(true);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="always"
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.secondary} />
      <View style={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
        <View style={styles.input}>
          <Input
            label="Username"
            labelStyle={{ color: colors.black }}
            placeholder="Abc"
            placeholderTextColor={colors.gray}
            autoCorrect={false}
            autoComplete="off"
          />
          <Input
            label="Email"
            labelStyle={{ color: colors.black }}
            placeholder="abc@example.com"
            placeholderTextColor={colors.gray}
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
          />
          <Input
            secureTextEntry={secure ? true : false}
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
            text="Sign Up"
            onPress={() => navigation.navigate("MainFlow")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.text}>Already have an Account?</Text>
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

export default SignUpScreen;

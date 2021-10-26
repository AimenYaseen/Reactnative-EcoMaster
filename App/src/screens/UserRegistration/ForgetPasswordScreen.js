import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import {
  SimpleInput,
  IconInput,
  LeftIconInput,
} from "../../components/CustomInput";
import { SolidButton } from "../../components/GradientButton";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ForgetPasswordScreen = ({ navigation }) => {
  const [pVisible, setPVisible] = useState(false);

  return (
    <>
      <CustomHead
        text="Forgot Password"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.pop()}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <View style={styles.container}>
        <Text style={styles.text}> Reset Password </Text>
        <Text style={styles.labelText}>
          Enter the email address associated with your account
        </Text>
        <LeftIconInput
          label={null}
          placeholder="abc@example.com"
          onChangeText={(text) => setFirstname(text)}
          name="email"
          type="material-icons"
        />
        <SolidButton text="Continue" onPress={() => ResetP} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
    marginVertical: 50,
  },
  labelText: {
    fontSize: 16,
    color: "gray",
    marginHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.01,
    // textAlign: "center",
  },
});

export default ForgetPasswordScreen;

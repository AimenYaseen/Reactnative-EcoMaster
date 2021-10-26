import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import { LeftIconInput } from "../../components/CustomInput";
import {
  ConfirmationOverlay,
  PasswordOverlay,
} from "../../components/CustomOverlay";
import { SolidButton } from "../../components/GradientButton";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newP, setNewP] = useState("");
  const [confirmP, setConfirmP] = useState("");

  const [pVisible, setPVisible] = useState(false);

  return (
    <>
      <CustomHead
        text="Reset Password"
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
      <ImageBackground
        style={styles.background}
        source={require("../../assets/images/leaves.jpeg")}
      >
        <View style={styles.container}>
          <Text style={styles.labelText}>
            Enter the email address associated with your account
          </Text>
          <LeftIconInput
            label={null}
            placeholder="abc@example.com"
            onChangeText={(text) => setEmail(text)}
            name="email"
            type="material-icons"
          />
          <SolidButton text="Continue" onPress={() => setPVisible(true)} />
          <PasswordOverlay
            visible={pVisible}
            onBackdropPress={() => setPVisible(false)}
            text="Reset Password"
            onPress={() => setPVisible(false)}
            onChangeText1={(text) => setNewP(text)}
            label2="Confirm Password"
            onChangeText2={(text) => setConfirmP(text)}
            label1="New Password"
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: screenHeight * 0.3,
    flex: 1,
    alignItems: "center",
  },
  background: {
    //paddingTop: screenHeight * 0.15,
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
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

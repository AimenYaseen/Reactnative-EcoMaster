import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Overlay } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";

import colors from "../constants/colors";
import { OverlayInput } from "./CustomInput";
import { GradientButton } from "./GradientButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const PasswordOverlay = ({ visible, onBackdropPress }) => {
  const [current, setCurrent] = useState("");
  const [newP, setNewP] = useState("");

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{
        borderRadius: 20,
        height: screenHeight * 0.45,
        width: screenWidth * 0.89,
        padding: null,
      }}
    >
      <View style={styles.Pcontainer}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 25,
            color: colors.secondary,
          }}
        >
          Change Password
        </Text>
        <OverlayInput
          label="Current"
          onChangeText={(text) => setCurrent(text)}
        />
        <OverlayInput label="New" onChangeText={(text) => setNewP(text)} />
        <View style={styles.button}>
          <GradientButton
            text="Save"
            onPress={() => navigation.navigate("AuthFlow")}
          />
        </View>
      </View>
    </Overlay>
  );
};

export const ConfirmationOverlay = ({
  msg,
  visible,
  onBackdropPress,
  onPress,
  onPressCancel,
}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{
        borderRadius: 20,
        height: screenHeight * 0.2,
        width: screenWidth * 0.7,
        justifyContent: "center",
        alignItems: "center",
        padding: null,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{msg}</Text>
      <View
        style={{
          flexDirection: "row",
          //borderWidth: 1,
          width: screenWidth * 0.5,
          justifyContent: "space-around",
          padding: 10,
          marginTop: 5,
        }}
      >
        <Icon
          name="cancel"
          type="material-icons"
          size={35}
          onPress={onPressCancel}
          color={colors.secondary}
        />
        <Icon
          name="check-circle"
          type="material-icons"
          size={35}
          onPress={onPress}
          color={colors.secondary}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  Pcontainer: {
    backgroundColor: "white",
    borderColor: colors.secondary,
    borderWidth: 2,
    alignItems: "center",
    height: screenHeight * 0.45,
    width: screenWidth * 0.89,
    borderRadius: 20,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
  button: {
    // borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    height: screenWidth * 0.17,
    width: screenWidth * 0.4,
  },
});

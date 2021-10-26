import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions, View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

export const GradientButton = ({ text, onPress }) => {
  const startColor = colors.primary;
  const endColor = colors.secondary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.1, 0.9]}
        colors={[startColor, endColor]}
        style={[styles.buttonG, styles.shadow]}
      >
        <Text style={styles.buttonTextG}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const SolidButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonS, styles.shadow]} onPress={onPress}>
      <Text style={styles.buttonTextS}>{text}</Text>
    </TouchableOpacity>
  );
};

export const OutlineButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={[styles.buttonO, styles.shadow]} onPress={onPress}>
      <Text style={styles.buttonTextO}>{text}</Text>
    </TouchableOpacity>
  );
};

export const BlockButton = ({ text, subText, iconName, type, onPress }) => {
  return (
    <TouchableOpacity style={styles.block} onPress={onPress}>
      <Icon
        reverse
        raised
        name={iconName}
        type={type}
        color={colors.secondary}
        size={20}
      />
      <Text h5 style={styles.buttonTextB}>
        {text}
      </Text>
      <Text style={styles.buttonTextSub}>{subText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonG: {
    padding: 10,
    alignItems: "center",
    borderRadius: 35,
  },
  buttonTextG: {
    backgroundColor: "transparent",
    fontSize: 19,
    color: "#fff",
  },
  buttonS: {
    //marginTop: 250,
    padding: 10,
    alignSelf: "center",
    height: 50,
    width: screenWidth - 200,
    marginHorizontal: screenWidth * 0.02,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonTextS: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  buttonO: {
    //marginTop: 10,
    alignSelf: "center",
    height: 45,
    width: screenWidth - 50,
    //marginHorizontal: screenWidth * 0.02,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  buttonTextO: {
    color: colors.secondary,
    fontSize: 19,
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
  block: {
    alignItems: "center",
    justifyContent: "center",
    height: screenWidth * 0.35,
    width: screenWidth * 0.45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "transparent",
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // shadowOpacity: 0.75,
    // shadowRadius: 3.5,
    elevation: 10,
  },
  buttonTextB: {
    fontWeight: "700",
  },
  buttonTextSub: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.gray,
  },
});

import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

export const GradientButton = ({ text, onPress }) => {
  const startColor = colors.primary;
  const endColor = colors.secondary;

  return (
    <TouchableOpacity onPress={onPress}>
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

const styles = StyleSheet.create({
  buttonG: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonTextG: {
    backgroundColor: "transparent",
    fontSize: 19,
    color: "#fff",
  },
  buttonS: {
    marginTop: 250,
    alignSelf: "center",
    height: 51,
    width: screenWidth - 30,
    marginHorizontal: screenWidth * 0.02,
    backgroundColor: "#B1D953",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
  },
  buttonTextS: {
    color: "#FFFFFF",
    fontSize: 19,
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
    borderRadius: 5,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  buttonTextO: {
    color: colors.secondary,
    fontSize: 19,
  },
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

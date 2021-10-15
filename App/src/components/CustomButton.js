import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Image, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../constants/colors";

export const SimpleButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ButtonWithImage = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("")}
        style={styles.buttonIcon}
        resizeMode="contain"
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

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
        style={styles.buttonG}
      >
        <Text style={styles.textG}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  buttonG: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  textG: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      try {
        navigate("AuthFlow");
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }, 3000);
  }, []);

  const startColor = colors.primary;
  const endColor = colors.secondary;

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={([styles.container], { paddingTop: insets.top })}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/colorful.jpeg")}
          style={styles.image}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
});

import React, { useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-elements";

import colors from "../constants/colors";
import { Context as AuthContext } from "../context/AuthContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default SplashScreen = ({ navigation }) => {
  const { automaticSignin } = useContext(AuthContext);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      try {
        automaticSignin();
      } catch (error) {
        Alert.alert("Something went wrong", error);
      }
    }, 3000);
  }, [navigation]);

  const startColor = colors.freshGreen;
  const endColor = colors.secondary;

  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" hidden />
      <View
        style={{
          width: screenWidth,
          // borderWidth: 5,
          borderColor: "black",
          alignItems: "center",
          // marginBottom: 50,
          padding: 30,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />
        <View style={styles.headView}>
          <Text h1 style={styles.header}>
            Eco Master
          </Text>
          <Text style={styles.subHead}>Enjoy the Experience</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: screenWidth * 0.75,
    width: screenWidth * 0.82,
  },
  header: {
    // marginTop: -5,
    textAlign: "center",
    color: colors.white,
    marginLeft: 10,
  },
  subHead: {
    textAlign: "center",
    color: colors.whiteSmoke,
    fontSize: 14,
    fontStyle: "italic",
  },
  headView: {
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});

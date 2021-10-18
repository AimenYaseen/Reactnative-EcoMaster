import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import { Spacer } from "../components/Spacer";
import { GradientButton, OutlineButton } from "../components/GradientButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightBlue} />
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/Ganna.jpeg")}
      >
        <View style={styles.headView}>
          <Text h2 style={styles.header}>
            Eco Master
          </Text>
          <Text style={styles.subHead}>Enjoy the Experience</Text>
        </View>
        <View style={styles.button}>
          <Spacer>
            <GradientButton
              text="Sign In"
              onPress={() => navigation.navigate("SignIn")}
            />
          </Spacer>
          <Spacer>
            <OutlineButton
              text="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </Spacer>
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <Text style={styles.text}>Terms of Services</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: colors.lightBlue,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  header: {
    textAlign: "center",
    paddingTop: 80,
    color: colors.secondary,
  },
  subHead: {
    textAlign: "center",
    color: colors.gray,
    fontSize: 16,
  },
  headView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
  },
  text: {
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 13,
    color: colors.gray2,
  },
});

export default WelcomeScreen;

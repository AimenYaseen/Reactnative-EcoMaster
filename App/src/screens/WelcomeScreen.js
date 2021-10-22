import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { Text } from "react-native-elements";

import colors from "../constants/colors";
import { Spacer } from "../components/Spacer";
import { GradientButton, OutlineButton } from "../components/GradientButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.headView}>
        <Text h2 style={styles.header}>
          Eco Master
        </Text>
        <Text style={styles.subHead}>Enjoy the Experience</Text>
      </View>
      <View>
        <Image
          style={{
            height: screenWidth * 1,
            width: screenWidth * 1,
            marginBottom: screenHeight * 0.07,
          }}
          source={require("../assets/images/logo.png")}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  header: {
    textAlign: "center",
    paddingTop: screenHeight * 0.07,
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
    paddingBottom: screenHeight * 0.03,
  },
  text: {
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 13,
    color: colors.gray2,
  },
});

export default WelcomeScreen;

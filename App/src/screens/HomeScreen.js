import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardSpacer } from "../components/KeyboardSpacer";
import colors from "../constants/colors";
import { BlockButton } from "../components/GradientButton";

const HomeScreen = ({ navigation }) => {
  const [scrollable, setScrollable] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/background.jpeg")}
      >
        <View style={styles.subContainer}>
          <BlockButton
            type="font-awesome-5"
            iconName="tasks"
            text="Habit Tracker"
            // subText="start your journey"
            onPress={() => navigation.navigate("Habit")}
          />
          <BlockButton
            type="material-icons"
            iconName="dashboard-customize"
            text="Custom Habit"
            // subText="subText"
            onPress={() => navigation.navigate("Custom")}
          />
        </View>
        <View style={styles.subContainer}>
          <BlockButton
            type="font-awesome"
            iconName="user"
            text="My Profile"
            // subText="subText"
          />
          <BlockButton
            type="font-awesome"
            iconName="group"
            text="Community"
            // subText="subText"
          />
        </View>

        <KeyboardSpacer
          Toggle={(isKeyboardVisible) => setScrollable(isKeyboardVisible)}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //justifyContent: "center",
    // alignItems: "center",
  },
  background: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default HomeScreen;

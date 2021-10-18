import React, { useState } from "react";
import { View, ScrollView, StatusBar, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardSpacer } from "../components/KeyboardSpacer";
import colors from "../constants/colors";
import { BlockButton } from "../components/GradientButton";

const HomeScreen = ({ navigation }) => {
  const [scrollable, setScrollable] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.subContainer}>
            <BlockButton
              type="font-awesome-5"
              iconName="tasks"
              text="Habit Tracker"
              subText="start your journey"
              onPress={() => navigation.navigate("Habit")}
            />
            <BlockButton
              type="material-icons"
              iconName="dashboard-customize"
              text="Custom Habit"
              subText="subText"
            />
          </View>
          <View style={styles.subContainer}>
            <BlockButton
              type="font-awesome"
              iconName="user"
              text="My Profile"
              subText="subText"
            />
            <BlockButton
              type="font-awesome-5"
              iconName="tasks"
              text="text"
              subText="subText"
            />
          </View>
          <View style={styles.subContainer}>
            <BlockButton
              type="font-awesome-5"
              iconName="tasks"
              text="text"
              subText="subText"
            />
            <BlockButton
              type="font-awesome-5"
              iconName="tasks"
              text="text"
              subText="subText"
            />
          </View>
          <KeyboardSpacer
            Toggle={(isKeyboardVisible) => setScrollable(isKeyboardVisible)}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default HomeScreen;

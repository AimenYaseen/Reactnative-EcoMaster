import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { LeftHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const HabitTrackerScreen = ({ navigation }) => {
  return (
    <View>
      <LeftHead
        text="Habit Tracker"
        color={colors.secondary}
        iconColor={colors.white}
        icon="arrow-back-ios"
        onPress={() => navigation.navigate("MainFlow")}
      />
      <Text>HabitTrackerScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HabitTrackerScreen;

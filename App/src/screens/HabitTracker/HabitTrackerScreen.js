import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const HabitTrackerScreen = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Habit Tracker"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="md-caret-back"
            type="ionicon"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <Text>HabitTrackerScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HabitTrackerScreen;

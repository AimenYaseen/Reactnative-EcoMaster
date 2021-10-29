import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import { HabitCard } from "../../components/CustomCard";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const HabitTrackerScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHead
        text="Habit Tracker"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: screenHeight }}
      >
        <HabitCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HabitTrackerScreen;

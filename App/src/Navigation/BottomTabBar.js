import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, View, Text } from "react-native";

import HabitTrackerScreen from "../screens/HabitTrackerScreen";
import EcoMap from "../screens/EcoMap";
import colors from "../constants/colors";
import { TabBarButton } from "../components/GradientButton";

const HabitTab = createMaterialBottomTabNavigator();
export const HabitTabScreen = () => {
  return (
    <HabitTab.Navigator
      barStyle={{
        backgroundColor: colors.secondary,
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 15,
        height: 80,
        justifyContent: "center",
        ...styles.shadow,
      }}
      activeColor={colors.white}
      inactiveColor={colors.gray}
      // labeled={false}
    >
      <HabitTab.Screen
        name="EcoMap"
        component={EcoMap}
        options={{
          tabBarLabel: "EcoMap",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? colors.white : colors.gray}
              size={26}
            />
          ),
        }}
      />
      <HabitTab.Screen
        name="HabitTracker"
        component={HabitTrackerScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 12 }}>HabitTracker</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? colors.white : colors.gray}
              size={26}
            />
          ),
        }}
      />
    </HabitTab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

import HabitTrackerScreen from "../screens/HabitTracker/HabitTrackerScreen";
import EcoMap from "../screens/HabitTracker/EcoMap";
import ActivityScreen from "../screens/CustomHabit/ActivityScreen";
import SuggestionsScreen from "../screens/CustomHabit/SugessionsScreen";
import CreateHabitScreen from "../screens/CustomHabit/CreateHabitScreen";
import colors from "../constants/colors";

const HabitTab = createMaterialBottomTabNavigator();
export const HabitTabScreen = () => {
  return (
    <HabitTab.Navigator
      barStyle={{
        ...styles.bottomBar,
        ...styles.shadow,
      }}
      activeColor={colors.white}
      inactiveColor={colors.gray}
      shifting={true}
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

const CustomTab = createMaterialBottomTabNavigator();
export const CustomTabScreen = () => {
  return (
    <CustomTab.Navigator
      barStyle={{
        ...styles.bottomBar,
        ...styles.shadow,
      }}
      activeColor={colors.secondary}
      inactiveColor={colors.gray}
      shifting={true}
      // labeled={false}
    >
      <CustomTab.Screen
        name="Sugessions"
        component={SuggestionsScreen}
        options={{
          tabBarLabel: "Sugessions",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? colors.secondary : colors.gray}
              size={26}
            />
          ),
        }}
      />
      <CustomTab.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
        options={{
          shifting: false,
          tabBarLabel: null,
          tabBarIcon: ({ focused }) => (
            <Icon
              reverse
              raised
              name="home"
              type="material-community-icons"
              color={colors.secondary}
              size={30}
              containerStyle={{
                //  position: "absolute",
                top: -60,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
              }}
            />
          ),
        }}
      />
      <CustomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: <Text style={{ fontSize: 12 }}>Activity</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? colors.secondary : colors.gray}
              size={26}
            />
          ),
        }}
      />
    </CustomTab.Navigator>
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
  bottomBar: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
  },
});

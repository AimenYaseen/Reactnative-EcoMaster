import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { Image, StyleSheet, View, Text } from "react-native";
//import ViewOverflow from "react-native-view-overflow";
import { Icon } from "react-native-elements";

import { SuggestionTopTabScreen } from "./TopTabBar";
import HabitTrackerScreen from "../screens/HabitTracker/HabitTrackerScreen";
import EcoMap from "../screens/HabitTracker/EcoMap";
import ActivityScreen from "../screens/CustomHabit/ActivityScreen";
import CreateHabitScreen from "../screens/CustomHabit/CreateHabitScreen";
import colors from "../constants/colors";

const HabitTab = createMaterialBottomTabNavigator();
export const HabitTabScreen = () => {
  return (
    <HabitTab.Navigator
      // screenOptions={{ headerShown: false }}
      barStyle={{
        backgroundColor: colors.secondary,
        position: "absolute",
        bottom: 25,
        marginHorizontal: 20,
        borderRadius: 15,
        height: 60,
        elevation: 0,
        justifyContent: "center",
        paddingHorizontal: 5,
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
          tabBarLabel: <Text style={styles.label}>Eco Map</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="google-maps"
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
          tabBarLabel: <Text style={styles.label}>Habit Tracker</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-task"
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
      inactiveColor={colors.gray2}
      shifting={true}
      // labeled={false}
      initialRouteName="CreateHabit"
    >
      <CustomTab.Screen
        name="Sugessions"
        component={SuggestionTopTabScreen}
        options={{
          tabBarLabel: <Text style={styles.label}>Suggestions</Text>,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="auto-awesome-motion"
              color={focused ? colors.secondary : colors.gray2}
              size={26}
            />
          ),
        }}
      />
      <CustomTab.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              reverse
              raised
              name="plus"
              type="font-awesome-5"
              color={focused ? colors.secondary : colors.gray2}
              size={20}
              containerStyle={{
                // position: "absolute",
                top: -15,
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
          tabBarLabel: <Text style={styles.label}>Activity</Text>,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="activity"
              color={focused ? colors.secondary : colors.gray2}
              size={26}
            />
          ),
          headerShown: false,
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
    marginHorizontal: 25,
    elevation: 0,
    borderRadius: 15,
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

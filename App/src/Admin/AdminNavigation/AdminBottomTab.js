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

import { AdminSuggestionTopTabScreen } from "./AdminTopTab";
import AdminHabitTracker from "../AdminScreens/HabitTracker/AdminHabitTracker";
import AdminCreateHabit from "../AdminScreens/CustomHabit/AdminCreateHabit";
import AdminEcoMap from "../AdminScreens/HabitTracker/AdminEcoMap";

import colors from "../../constants/colors";

const AdminHabitTab = createMaterialBottomTabNavigator();
export const AdminHabitTabScreen = () => {
  return (
    <AdminHabitTab.Navigator
      // screenOptions={{ headerShown: false }}
      barStyle={{
        backgroundColor: colors.secondary,
        position: "absolute",
        //bottom: 3,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 55,
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
      <AdminHabitTab.Screen
        name="AdminEcoMap"
        component={AdminEcoMap}
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
      <AdminHabitTab.Screen
        name="AdminHabitTracker"
        component={AdminHabitTracker}
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
    </AdminHabitTab.Navigator>
  );
};

const AdminCustomTab = createMaterialBottomTabNavigator();
export const AdminCustomTabScreen = () => {
  return (
    <AdminCustomTab.Navigator
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
      <AdminCustomTab.Screen
        name="AdminSugessions"
        component={AdminSuggestionTopTabScreen}
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
      <AdminCustomTab.Screen
        name="AdminCreateHabit"
        component={AdminCreateHabit}
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
    </AdminCustomTab.Navigator>
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

import React, { Fragment } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import { Head, UpperBorder } from "../components/CustomHead";
import colors from "../constants/colors";
import FeedScreen from "../screens/FeedScreen";

const TopTab = createMaterialTopTabNavigator();
export const TopTabScreen = () => {
  return (
    <Fragment>
      <Head text="Eco Master" color={colors.secondary} />
      <UpperBorder
        text="Browser"
        image={require("../assets/images/leaves.jpeg")}
      />
      <TopTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            //color: colors.secondary,
            fontWeight: "bold",
            paddingLeft: 5,
            //marginHorizontal: 20,
          },
          tabBarItemStyle: {
            // width: 120,
            height: 55,
            flexDirection: "row",
            //marginHorizontal: 20,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.secondary,
            //width: 120,
            height: 3,
            borderRadius: 2,
            //  marginLeft: 20,
          },
          // tabBarShowLabel: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.gray2,
          tabBarStyle: {
            backgroundColor: colors.white,
            //paddingHorizontal: 20,
          },
        }}
      >
        <TopTab.Screen
          name="Feeds"
          component={FeedScreen}
          options={{
            // tabBarLabel: "Activity",
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="network"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // tabBarLabel: "HOME",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
      </TopTab.Navigator>
    </Fragment>
  );
};

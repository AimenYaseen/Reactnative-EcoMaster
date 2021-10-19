import React, { Fragment } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
      <TopTab.Navigator>
        <TopTab.Screen
          name="Feeds"
          component={FeedScreen}
          options={{ headerShown: false }}
        />
        <TopTab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </TopTab.Navigator>
    </Fragment>
  );
};

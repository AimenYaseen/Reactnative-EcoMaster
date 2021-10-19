import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HabitTrackerScreen from "../screens/HabitTrackerScreen";
import EcoMap from "../screens/EcoMap";

const HabitTab = createMaterialBottomTabNavigator();
export const HabitTabScreen = () => {
  return (
    <HabitTab.Navigator>
      <HabitTab.Screen
        name="EcoMap"
        component={EcoMap}
        options={{ headerShown: false }}
      />
      <HabitTab.Screen
        name="HabitTracker"
        component={HabitTrackerScreen}
        options={{ headerShown: false }}
      />
    </HabitTab.Navigator>
  );
};

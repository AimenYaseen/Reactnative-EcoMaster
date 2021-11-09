import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StackScreen } from "./AuthStack";
import { AppStackScreen } from "./AppStack";
import { AdminMainStackScreen } from "../Admin/AdminNavigation/RootNavigation";
import { navigationRef } from "./NavigationRef";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="AuthFlow"
        component={StackScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AdminFlow"
        component={AdminMainStackScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AppFlow"
        component={AppStackScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackScreen />
    </NavigationContainer>
  );
};

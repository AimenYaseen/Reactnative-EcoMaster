import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TopTabScreen } from "./TopTabBar";
import { StackScreen } from "./NativeStack";
import ProfileScreen from "../screens/ProfileScreen";
import { HabitTabScreen } from "./BottomTabBar";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="StackScreen"
        component={StackScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="MainFlow"
        component={TopTabScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Habit" component={HabitTabScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

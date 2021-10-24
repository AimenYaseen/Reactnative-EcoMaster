import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TopTabScreen } from "./TopTabBar";
import { StackScreen } from "./NativeStack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfile";
import { HabitTabScreen } from "./BottomTabBar";
import { CustomTabScreen } from "./BottomTabBar";

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
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Habit"
        component={HabitTabScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Custom"
        component={CustomTabScreen}
        options={{ headerShown: false }}
      />
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

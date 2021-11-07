import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfile";
import { HabitTabScreen } from "./BottomTabBar";
import { CustomTabScreen } from "./BottomTabBar";
import PostsScreen from "../screens/Community/PostsScreen";
import AddPost from "../screens/Community/AddPost";
import HabitForm from "../screens/CustomHabit/HabitForm";

import { TopTabScreen } from "./TopTabBar";

const AppStack = createNativeStackNavigator();
export const AppStackScreen = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="MainFlow"
        component={TopTabScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Post"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="AddPost"
        component={AddPost}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Habit"
        component={HabitTabScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="HabitForm"
        component={HabitForm}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Custom"
        component={CustomTabScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

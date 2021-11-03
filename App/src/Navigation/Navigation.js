import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TopTabScreen } from "./TopTabBar";
import { StackScreen } from "./NativeStack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfile";
import { HabitTabScreen } from "./BottomTabBar";
import { CustomTabScreen } from "./BottomTabBar";
import SplashScreen from "../screens/SplashScreen";
import PostsScreen from "../screens/Community/PostsScreen";
import AddPost from "../screens/Community/AddPost";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AuthFlow"
        component={StackScreen}
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

const AppStack = createStackNavigator();
const AppStackScreen = () => {
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
        name="Custom"
        component={CustomTabScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

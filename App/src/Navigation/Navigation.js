import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/UserRegistration/SignUpScreen";
import SignInScreen from "../screens/UserRegistration/SignInScreen";
import ForgetPasswordScreen from "../screens/UserRegistration/ForgetPasswordScreen";
import TermsOfServices from "../screens/TermsOfServices";
import ProfileScreen from "../screens/ProfileScreen";
import HabitTrackerScreen from "../screens/HabitTrackerScreen";
import EcoMap from "../screens/EcoMap";
import { Head, UpperBorder } from "../components/CustomHead";
import colors from "../constants/colors";
import FeedScreen from "../screens/FeedScreen";

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
    </MainStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Terms" component={TermsOfServices} />
      <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Habit" component={HabitTabScreen} />
    </Stack.Navigator>
  );
};

const TopTab = createMaterialTopTabNavigator();
const TopTabScreen = () => {
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

const HabitTab = createMaterialBottomTabNavigator();
const HabitTabScreen = () => {
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

export default () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/UserRegistration/SignUpScreen";
import SignInScreen from "../screens/UserRegistration/SignInScreen";
import ForgetPasswordScreen from "../screens/UserRegistration/ForgetPasswordScreen";
import TermsOfServices from "../screens/TermsOfServices";
import { Head, UpperBorder } from "../components/CustomHead";
import colors from "../constants/colors";

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
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </TopTab.Navigator>
    </Fragment>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

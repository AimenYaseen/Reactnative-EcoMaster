import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/UserRegistration/SignUpScreen";
import SignInScreen from "../screens/UserRegistration/SignInScreen";
import ForgetPasswordScreen from "../screens/UserRegistration/ForgetPasswordScreen";
import TermsOfServices from "../screens/TermsOfServices";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();
export const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="Terms"
        component={TermsOfServices}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forget"
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

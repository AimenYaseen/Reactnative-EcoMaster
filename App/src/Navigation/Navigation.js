import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StackScreen } from "./AuthStack";
import { AppStackScreen } from "./AppStack";

const MainStack = createStackNavigator();
const MainStackScreen = () => {
  const [LoggedIn, setLoggedIn] = useState(false);

  return (
    <MainStack.Navigator>
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

export default () => {
  return (
    <NavigationContainer>
      <MainStackScreen />
    </NavigationContainer>
  );
};

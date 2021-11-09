import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdminSignIn from "../AdminScreens/AdminSignIn";
import { AdminAppStackScreen } from "./AdminAppStack";

const AdminMainStack = createStackNavigator();
export const AdminMainStackScreen = () => {
  return (
    <AdminMainStack.Navigator>
      <AdminMainStack.Screen
        name="AdminAuth"
        component={AdminSignIn}
        options={{ headerShown: false }}
      />
      <AdminMainStack.Screen
        name="AdminFlow"
        component={AdminAppStackScreen}
        options={{ headerShown: false }}
      />
    </AdminMainStack.Navigator>
  );
};

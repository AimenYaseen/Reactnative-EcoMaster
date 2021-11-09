import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProfileScreen from "../screens/Profile/ProfileScreen";
// import EditProfile from "../screens/Profile/EditProfile";
import { AdminHabitTabScreen } from "./AdminBottomTab";
import { AdminCustomTabScreen } from "./AdminBottomTab";
// import HabitForm from "../screens/CustomHabit/HabitForm";

import { TopTabScreen } from "./TopTabBar";

const AdminAppStack = createNativeStackNavigator();
export const AdminAppStackScreen = () => {
  return (
    <AdminAppStack.Navigator>
      <AdminAppStack.Screen
        name="AdminMainFlow"
        component={TopTabScreen}
        options={{ headerShown: false }}
      />
      {/* <AdminAppStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      /> */}
      <AdminAppStack.Screen
        name="AdminHabit"
        component={AdminHabitTabScreen}
        options={{ headerShown: false }}
      />
      {/* <AdminAppStack.Screen
        name="HabitForm"
        component={HabitForm}
        options={{ headerShown: false }}
      /> */}
      <AdminAppStack.Screen
        name="AdminCustom"
        component={AdminCustomTabScreen}
        options={{ headerShown: false }}
      />
    </AdminAppStack.Navigator>
  );
};

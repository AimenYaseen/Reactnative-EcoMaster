import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProfileScreen from "../screens/Profile/ProfileScreen";
// import EditProfile from "../screens/Profile/EditProfile";
import { AdminSuggestionTopTabScreen } from "./AdminTopTab";
import AdminHabitTracker from "../AdminScreens/HabitTracker/AdminHabitTracker";
import { AdminHabitTabScreen } from "./AdminBottomTab";
import { AdminCustomTabScreen } from "./AdminBottomTab";
import { AdminTopTabScreen } from "./AdminTopTab";
import AddNews from "../AdminScreens/News/AddNews";
import EditNews from "../AdminScreens/News/EditNews";
import AddHabit from "../AdminScreens/HabitTracker/AddHabit";
import EditHabit from "../AdminScreens/HabitTracker/EditHabit";
import AddCustom from "../AdminScreens/CustomHabit/AddCustom";
import EditCustom from "../AdminScreens/CustomHabit/EditCustom";
// import HabitForm from "../screens/CustomHabit/HabitForm";

const AdminAppStack = createNativeStackNavigator();
export const AdminAppStackScreen = () => {
  return (
    <AdminAppStack.Navigator>
      <AdminAppStack.Screen
        name="AdminMainFlow"
        component={AdminTopTabScreen}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="AddNews"
        component={AddNews}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="EditNews"
        component={EditNews}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="AddHabit"
        component={AddHabit}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="EditHabit"
        component={EditHabit}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="AddCustom"
        component={AddCustom}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="EditCustom"
        component={EditCustom}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="AdminHabit"
        component={AdminHabitTracker}
        options={{ headerShown: false }}
      />
      <AdminAppStack.Screen
        name="AdminCustom"
        component={AdminSuggestionTopTabScreen}
        options={{ headerShown: false }}
      />
    </AdminAppStack.Navigator>
  );
};

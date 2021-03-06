import React, { Fragment, useContext } from "react";
import { Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { navigate } from "../../Navigation/NavigationRef";

import { Head, UpperBorder, CustomHead } from "../../components/CustomHead";

import AdminFeedScreen from "../AdminScreens/AdminFeedScreen";
import AdminHomeScreen from "../AdminScreens/AdminHomeScreen";

import AdminHabits from "../AdminScreens/CustomHabit/Suggestion/AdminHabits";
import AdminEnergy from "../AdminScreens/CustomHabit/Suggestion/AdminEnergy";
import AdminWater from "../AdminScreens/CustomHabit/Suggestion/AdminWater";
import AdminTransportation from "../AdminScreens/CustomHabit/Suggestion/AdminTransportation";
import AdminFoodAndDrink from "../AdminScreens/CustomHabit/Suggestion/AdminFoodAndDrink";
import AdminWaste from "../AdminScreens/CustomHabit/Suggestion/AdminWaste";
import { Context as AdminAuthContext } from "../AdminContext/AdminAuthContext";

import colors from "../../constants/colors";
import { Alert, Text } from "react-native";

const AdminTopTab = createMaterialTopTabNavigator();
export const AdminTopTabScreen = () => {
  const { admin_signout } = useContext(AdminAuthContext);
  return (
    <Fragment>
      <Head text="Eco Master" color={colors.secondary} />
      <UpperBorder
        text="Browser (Admin)"
        image={null}
        icon={{
          name: "logout",
          type: "antdesign",
          color: colors.white,
        }}
        onPress={() => {
          Alert.alert(
            "Log Out!",
            "Are You Sure, You want to logOut?",
            [
              {
                text: "No",
                //onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => admin_signout(),
              },
            ],
            { cancelable: false }
          );
        }}
      />
      <AdminTopTab.Navigator
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          tabBarScrollEnabled: false,
          tabBarLabelStyle: {
            fontSize: 14,
            //color: colors.secondary,
            fontWeight: "bold",
            paddingLeft: 5,
            //marginHorizontal: 20,
          },
          tabBarItemStyle: {
            // width: 120,
            height: 55,
            flexDirection: "row",
            //marginHorizontal: 20,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.secondary,
            //width: 120,
            height: 3,
            borderRadius: 2,
            //  marginLeft: 20,
          },
          // tabBarShowLabel: false,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.gray2,
          tabBarStyle: {
            backgroundColor: colors.white,
            //paddingHorizontal: 20,
          },
        }}
      >
        <AdminTopTab.Screen
          name="AdminNews"
          component={AdminFeedScreen}
          options={{
            tabBarLabel: "News",
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="network"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
        <AdminTopTab.Screen
          name="AdminHome"
          component={AdminHomeScreen}
          options={{
            tabBarLabel: "HOME",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
      </AdminTopTab.Navigator>
    </Fragment>
  );
};

const AdminSuggestionTopTab = createMaterialTopTabNavigator();
export const AdminSuggestionTopTabScreen = () => {
  //const insets = useSafeAreaInsets();
  //const { navigate } = useNavigation();

  return (
    <Fragment>
      <CustomHead
        text="Suggestions"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigate("AdminMainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={() => (
          <Icon
            name="plus"
            type="entypo"
            size={30}
            onPress={() => navigate("AddCustom")}
            color={colors.white}
          />
        )}
      />
      <AdminSuggestionTopTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            width: "auto",
            paddingHorizontal: 5,
          },
          tabBarItemStyle: {
            height: 45,
            width: "auto",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.secondary,
            height: 3,
            borderRadius: 2,
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.gray2,
          tabBarStyle: {
            backgroundColor: colors.white,
            // paddingTop: insets.top,
          },
        }}
      >
        <AdminSuggestionTopTab.Screen
          name="Habit"
          component={AdminHabits}
          options={
            {
              // tabBarLabel: "Activity",
            }
          }
        />
        <AdminSuggestionTopTab.Screen
          name="Energy"
          component={AdminEnergy}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <AdminSuggestionTopTab.Screen
          name="Water"
          component={AdminWater}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <AdminSuggestionTopTab.Screen
          name="Waste"
          component={AdminWaste}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <AdminSuggestionTopTab.Screen
          name="Transportaton"
          component={AdminTransportation}
          options={
            {
              // tabBarLabel: "Transportation",
            }
          }
        />
        <AdminSuggestionTopTab.Screen
          name="Food & Drink"
          component={AdminFoodAndDrink}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
      </AdminSuggestionTopTab.Navigator>
    </Fragment>
  );
};

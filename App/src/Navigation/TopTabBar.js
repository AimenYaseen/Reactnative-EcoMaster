import React, { Fragment, useContext, useEffect } from "react";
import { InteractionManager } from "react-native";
import { Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { Head, UpperBorder, CustomHead } from "../components/CustomHead";
import HomeScreen from "../screens/HomeScreen";
import FeedScreen from "../screens/FeedScreen";

import colors from "../constants/colors";

import { Context as UserContext } from "../context/UserContext";
import Habits from "../screens/CustomHabit/Suggestion/Habits";
import Energy from "../screens/CustomHabit/Suggestion/Energy";
import Water from "../screens/CustomHabit/Suggestion/Water";
import Waste from "../screens/CustomHabit/Suggestion/Waste";
import Transportation from "../screens/CustomHabit/Suggestion/Transportation";
import FoodAndDrink from "../screens/CustomHabit/Suggestion/FoodAndDrink";

const TopTab = createMaterialTopTabNavigator();
export const TopTabScreen = () => {
  const { state, getUser } = useContext(UserContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getUser();
  //     const unsubscribe = () => {
  //       getUser();
  //     };

  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [])
  // );
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      <Head text="Eco Master" color={colors.secondary} />
      <UpperBorder
        text="Browser"
        image={
          state.userData.image
            ? { uri: state.userData.image }
            : require("../assets/images/default/default-user.jpeg")
        }
      />
      <TopTab.Navigator
        screenOptions={{
          headerShown: false,
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
        <TopTab.Screen
          name="News"
          component={FeedScreen}
          options={{
            // tabBarLabel: "Activity",
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="network"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // tabBarLabel: "HOME",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                color={focused ? colors.secondary : colors.gray2}
                size={22}
              />
            ),
          }}
        />
      </TopTab.Navigator>
    </Fragment>
  );
};

const SuggestionTopTab = createMaterialTopTabNavigator();
export const SuggestionTopTabScreen = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();

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
            onPress={() => navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <SuggestionTopTab.Navigator
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
        <SuggestionTopTab.Screen
          name="Habit"
          component={Habits}
          options={
            {
              // tabBarLabel: "Activity",
            }
          }
        />
        <SuggestionTopTab.Screen
          name="Energy"
          component={Energy}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <SuggestionTopTab.Screen
          name="Water"
          component={Water}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <SuggestionTopTab.Screen
          name="Waste"
          component={Waste}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
        <SuggestionTopTab.Screen
          name="Transportaton"
          component={Transportation}
          options={
            {
              // tabBarLabel: "Transportation",
            }
          }
        />
        <SuggestionTopTab.Screen
          name="Food & Drink"
          component={FoodAndDrink}
          options={
            {
              // tabBarLabel: "HOME",
            }
          }
        />
      </SuggestionTopTab.Navigator>
    </Fragment>
  );
};

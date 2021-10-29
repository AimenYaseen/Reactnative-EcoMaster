import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { HabitCard } from "../../components/CustomCard";

import { CustomHead } from "../../components/CustomHead";
import { habits } from "../../data/habits";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const HabitTrackerScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHead
        text="Habit Tracker"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      {console.log(habits)}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={habits}
        initialNumToRender={habits.length}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={({ item }) => {
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}
            >
              <HabitCard
                title={item.title}
                description={item.description}
                duration={item.duration}
              />
              <View style={{ height: screenHeight * 0.2 }} />
            </ScrollView>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HabitTrackerScreen;

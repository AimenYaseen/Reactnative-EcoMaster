import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

import { HabitCard } from "../../components/Habit/HabitCard";
import { CustomHead } from "../../../components/CustomHead";
import { habits } from "../../../data/habits";
import colors from "../../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const AdminHabitTracker = ({ navigation }) => {
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
            onPress={() => navigation.navigate("AdminMainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={() => (
          <Icon
            name="plus"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("AddHabit")}
            color={colors.white}
          />
        )}
      />
      <FlatList
        //removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        horizontal
        data={habits}
        initialNumToRender={habits.length}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={({ item }) => {
          return (
            <>
              <HabitCard
                title={item.title}
                description={item.description}
                duration={item.duration}
                steps={item.steps}
                image={item.image}
              />
              {/* <LockCard /> */}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdminHabitTracker;

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
  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}> There are no News yet... </Text>
    </View>
  );

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
        ListEmptyComponent={listEmpty}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.83,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.gray,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 80,
  },
});

export default AdminHabitTracker;

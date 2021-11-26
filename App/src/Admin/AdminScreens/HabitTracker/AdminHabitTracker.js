import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import { HabitCard } from "../../components/Habit/HabitCard";
import { CustomHead } from "../../../components/CustomHead";
import { Context as HabitContext } from "../../AdminContext/HabitContext";
import colors from "../../../constants/colors";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const screenHeight = Dimensions.get("screen").height;

const AdminHabitTracker = ({ navigation }) => {
  const {
    state: { habits, loading },
    getHabit,
  } = useContext(HabitContext);

  React.useEffect(() => {
    getHabit();
    const unsubscribe = navigation.addListener("focus", () => {
      getHabit();
    });

    return unsubscribe;
  }, []);

  const listEmpty = () => <View style={styles.container}></View>;

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
        renderItem={({ item, index }) => {
          return (
            <>
              <HabitCard item={item} index={index} />
              {/* <LockCard /> */}
            </>
          );
        }}
      />
      <Spinner visible={loading} color={colors.secondary} animation="fade" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
    width: ScreenWidth,
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

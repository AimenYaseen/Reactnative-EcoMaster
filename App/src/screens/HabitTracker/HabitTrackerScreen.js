import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { Firebase } from "../../Firebase/config";

import HabitCard from "../../components/CustomCard";
import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";
import { Context as HabitContext } from "../../context/HabitTrackerContext";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const screenHeight = Dimensions.get("screen").height;

const HabitTrackerScreen = ({ navigation }) => {
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
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
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
        ListEmptyComponent={listEmpty}
        renderItem={({ item, index }) => {
          return (
            <>
              <HabitCard item={item} index={index} />
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

export default HabitTrackerScreen;

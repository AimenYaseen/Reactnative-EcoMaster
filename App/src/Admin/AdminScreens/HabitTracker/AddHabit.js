import React, { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../constants/colors";
import { CustomHead } from "../../../components/CustomHead";
import HabitForm from "../../components/Habit/HabitForm";
import { Context as HabitContext } from "../../AdminContext/HabitContext";
import { Firebase } from "../../../Firebase/config";

const AddHabit = ({ navigation }) => {
  const {
    state: { loading },
    addHabit,
  } = useContext(HabitContext);
  const [habitId, setHabitId] = useState("");

  const getId = async () => {
    await Firebase.database()
      .ref("Habits/")
      .orderByKey()
      .once("value", async (snapshot) => {
        if (snapshot.exists()) {
          const Id = (await Object.keys(snapshot.val()).length) + 1;
          setHabitId(Id.toString());
        }
      });
  };

  React.useEffect(() => {
    const task = () => {
      getId();
    };

    return () => task();
  }, [habitId]);

  return (
    <View style={styles.container}>
      <CustomHead
        text="Add Habits"
        color={colors.success}
        statusColor={colors.success}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("AdminHabit")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../assets/habit_back.jpg")}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {habitId ? (
            <HabitForm
              loading={loading}
              text="Add"
              imageVisible={false}
              habitId={habitId}
              onPress={async (
                habitSteps,
                habitTitle,
                habitDescription,
                habitDuration,
                habitReward,
                habitImage,
                habitId
              ) => {
                await addHabit(
                  habitSteps,
                  habitTitle,
                  habitDescription,
                  habitDuration,
                  habitReward,
                  habitImage,
                  habitId
                );
              }}
            />
          ) : null}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: colors.white,
  },
  background: {
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    // paddingTop: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
});

export default AddHabit;

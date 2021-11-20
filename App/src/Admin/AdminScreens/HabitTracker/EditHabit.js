import React, { useContext } from "react";
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

const EditHabit = ({ navigation, route }) => {
  const {
    state: { loading },
    editHabit,
  } = useContext(HabitContext);

  const item = route.params.item;

  return (
    <View style={styles.container}>
      <CustomHead
        text="Edit Habit"
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
        rightIcon={null}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../assets/news_back.jpg")}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HabitForm
            loading={loading}
            text="Edit"
            habitTitle={item.title}
            habitDescription={item.description}
            habitSteps={item.steps}
            habitDuration={item.duration}
            habitImage={item.image}
            imageVisible={true}
            onPress={async (
              habitSteps,
              habitTitle,
              habitDescription,
              habitDuration,
              habitImage
            ) => {
              await editHabit(
                item.id,
                habitSteps,
                habitTitle,
                habitDescription,
                habitDuration,
                habitImage
              );
            }}
          />
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

export default EditHabit;

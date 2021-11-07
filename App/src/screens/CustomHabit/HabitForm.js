import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const HabitForm = () => {
  return (
    <>
      <CustomHead
        text="Create Post"
        color={colors.whiteSmoke}
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("Post")}
            color={colors.secondary}
          />
        )}
        rightIcon={null}
      />
      <Text>Habit Form</Text>
    </>
  );
};

const styles = StyleSheet.create({});

export default HabitForm;

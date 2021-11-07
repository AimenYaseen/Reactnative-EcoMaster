import React from "react";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { colors, Icon } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const LockCard = () => {
  return (
    <ScrollView>
      <View style={styles.habitContainer}>
        <Icon
          type="font-awesome-5"
          name="lock"
          color={colors.gray4}
          size={19}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    borderRadius: 10,
    height: screenHeight * 0.86,
    width: screenWidth * 0.92,
    position: "absolute",
    // justifyContent: "center",
    // alignItems: "center",
    // opacity: 0.3,
    backgroundColor: colors.gray,
  },
});

import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { LeftHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const ActivityScreen = ({ navigation }) => {
  return (
    <View>
      <LeftHead
        text="Activity"
        color="transparent"
        iconColor={colors.secondary}
        icon="arrow-back-ios"
        onPress={() => navigation.navigate("MainFlow")}
      />
      <Text> ActivityScreen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActivityScreen;

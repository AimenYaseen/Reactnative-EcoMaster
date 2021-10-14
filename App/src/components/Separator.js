import React from "react";
import { View, StyleSheet } from "react-native";

export const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "grey",
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
  },
});

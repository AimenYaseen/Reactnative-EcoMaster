import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../constants/colors";

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> There are no feedbacks yet... </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.gray,
  },
});

export default FeedScreen;

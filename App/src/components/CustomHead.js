import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Header } from "react-native-elements";

import colors from "../constants/colors";

export const UpperBorder = ({ text, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Avatar rounded source={image} size="small" />
    </View>
  );
};

export const Head = ({ text, color }) => {
  return (
    <Header
      statusBarProps={{
        barStyle: "light-content",
        backgroundColor: color,
        hidden: false,
      }}
      centerComponent={{
        text: text,
        style: styles.header,
      }}
      containerStyle={{
        backgroundColor: color,
        height: 90,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 25,
  },
  header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 5,
  },
});

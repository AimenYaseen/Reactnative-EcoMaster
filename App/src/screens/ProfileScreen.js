import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";

import { LeftHead } from "../components/CustomHead";
import colors from "../constants/colors";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LeftHead
        text="Profile"
        color={colors.secondary}
        iconColor={colors.white}
        icon="arrow-back-ios"
        onPress={() => navigation.navigate("MainFlow")}
      />
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/selfprint.jpeg")}
      >
        <Avatar rounded />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //justifyContent: "center",
    // alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});

export default ProfileScreen;

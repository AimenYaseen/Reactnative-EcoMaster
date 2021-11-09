import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import colors from "../../constants/colors";
import { BlockButton } from "../../components/GradientButton";

const AdminHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/images/colorful.jpeg")}
      >
        <View style={styles.subContainer}>
          <BlockButton
            type="font-awesome-5"
            iconName="tasks"
            text="Habit Tracker"
            // subText="start your journey"
            onPress={() => navigation.navigate("AdminHabit")}
          />
          <BlockButton
            type="material-icons"
            iconName="dashboard-customize"
            text="Custom Habit"
            // subText="subText"
            onPress={() => navigation.navigate("AdminCustom")}
          />
        </View>
        <View style={styles.subContainer}>
          <BlockButton
            type="font-awesome"
            iconName="user"
            text="My Profile"
            //onPress={() => navigation.navigate("Profile")}
            // subText="subText"
          />
          {/* <BlockButton
            type="font-awesome"
            iconName="group"
            text="Community"
            onPress={() => navigation.navigate("Post")}
            // subText="subText"
          /> */}
        </View>
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
    // alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default AdminHomeScreen;

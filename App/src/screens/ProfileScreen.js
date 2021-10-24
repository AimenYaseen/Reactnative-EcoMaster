import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";

import { LeftHead } from "../components/CustomHead";
import colors from "../constants/colors";

const ProfileScreen = ({ navigation }) => {
  return (
    <>
      <LeftHead
        text="Profile"
        color={colors.secondary}
        iconColor={colors.white}
        icon="arrow-back-ios"
        onPress={() => navigation.navigate("MainFlow")}
      />
      <View style={styles.container}>
        <Avatar
          rounded
          source={require("../assets/images/cherry.jpeg")}
          size={120}
          containerStyle={{ top: 30 }}
          //placeholderContent={}
        >
          <Avatar.Accessory name="edit-2" type="feather" size={20} />
        </Avatar>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    //justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
});

export default ProfileScreen;

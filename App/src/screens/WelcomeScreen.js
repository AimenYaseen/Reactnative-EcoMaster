import React from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Button, Input, Text } from "react-native-elements";

import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { GradientButton } from "../components/CustomButton";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <SafeAreaView>
        <Text h2 style={styles.header}>
          Eco Master
        </Text>
        <Text style={styles.subHead}>Enjoy the Experience</Text>
      </SafeAreaView>
      <GradientButton
        text="SignIn"
        onPress={() => navigation.navigate("SignIn")}
      />
      <Button
        title="SignUp"
        type="outline"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  header: {
    textAlign: "center",
    paddingTop: 50,
    color: colors.secondary,
  },
  subHead: {
    textAlign: "center",
    color: colors.gray,
    fontSize: 16,
  },
});

export default WelcomeScreen;

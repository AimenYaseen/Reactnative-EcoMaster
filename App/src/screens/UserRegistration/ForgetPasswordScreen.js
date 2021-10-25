import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const ForgetPasswordScreen = () => {
  return (
    <View>
      <CustomHead
        text="Forgot Password"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <Text> ForgetPasswordScreen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgetPasswordScreen;

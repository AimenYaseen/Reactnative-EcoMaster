import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const ActivityScreen = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Activity"
        color="transparent"
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="md-caret-back"
            type="ionicon"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.secondary}
          />
        )}
        rightIcon={null}
      />
      <Text> ActivityScreen </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActivityScreen;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { LeftHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const EcoMap = ({ navigation }) => {
  return (
    <View>
      <LeftHead
        text="Eco Map"
        color={colors.secondary}
        iconColor={colors.white}
        icon="arrow-back-ios"
        onPress={() => navigation.navigate("MainFlow")}
      />
      <Text>Eco Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EcoMap;

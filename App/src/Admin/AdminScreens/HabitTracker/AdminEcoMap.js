import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../../components/CustomHead";
import colors from "../../../constants/colors";

const AdminEcoMap = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Eco Map"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("AdminMainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <Text>Eco Map</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AdminEcoMap;

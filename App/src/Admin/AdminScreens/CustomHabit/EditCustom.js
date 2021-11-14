import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../constants/colors";
import { CustomHead } from "../../../components/CustomHead";

const EditCustom = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Edit Suggestions"
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
      <Text>Edit Custom</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditCustom;

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../constants/colors";
import { CustomHead } from "../../../components/CustomHead";

const EditNews = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Edit News"
        color={colors.mustard}
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
      <Text>Edit News</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditNews;

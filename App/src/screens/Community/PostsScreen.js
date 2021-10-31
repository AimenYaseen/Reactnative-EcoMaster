import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { CommunityCard } from "../../components/Cards/CommunityCard";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const PostsScreen = ({ navigation }) => {
  return (
    <View>
      <CustomHead
        text="Community"
        color="transparent"
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={32}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.secondary}
          />
        )}
        rightIcon={() => (
          <Icon
            name="add"
            type="ionicons"
            size={36}
            onPress={() => navigation.navigate("AddPost")}
            color={colors.secondary}
          />
        )}
      />
      <CommunityCard image={require("../../assets/images/colorful.jpeg")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PostsScreen;

import React from "react";
import { Avatar } from "react-native-elements";

export const CustomAvatar = () => {
  return (
    <Avatar
      rounded
      source={require("../../assets/images/cherry.jpeg")}
      size={140}
      containerStyle={styles.avatar}
      //placeholderContent={}
    >
      <Avatar.Accessory
        //solid
        reverse
        name="edit-2"
        type="feather"
        size={24}
        color={colors.secondary}
        containerStyle={styles.iconContainer}
      />
    </Avatar>
  );
};

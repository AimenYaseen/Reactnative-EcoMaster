import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";

import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const NewsCard = ({ image, title, caption }) => {
  return (
    <>
      <Tile
        imageSrc={image}
        title={title}
        featured
        caption={caption}
        width={screenWidth * 0.95}
        height={screenHeight * 0.3}
        imageContainerStyle={{
          borderRadius: 10,
          borderWidth: 2,
          borderColor: colors.secondary,
        }}
        containerStyle={{
          alignSelf: "center",
          marginTop: 15,
          borderRadius: 10,
          ...styles.shadow,
        }}
        titleStyle={{
          // color: "black",
          backgroundColor: colors.secondary,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        captionStyle={{
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 5,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

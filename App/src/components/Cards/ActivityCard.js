import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const TileCard = ({ image, title, caption }) => {
  const captionC = caption + "\n\nDuration :" + " Days";
  return (
    <>
      <Tile
        imageSrc={image}
        title={title}
        featured
        caption={captionC}
        width={screenWidth * 0.95}
        height={screenHeight * 0.3}
        imageContainerStyle={{
          borderRadius: 7,
        }}
        containerStyle={{
          marginTop: 10,
          alignSelf: "center",
        }}
      ></Tile>
    </>
  );
};

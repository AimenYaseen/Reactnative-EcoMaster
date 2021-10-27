import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Tile } from "react-native-elements";

export const Card = () => {
  return (
    <>
      <Tile
        imageSrc={require("./img/path")}
        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
        featured
        caption="Some Caption Text"
      />
      ;
    </>
  );
};

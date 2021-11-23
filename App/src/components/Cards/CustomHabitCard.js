import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";

import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const CustomHabitCard = ({ item }) => {
  return (
    <>
      <Tile
        imageSrc={{ uri: item.image }}
        title={item.title}
        featured
        caption={item.caption}
        width={screenWidth * 0.95}
        height={screenHeight * 0.3}
        imageContainerStyle={{
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
        }}
        containerStyle={{
          marginTop: 10,
          alignSelf: "center",
        }}
      />
      <View style={[styles.durationTile, { backgroundColor: colors.mauve }]}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon type="entypo" name="time-slot" color={colors.white} size={20} />
          <Text style={{ paddingHorizontal: 10, color: colors.whiteSmoke }}>
            Duration : {item.duration} Days
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.durationTile,
          {
            backgroundColor: colors.secondary,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Icon type="entypo" name="time-slot" color={colors.white} size={20} />
          <Text style={{ paddingHorizontal: 10, color: colors.whiteSmoke }}>
            Status :
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    borderRadius: 30,
  },
  durationTile: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.95,
    borderColor: "transparent",
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
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

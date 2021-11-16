import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { Tile, Icon, Button } from "react-native-elements";
import { navigate } from "../../../Navigation/NavigationRef";

import colors from "../../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const CustomCard = ({ image, title, caption }) => {
  // const captionC = caption + "\n\nDuration :" + " Days";
  return (
    <View
      style={{
        // width: screenWidth * 0.95,
        paddingHorizontal: 20,
        paddingTop: 10,
        alignSelf: "center",
      }}
    >
      <Tile
        imageSrc={image}
        title={title}
        featured
        caption={caption}
        width={screenWidth * 0.95}
        height={screenHeight * 0.27}
        imageContainerStyle={{
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          alignItems: "center",
          justifyContent: "center",
        }}
        containerStyle={{
          marginTop: 10,
          alignSelf: "center",
        }}
      />
      <View style={styles.durationTile}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon type="entypo" name="time-slot" color={colors.white} size={20} />
          <Text style={{ paddingHorizontal: 10, color: colors.whiteSmoke }}>
            Duration : Days
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.shadow,
          { flexDirection: "row", justifyContent: "center" },
        ]}
      >
        <Button
          title="Edit"
          buttonStyle={{
            backgroundColor: colors.mustard,
            width: screenWidth * 0.475,
            borderBottomLeftRadius: 7,
            borderRadius: 0,
          }}
          onPress={() => navigate("EditCustom")}
        />
        <Button
          title="Delete"
          buttonStyle={{
            backgroundColor: colors.accent,
            width: screenWidth * 0.475,
            borderBottomRightRadius: 7,
            borderRadius: 0,
          }}
          onPress={() => {
            Alert.alert(
              "Delete!",
              "Are You Sure, You want to Delete?",
              [
                {
                  text: "No",
                  //onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  //onPress: () => deleteNews(item.id, title),
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  durationTile: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.95,
    backgroundColor: colors.mauve,
    borderColor: "transparent",
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 0,
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

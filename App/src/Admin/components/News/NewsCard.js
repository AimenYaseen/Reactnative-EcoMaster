import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Alert } from "react-native";
import { Tile, Card, Icon, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import colors from "../../../constants/colors";
import { navigate } from "../../../Navigation/NavigationRef";
import { Context as NewsContext } from "../../AdminContext/NewsContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const NewsCard = ({ item, title }) => {
  const { state, deleteNews, getNewsTips, getNewsInformation } =
    useContext(NewsContext);

  React.useEffect(() => {
    getNewsTips();
    getNewsInformation();
  }, [state.deleted]);

  return (
    <View
      style={{
        // width: screenWidth * 0.95,
        paddingHorizontal: 10,
        // paddingTop: 10,
        alignSelf: "center",
      }}
    >
      <Tile
        imageSrc={{ uri: item.image }}
        title={null}
        featured
        caption={item.caption}
        width={screenWidth * 0.85}
        height={screenHeight * 0.25}
        imageContainerStyle={{
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          //  borderWidth: 2,
          // borderColor: colors.secondary,
        }}
        containerStyle={{
          alignSelf: "center",
          marginTop: 15,
          // marginRight: 15,
          ...styles.shadow,
        }}
        // titleStyle={{
        //   // color: "black",
        //   backgroundColor: colors.secondary,
        //   paddingHorizontal: 10,
        //   borderRadius: 5,
        // }}
        captionStyle={{
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 5,
        }}
      />
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
            width: screenWidth * 0.425,
            borderBottomLeftRadius: 7,
            borderRadius: 0,
          }}
          onPress={() => navigate("EditNews", { item, title })}
        />
        <Button
          title="Delete"
          buttonStyle={{
            backgroundColor: colors.accent,
            width: screenWidth * 0.425,
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
                  onPress: () => deleteNews(item.id, title),
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
  durationTile: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    backgroundColor: colors.whiteSmoke,
    borderColor: "transparent",
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
});

import React from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Tile, Card, Icon, Button } from "react-native-elements";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const TileCard = ({ image, title, caption }) => {
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
          borderRadius: 7,
          //  borderBottomRightRadius: 5,
          // borderTopRightRadius: 5,
          // paddingRight: 54,
        }}
        imageProps={{ resizeMode: "cover" }}
        containerStyle={{
          marginTop: 10,
          //borderRadius: 10,
        }}
      />
    </>
  );
};

export const HabitCard = ({ title, description, duration }) => {
  return (
    <>
      <Card containerStyle={[styles.habitContainer, styles.shadow]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card.Title
            style={{
              fontSize: 20,
              //fontFamily: "arial"
            }}
          >
            {title}
          </Card.Title>
          <Card.Divider />

          <Card.Image
            source={require("../assets/images/leave.jpeg")}
            style={{ borderRadius: 5, height: screenHeight * 0.4 }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.dTitle}>Description</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </Card.Image>
          <View style={[styles.duration, styles.shadow]}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Icon
                type="entypo"
                name="time-slot"
                color={colors.secondary}
                size={20}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                Duration : {duration} Days
              </Text>
            </View>
          </View>
          <Button
            type="clear"
            title="Learn More"
            titleStyle={{ color: colors.secondary, fontWeight: "bold" }}
            containerStyle={{ marginTop: 10 }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Button
              type="solid"
              title="Select"
              raised
              buttonStyle={{
                width: screenWidth * 0.25,
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: colors.mustard,
              }}
              containerStyle={{
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
              }}
            />
            <Button
              type="solid"
              title="Skip"
              raised
              buttonStyle={{
                width: screenWidth * 0.25,
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                backgroundColor: colors.mauve,
              }}
              containerStyle={{
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
              }}
            />
          </View>
        </ScrollView>
      </Card>
      <Button
        raised
        type="solid"
        title="Share"
        containerStyle={{
          marginTop: 20,
          alignSelf: "flex-end",
          marginRight: 15,
          borderRadius: 30,
        }}
        buttonStyle={{
          width: screenWidth * 0.25,
          borderRadius: 30,
          backgroundColor: colors.blue,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    borderRadius: 10,
    height: screenHeight * 0.8,
    width: screenWidth * 0.92,
    // alignItems: "center",
  },
  dTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    //alignSelf: "center",
    marginVertical: 5,
    paddingLeft: 15,
  },
  description: {
    color: colors.white,
    alignSelf: "center",
    textAlignVertical: "center",
    paddingHorizontal: 15,
    fontSize: 15,
    //borderWidth: 1,
  },
  duration: {
    //marginHorizontal: screenWidth * 0.03,
    marginVertical: screenHeight * 0.02,
    height: screenHeight * 0.06,
    width: screenWidth * 0.81,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
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

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import { Tile, Card, Icon } from "react-native-elements";

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

export const HabitCard = () => {
  return (
    <Card containerStyle={[styles.habitContainer, styles.shadow]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />

        <Card.Image
          source={require("../assets/images/leave.jpeg")}
          style={{ borderRadius: 5, height: screenHeight * 0.4 }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.description}>Description</Text>
          </View>
        </Card.Image>
        <View style={[styles.duration, styles.shadow]}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="material-icons"
              name="email"
              color={colors.secondary}
              size={20}
            />
            <Text style={{ paddingHorizontal: 10 }}>Duration : </Text>
          </View>
        </View>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    borderRadius: 10,
    height: screenHeight * 0.8,
    // alignItems: "center",
  },
  description: {
    color: colors.white,
    alignSelf: "center",
    textAlignVertical: "center",
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
    padding: 15,
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

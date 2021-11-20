import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";
import { navigate } from "../../../Navigation/NavigationRef";

import colors from "../../../constants/colors";
import { HabitOverlay } from "../../../components/CustomOverlay";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const HabitCard = ({ item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card containerStyle={[styles.habitContainer, styles.shadow]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card.Title
              style={{
                fontSize: 20,
                //fontFamily: "arial"
              }}
            >
              {item.title}
            </Card.Title>
            <Card.Divider />

            <Card.Image
              source={{ uri: item.image }}
              style={{ borderRadius: 5, height: screenHeight * 0.4 }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.dTitle}>Description</Text>
                <Divider
                  inset
                  insetType="right"
                  style={{ marginLeft: 15, width: screenWidth * 0.73 }}
                />
                <Text style={styles.description}>{item.description}</Text>
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
                  Duration : {item.duration} Days
                </Text>
              </View>
            </View>
            <View style={[styles.duration, styles.shadow]}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Icon
                  type="font-awesome-5"
                  name="coins"
                  color={colors.secondary}
                  size={19}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  Reward : {item.reward} points
                </Text>
              </View>
            </View>
            <Button
              type="clear"
              title="Learn More"
              titleStyle={{ color: colors.secondary, fontWeight: "bold" }}
              onPress={() => setVisible(true)}
              containerStyle={{ marginTop: 20 }}
            />
            <HabitOverlay
              data={item.steps}
              visible={visible}
              onBackdropPress={() => setVisible(false)}
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
                title="Edit"
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
                onPress={() => navigate("EditHabit", { item: item })}
              />
              <Button
                type="solid"
                title="Delete"
                raised
                buttonStyle={{
                  width: screenWidth * 0.25,
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                  backgroundColor: colors.accent,
                }}
                containerStyle={{
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                }}
              />
            </View>
          </ScrollView>
        </Card>
        <View style={{ height: screenHeight * 0.2 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    borderRadius: 10,
    height: screenHeight * 0.86,
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
    marginTop: 5,
    fontSize: 15,
    //borderWidth: 1,
  },
  duration: {
    //marginHorizontal: screenWidth * 0.03,
    marginTop: screenHeight * 0.02,
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

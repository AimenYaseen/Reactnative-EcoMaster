import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";
import moment from "moment";

import { Firebase } from "../Firebase/config";
import { Context as ActivityContext } from "../context/ActivityContext";
import { Context as HabitContext } from "../context/HabitTrackerContext";

import colors from "../constants/colors";
import { HabitOverlay } from "./CustomOverlay";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const TileCard = ({ item }) => {
  const { addActivity } = useContext(ActivityContext);

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
        imageSrc={{ uri: item.image }}
        title={item.title}
        featured
        caption={item.description}
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
      <Button
        title="Select"
        buttonStyle={{
          backgroundColor: colors.secondary,
          width: screenWidth * 0.95,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderRadius: 0,
        }}
        onPress={() => addActivity({ Id: item.id })}
        containerStyle={styles.shadow}
      />
    </View>
  );
};

export const HabitCard = ({ item, index }) => {
  const { startHabit, updateHabit, getHabit, setLock } =
    useContext(HabitContext);
  const [habitData, setHabitData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("Pending");

  const disable = item.selected ? true : false;
  // console.log(new Date(163738317853));

  const getHabitData = async () => {
    try {
      await Firebase.database()
        .ref("Habits/" + item.id)
        .once("value", async (snapshot) => {
          if (snapshot.exists) {
            const data = await snapshot.val();
            // console.log(data);
            setHabitData(data);
          }
        });
    } catch (error) {
      //loader
      Alert.alert("ERROR!", error.message);
    }
  };

  useEffect(() => {
    getHabitData();
  }, [item]);

  useEffect(() => {
    if (item.completed) {
      setLock(index + 2, false);
      getHabit();
    }
  }, [item.completed]);

  useEffect(() => {
    if (item.selected) {
      const duration = habitData ? habitData.duration : 1;
      // console.log("NOW_____________");
      // console.log("current: ", moment().format());
      const current = moment().format();
      // console.log("previous: ", moment(item.time).format());
      const habitTime = moment(item.time).add(duration, "days").format();
      if (current >= habitTime) {
        setStatus("Completed");
        updateHabit(item.id, true);
        getHabit();
      }
    }
  }, []);

  return (
    <>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card
            containerStyle={[
              styles.habitContainer,
              styles.shadow,
              {
                height: item.selected
                  ? screenHeight * 0.93
                  : screenHeight * 0.85,
              },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Card.Title
                style={{
                  fontSize: 20,
                  //fontFamily: "arial"
                }}
              >
                {habitData ? habitData.title : null}
              </Card.Title>
              <Card.Divider />

              <Card.Image
                source={{ uri: habitData ? habitData.image : null }}
                style={{ borderRadius: 5, height: screenHeight * 0.4 }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={styles.dTitle}>Description</Text>
                  <Divider
                    inset
                    insetType="right"
                    style={{ marginLeft: 15, width: screenWidth * 0.73 }}
                  />
                  <Text style={styles.description}>
                    {habitData ? habitData.description : null}
                  </Text>
                </View>
              </Card.Image>
              <View style={[styles.duration, styles.shadow]}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Icon
                    type="entypo"
                    name="time-slot"
                    color={colors.secondary}
                    size={20}
                  />
                  <Text style={{ paddingHorizontal: 10 }}>
                    Duration : {habitData ? habitData.duration : null} Days
                  </Text>
                </View>
              </View>
              {item.selected ? (
                <View style={[styles.duration, styles.shadow]}>
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <Icon
                      type="material-community"
                      name="progress-clock"
                      color={colors.secondary}
                      size={20}
                    />
                    <Text style={{ paddingHorizontal: 10 }}>
                      Status : {status}
                    </Text>
                  </View>
                </View>
              ) : null}
              <View style={[styles.duration, styles.shadow]}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Icon
                    type="font-awesome-5"
                    name="coins"
                    color={colors.secondary}
                    size={19}
                  />
                  <Text style={{ paddingHorizontal: 10 }}>
                    Reward : {habitData ? habitData.reward : null} points
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
                data={habitData ? habitData.steps : []}
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
                  disabled={disable}
                  type="solid"
                  title="Select"
                  onPress={async () => {
                    await startHabit(item.id, true, Date.now());
                    getHabit();
                  }}
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
                  title="Share"
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
          <View style={{ height: screenHeight * 0.2 }} />
        </ScrollView>
      </View>
      {item.locked ? (
        <View style={styles.lock}>
          <View
            style={{
              marginTop: screenHeight * 0.35,
              marginLeft: screenWidth * 0.3,
            }}
          >
            <Icon
              reverse
              type="font-awesome5"
              name="lock"
              color={colors.mustard}
              size={50}
            />
            {/* <Text style={{ alignSelf: "center", color: colors.mustard }}>
              Complete Previous Habits to unlock this...
            </Text> */}
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    borderRadius: 10,
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
  durationTile: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.95,
    backgroundColor: colors.whiteSmoke,
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
  lock: {
    borderRadius: 10,
    height: screenHeight * 0.86,
    width: screenWidth * 0.92,
    position: "absolute",
    backgroundColor: colors.whiteSmoke,
    opacity: 0.8,
    marginLeft: 15,
    marginTop: 15,
  },
});

import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { Tile, Icon, Button, Divider } from "react-native-elements";
import moment from "moment";

import colors from "../../constants/colors";

import { Firebase } from "../../Firebase/config";
import { Context as ActivityContext } from "../../context/ActivityContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ActivityCard = ({ item }) => {
  const { state, getActivity, deleteActivity } = useContext(ActivityContext);
  const [habitData, setHabitData] = useState(null);
  const [status, setStatus] = useState("Pending");

  const remove = status == "Completed" ? true : false;

  const getHabit = async () => {
    try {
      await Firebase.database()
        .ref("CustomHabits/" + item.customId)
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

  let duration = habitData ? habitData.duration : 0;

  useEffect(() => {
    const task = () => {
      if (state.deleted) {
        getActivity();
      }
    };

    return () => task();
  }, [state.deleted]);

  useEffect(() => {
    const task = () => {
      getHabit();
    };

    return () => task();
  }, [item]);

  useEffect(() => {
    const task = () => {
      const timePeriod = parseInt(duration);
      console.log("Duration", duration);
      const current = moment().format();
      console.log("Current", current);
      if (timePeriod > 0) {
        const habitTime = moment(item.id).add(timePeriod, "days").format();
        console.log("Addition", habitTime);
        if (current >= habitTime) {
          setStatus("Completed");
        } else {
          setStatus("Pending");
        }
      }
    };

    return () => task();
  }, [duration]);

  return (
    <>
      <Tile
        imageSrc={
          habitData ? (habitData.image ? { uri: habitData.image } : null) : null
        }
        title={habitData ? habitData.title : null}
        featured
        caption={habitData ? habitData.description : null}
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
      <View
        style={[
          styles.durationTile,
          { backgroundColor: colors.mustard, width: screenWidth * 0.95 },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon type="entypo" name="time-slot" color={colors.white} size={20} />
          <Text style={{ paddingHorizontal: 10, color: colors.whiteSmoke }}>
            Duration : {habitData ? habitData.duration : null} Days
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.durationTile,
          {
            backgroundColor: colors.secondary,
            width: screenWidth * 0.955,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            marginTop: -1,
          },
        ]}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            type="material-community"
            name="progress-clock"
            color={colors.white}
            size={20}
          />
          <Text style={{ paddingHorizontal: 10, color: colors.whiteSmoke }}>
            Status : {status}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "flex-end",
        }}
      >
        {remove ? (
          <Button
            raised
            type="solid"
            title="Remove"
            containerStyle={styles.buttonContainer}
            buttonStyle={{
              width: screenWidth * 0.3,
              borderRadius: 30,
              backgroundColor: colors.accent,
            }}
            onPress={() => {
              Alert.alert(
                "Delete!",
                "Are You Sure, You want to Delete?",
                [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      deleteActivity(item.id);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        ) : null}
        {/* <Button
          raised
          type="solid"
          title="Share"
          // onPress={() => navigate("EditCustomHabit", { item })}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            width: screenWidth * 0.3,
            borderRadius: 30,
            backgroundColor: colors.mauve,
          }}
        /> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
    alignSelf: "flex-end",
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: 5,
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
});

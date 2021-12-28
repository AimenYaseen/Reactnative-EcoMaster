import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
import { Tile, Icon, Button, Divider } from "react-native-elements";
import moment from "moment";

import colors from "../../constants/colors";

import { Firebase } from "../../Firebase/config";
import { Context as ActivityContext } from "../../context/ActivityContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ActivityCard = ({ item }) => {
  const { state, getActivity, deleteActivity, updateActivity } =
    useContext(ActivityContext);
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

    return task();
  }, [state.deleted]);

  useEffect(() => {
    const task = () => {
      getHabit();
    };

    return task();
  }, [item]);

  useEffect(() => {
    const task = () => {
      const timePeriod = parseInt(duration);
      console.log("Duration", duration);
      const current = moment().format();
      console.log("Current", current);
      if (timePeriod > 0) {
        const habitTime = moment(item.id).add(timePeriod, "days").format();
        // console.log("Previous", moment(item.id).format());
        var a = moment([2007, 0, 29]);
        var b = moment([2007, 0, 28]);
        // console.log(moment([2007, 0, 29]));
        //console.log(a.diff(b, "days"));
        //  console.log("Difference : ", habitTime.diff(current, "days"));
        console.log("Addition", habitTime);
        if (current >= habitTime) {
          setStatus("Completed");
          updateActivity(item.id, true);
          getActivity();
        } else {
          setStatus("Pending");
        }
      }
    };

    return task();
  }, [duration]);

  const share = (stat, data) => {
    console.log(data);
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", data.image)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        // here's base64 encoded image
        console.log(base64Data);
        const image = "data:image/jpeg;base64," + base64Data;
        const shareOptions = {
          title: data.title,
          message:
            `That's my Eco-Master progress for the ${data.title} \n` +
            // data.description +
            `Stage: ${data.duration} days (${status})` +
            "\nCheck out the app at: https://github.com/AimenYaseen/Reactnative-EcoMaster",
          url: image,
        };

        Share.open(shareOptions)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

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
        <Button
          raised
          type="solid"
          title="Share"
          onPress={() => share(status, habitData)}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            width: screenWidth * 0.3,
            borderRadius: 30,
            backgroundColor: colors.mauve,
          }}
        />
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

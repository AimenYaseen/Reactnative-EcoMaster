import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Tile, Card, Icon, Button, Divider } from "react-native-elements";

import colors from "../../constants/colors";
import { navigate } from "../../Navigation/NavigationRef";

import { Context as CustomContext } from "../../context/CustomHabitContext";
import moment from "moment";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const CustomHabitCard = ({ item }) => {
  const { state, deleteCustom, getCustom } = useContext(CustomContext);
  const [status, setStatus] = useState("Pending");

  const disable = status == "Completed" ? true : false;

  React.useEffect(() => {
    const task = () => {
      const current = moment().format();
      // console.log("current", current);
      if (item.duration) {
        const habitTime = moment(item.time)
          .add(parseInt(item.duration), "days")
          .format();
        // console.log("Completed", habitTime);
        if (current >= habitTime) {
          setStatus("Completed");
        } else {
          setStatus("Pending");
        }
      }
    };
    return () => task();
  }, []);

  React.useEffect(() => {
    const task = () => {
      if (state.deleted) {
        getCustom();
      }
    };

    return () => task();
  }, [state.deleted]);

  return (
    <>
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
        }}
        containerStyle={{
          marginTop: 15,
          alignSelf: "center",
        }}
      />
      <View style={[styles.durationTile, { backgroundColor: colors.mustard }]}>
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
            width: screenWidth * 0.955,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            marginTop: -1,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
        <Button
          disabled={disable}
          raised
          type="solid"
          title="Edit"
          onPress={() => navigate("EditCustomHabit", { item })}
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            width: screenWidth * 0.455,
            borderRadius: 30,
            backgroundColor: colors.mustard,
          }}
        />
        <Button
          raised
          type="solid"
          title="Delete"
          containerStyle={styles.buttonContainer}
          buttonStyle={{
            width: screenWidth * 0.455,
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
                  //onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    deleteCustom(item.id);
                    // setDeleted(true);
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 3,
    marginBottom: 5,
    // justifyContent: "flex-end",
    borderRadius: 30,
    marginRight: 7,
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

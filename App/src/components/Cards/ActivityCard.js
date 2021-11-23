import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Tile, Icon, Button, Divider } from "react-native-elements";

import colors from "../../constants/colors";

import { Firebase } from "../../Firebase/config";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const ActivityCard = ({ item }) => {
  const [habitData, setHabitData] = useState(null);

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

  useEffect(() => {
    getHabit();
  }, [item]);

  return (
    <>
      <Tile
        imageSrc={
          habitData ? (habitData.image ? { uri: habitData.image } : null) : null
        }
        title={habitData.title}
        featured
        caption={habitData.caption}
        width={screenWidth * 0.95}
        height={screenHeight * 0.3}
        imageContainerStyle={{
          borderRadius: 7,
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
            Duration : Days {habitData.duration}
          </Text>
        </View>
      </View>
      <View style={styles.durationTile}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            type="entypo"
            name="time-slot"
            color={colors.secondary}
            size={20}
          />
          <Text style={{ paddingHorizontal: 10 }}>Status :</Text>
        </View>
      </View>
      <Button
        raised
        type="solid"
        title="Share"
        // onPress={() => setVisible(true)}
        containerStyle={styles.buttonContainer}
        buttonStyle={{
          width: screenWidth * 0.5,
          borderRadius: 30,
          backgroundColor: colors.mauve,
        }}
      />
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

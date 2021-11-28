import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import Svg, { Circle, Defs, G, Marker, Path } from "react-native-svg";
import moment from "moment";

import { Firebase } from "../../Firebase/config";

import { Context as HabitContext } from "../../context/HabitTrackerContext";
import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const CustomMap = ({ item, index }) => {
  const { startHabit, updateHabit, getHabit, setLock } =
    useContext(HabitContext);
  const [habitData, setHabitData] = useState(null);
  const [habitColor, setHabitColor] = useState(`${colors.gray}`);

  let reward;

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

  const duration = habitData ? habitData.duration : 0;

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
      setHabitColor("#F7D201");
      const timePeriod = parseInt(duration);
      // console.log("NOW_____________");
      // console.log("current: ", moment().format());
      const current = moment().format();
      // console.log("previous: ", moment(item.time).format());
      if (timePeriod > 0) {
        const habitTime = moment(item.time).add(timePeriod, "days").format();
        if (current >= habitTime) {
          setHabitColor(`${colors.dullGreen}`);
          updateHabit(item.id, true);
          getHabit();
        }
      }
    }
  }, [duration]);

  return (
    <>
      {index == 0 ? (
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            height: screenHeight * 0.259,
            // width: screenWidth * 0.56,
            width: 300,
            marginTop: -30,
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{ position: "absolute" }}
          >
            <View
              style={[
                styles.outer,
                {
                  borderColor: habitColor,
                  marginLeft: 100,
                },
              ]}
            >
              <View
                style={[
                  styles.inner,
                  {
                    backgroundColor: habitColor,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          <Svg height={200} width={300}>
            <Path
              d="M 100 30 Q -60 120 120 160 Q 180 160 150 200"
              stroke={colors.mauve}
              fill="transparent"
              strokeWidth="10"
              strokeDasharray="15"
            />
            <Text style={[styles.text, { marginLeft: 155, marginTop: 40 }]}>
              {habitData ? habitData.title : null}
            </Text>
          </Svg>
        </View>
      ) : index % 2 != 0 ? (
        // ODD NUMBERS RIGHT CURVE
        <View
          style={{
            borderColor: "red",
            //borderWidth: 1,
            height: screenHeight * 0.259,
            width: 300,
            // width: screenWidth * 0.56,
            marginTop: -30,
          }}
        >
          <Svg
            // style={{ borderWidth: 2 }}
            height={200}
            width={300}
          >
            <TouchableOpacity onPress={() => console.log("Pressed")}>
              <View
                style={[
                  styles.outer,
                  {
                    marginLeft: 120,
                    borderColor: habitColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.inner,
                    {
                      backgroundColor: habitColor,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <Path
              d="M 160 30 Q 380 100 200 180 Q 200 180 150 193"
              stroke={colors.mauve}
              fill="transparent"
              strokeWidth="10"
              strokeDasharray="15"
            />
            <Text
              style={[
                styles.text,
                { marginRight: 100, marginTop: 0, marginLeft: 30 },
              ]}
            >
              {habitData ? habitData.title : null}
            </Text>
          </Svg>
        </View>
      ) : (
        // LEFT CURVE EVEN INDEX
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            height: screenHeight * 0.259,
            // width: screenWidth * 0.56,
            width: 300,
            marginTop: -30,
            //padding: 3,
            // marginRight: 80,
          }}
        >
          <Svg
            //style={{ borderWidth: 2 }}
            height={200}
            width={300}
          >
            <TouchableOpacity onPress={() => console.log("Pressed")}>
              <View
                style={[
                  styles.outer,
                  {
                    marginLeft: 100,
                    borderColor: habitColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.inner,
                    {
                      backgroundColor: habitColor,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <Path
              d="M 100 30 Q -60 140 120 193"
              stroke={colors.mauve}
              fill="transparent"
              strokeWidth="10"
              strokeDasharray="15"
            />
            <Text style={[styles.text, { marginLeft: 155, marginTop: -15 }]}>
              {habitData ? habitData.title : null}
            </Text>
          </Svg>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  outer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    padding: 2,
  },
  inner: {
    height: 42,
    width: 42,
    borderRadius: 21,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomMap;

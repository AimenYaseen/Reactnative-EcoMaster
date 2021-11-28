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
import { Firebase } from "../../Firebase/config";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const CustomMap = ({ item, index }) => {
  const [habitData, setHabitData] = useState(null);

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
                  marginLeft: 100,
                },
              ]}
            >
              <View style={styles.inner} />
            </View>
          </TouchableOpacity>
          <Svg height={200} width={300}>
            <Path
              d="M 100 30 Q -60 120 120 160 Q 180 160 150 200"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="15"
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
                    // , position: "absolute"
                  },
                ]}
              >
                <View style={styles.inner} />
              </View>
            </TouchableOpacity>
            <Path
              d="M 160 30 Q 380 100 200 180 Q 200 180 150 193"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="15"
              strokeDasharray="15"
            />
            <Text
              style={[
                styles.text,
                { marginRight: 100, marginTop: 5, marginLeft: 80 },
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
                    // , position: "absolute"
                  },
                ]}
              >
                <View style={styles.inner} />
              </View>
            </TouchableOpacity>
            <Path
              d="M 100 30 Q -60 140 120 193"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="15"
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
    borderColor: colors.secondary2,
    padding: 2,
  },
  inner: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: colors.secondary2,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomMap;

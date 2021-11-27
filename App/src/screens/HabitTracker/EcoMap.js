import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import Svg, { Circle, Defs, G, Marker, Path, Text } from "react-native-svg";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const EcoMap = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHead
        text="Eco Map"
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/habit_back2.jpg")}
      >
        <View
          style={{
            borderColor: "red",
            // borderWidth: 1,
            height: screenHeight * 0.259,
            width: screenWidth * 0.56,
            marginTop: -100,
            //padding: 3,
            // marginRight: 80,
          }}
        >
          <Svg
            //style={{ borderWidth: 2 }}
            height={200}
            width={200}
            //  viewBox="0 0 10 10"
            // xmlns="http://www.w3.org/2000/svg"
          >
            {/* <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 20 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 40 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 60 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 80 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 100 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 120 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 140 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 160 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 180 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 200 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M20 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M40 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M60 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M80 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M100 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M120 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M140 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M160 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M180 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M200 0 V200"
            /> */}
            <Defs>
              <Marker
                id="m1"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="9"
                markerHeight="9"
              >
                <G>
                  <Circle
                    cx="5"
                    cy="5"
                    r="5"
                    strokeWidth={0.5}
                    stroke={colors.gray}
                  />
                  <Circle cx="5" cy="5" r="4.3" fill={colors.gray} />
                </G>
              </Marker>
              {/* </View> */}
            </Defs>
            <Path
              d="M 120 30 Q 240 160 80 200"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="6"
              strokeDasharray="15"
              markerStart="url(#m1)"
            />
            <Text
              stroke="none"
              fill={colors.secondary}
              fontSize="20"
              fontWeight="bold"
              x="60"
              y="50"
              textAnchor="middle"
              textAlign="center"
            >
              Hello
            </Text>
          </Svg>
        </View>
        <View
          style={{
            borderColor: "red",
            //borderWidth: 1,
            height: screenHeight * 0.259,
            width: screenWidth * 0.56,
            marginTop: -30,
            //padding: 3,
            // marginRight: 80,
          }}
        >
          <Svg
            //style={{ borderWidth: 2 }}
            height={200}
            width={200}
            //  viewBox="0 0 10 10"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 20 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 40 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 60 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 80 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 100 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 120 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 140 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 160 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 180 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 200 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M20 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M40 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M60 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M80 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M100 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M120 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M140 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M160 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M180 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M200 0 V200"
            />
            <Defs>
              {/* <View style={styles.outerCircle}> */}
              <Marker
                id="m1"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="9"
                markerHeight="9"
              >
                <G>
                  <Circle
                    cx="5"
                    cy="5"
                    r="5"
                    strokeWidth={0.5}
                    stroke={colors.gray}
                  />
                  <Circle cx="5" cy="5" r="4.3" fill={colors.gray} />
                </G>
              </Marker>
              {/* </View> */}
            </Defs>
            <Path
              d="M 75 30 Q -60 140 120 200"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="6"
              // strokeDasharray="15"
              markerStart="url(#m1)"
            />
            <Text
              stroke="none"
              fill={colors.secondary}
              fontSize="20"
              fontWeight="bold"
              x="140"
              y="50"
              textAnchor="middle"
              textAlign="center"
            >
              Hello
            </Text>
          </Svg>
        </View>
        <View
          style={{
            borderColor: "red",
            borderWidth: 1,
            height: screenHeight * 0.259,
            width: screenWidth * 0.56,
            marginTop: -30,
            //padding: 3,
            // marginRight: 80,
          }}
        >
          <Svg
            style={{ borderWidth: 2 }}
            height={200}
            width={200}
            //  viewBox="0 0 10 10"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 20 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 40 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 60 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 80 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 100 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 120 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 140 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 160 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 180 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M0 200 H200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M20 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M40 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M60 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M80 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M100 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M120 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M140 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M160 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M180 0 V200"
            />
            <Path
              stroke="black"
              fill="transparent"
              strokeWidth="1"
              d="M200 0 V200"
            />
            <Defs>
              <Marker
                id="m1"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="9"
                markerHeight="9"
              >
                <G>
                  <Circle
                    cx="5"
                    cy="5"
                    r="5"
                    strokeWidth={0.5}
                    stroke={colors.gray}
                  />
                  <Circle cx="5" cy="5" r="4.3" fill={colors.gray} />
                </G>
              </Marker>
              {/* </View> */}
            </Defs>
            <Path
              d="M 120 30 Q 240 160 80 200"
              stroke={colors.secondary}
              fill="transparent"
              strokeWidth="6"
              strokeDasharray="15"
              markerStart="url(#m1)"
            />
            <Text
              stroke="none"
              fill={colors.secondary}
              fontSize="20"
              fontWeight="bold"
              x="60"
              y="50"
              textAnchor="middle"
              textAlign="center"
            >
              Hello
            </Text>
          </Svg>
        </View>
        <View style={styles.outer}>
          <View style={styles.inner} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    // paddingTop: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.83,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.gray,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 80,
  },
  outer: {
    height: 55,
    width: 55,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: colors.secondary2,
    padding: 3,
  },
  inner: {
    height: 45,
    width: 45,
    borderRadius: 22,
    backgroundColor: colors.secondary2,
  },
});

export default EcoMap;

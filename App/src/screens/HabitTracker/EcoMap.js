import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import Svg, { Circle, Defs, G, Marker, Path } from "react-native-svg";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import { Context as HabitContext } from "../../context/HabitTrackerContext";
import CustomMap from "../../components/CustomMap";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const EcoMap = ({ navigation }) => {
  const {
    state: { habits, loading },
    getHabit,
    getReward,
    clearReward,
  } = useContext(HabitContext);

  React.useEffect(() => {
    getHabit();
    const subscribe = navigation.addListener("focus", () => {
      getReward();
      getHabit();
    });

    const unsubscribe = navigation.addListener("blur", () => {
      clearReward();
    });

    return subscribe;
  }, []);

  const listEmpty = () => <View style={styles.container}></View>;

  const header = () => (
    <View style={{ alignItems: "center" }}>
      <View style={styles.outer}>
        <View style={styles.inner} />
      </View>
      <Text h4>Start Your Journey</Text>
    </View>
  );

  const footer = () => (
    <View
      style={{
        borderColor: "red",
        //borderWidth: 1,
        height: screenHeight * 0.32,
        width: 300,
        //marginBottom: -30,
      }}
    >
      <Text h4 style={{ textAlign: "center", marginBottom: 8 }}>
        Goal Accomplished
      </Text>
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
                marginLeft: 120,
                borderColor: colors.accent,
              },
            ]}
          >
            <View
              style={[
                styles.inner,
                {
                  backgroundColor: colors.accent,
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
      </Svg>
    </View>
  );

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
        <FlatList
          contentContainerStyle={{
            //borderWidth: 1,
            marginTop: 60,
            marginBottom: 10,
            alignItems: "center",
            paddingBottom: screenHeight * 0.2,
          }}
          inverted
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListHeaderComponentStyle={{
            alignItems: "center",
            marginTop: 20,
            marginBottom: -10,
          }}
          data={habits}
          initialNumToRender={habits.length}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          ListEmptyComponent={listEmpty}
          renderItem={({ item, index }) => {
            return <CustomMap item={item} index={index} />;
          }}
        />
        <Spinner
          size="large"
          visible={loading}
          color={colors.secondary}
          animation="fade"
          // overlayColor={colors.Blue}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.success,
    padding: 2,
  },
  inner: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: colors.success,
  },
});

export default EcoMap;

import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Text, Icon } from "react-native-elements";
import Svg, { Circle, Defs, G, Marker, Path } from "react-native-svg";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import { Context as HabitContext } from "../../context/HabitTrackerContext";
import CustomMap from "./CustomMap";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const EcoMap = ({ navigation }) => {
  const {
    state: { habits, loading },
    getHabit,
  } = useContext(HabitContext);

  React.useEffect(() => {
    getHabit();
    const unsubscribe = navigation.addListener("focus", () => {
      getHabit();
    });

    return unsubscribe;
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
        <Spinner visible={loading} color={colors.secondary} animation="fade" />
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

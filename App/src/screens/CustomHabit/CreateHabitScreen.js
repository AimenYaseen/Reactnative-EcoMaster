import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import { Context as CustomContext } from "../../context/CustomHabitContext";
import { TileCard } from "../../components/CustomCard";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("screen").height;

const CreateHabitScreen = ({ navigation }) => {
  const {
    state: { customHabit, loading },
    getCustom,
  } = useContext(CustomContext);

  React.useEffect(() => {
    getCustom();
    const unsubscribe = navigation.addListener("focus", () => {
      getCustom();
    });

    return unsubscribe;
  }, []);

  const filterHabits = async () => {
    const uid = await AsyncStorage.getItem("user");
    return customHabit.filter((habit) => {
      return habit.userId === uid;
    });
  };

  const habitList = filterHabits();

  const listEmpty = () => <View style={styles.container}></View>;

  return (
    <View style={{ flex: 1 }}>
      <CustomHead
        text="Your Habits"
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
        rightIcon={() => (
          <Icon
            name="plus"
            type="entypo"
            size={35}
            onPress={() => navigation.navigate("HabitForm")}
            color={colors.white}
          />
        )}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/vintage.jpg")}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: screenHeight * 0.2 }}
          showsVerticalScrollIndicator={false}
          data={habitList}
          ListEmptyComponent={listEmpty}
          initialNumToRender={habitList.length}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <>
                <TileCard item={item} />
              </>
            );
          }}
        />
        <Spinner visible={loading} color={colors.secondary} animation="fade" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
});

export default CreateHabitScreen;

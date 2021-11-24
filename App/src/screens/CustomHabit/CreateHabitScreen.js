import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import { Context as CustomContext } from "../../context/CustomHabitContext";
import { CustomHabitCard } from "../../components/Cards/CustomHabitCard";
import colors from "../../constants/colors";
import { Firebase } from "../../Firebase/config";

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

  const user = Firebase.auth().currentUser.uid;

  const filterHabits = () => {
    return customHabit.filter((habit) => {
      return habit.userId == user;
    });
  };

  const habitList = filterHabits();

  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}>You havn't created any habits</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
            onPress={() => navigation.navigate("AddCustomHabit")}
            color={colors.white}
          />
        )}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/abstract.jpg")}
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
                <CustomHabitCard item={item} />
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
});

export default CreateHabitScreen;

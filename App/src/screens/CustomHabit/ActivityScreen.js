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
import { Context as ActivityContext } from "../../context/ActivityContext";
import { ActivityCard } from "../../components/Cards/ActivityCard";
import colors from "../../constants/colors";
import { Firebase } from "../../Firebase/config";

const screenHeight = Dimensions.get("screen").height;

const ActivityScreen = ({ navigation }) => {
  const {
    state: { activity, loading },
    getActivity,
  } = useContext(ActivityContext);

  React.useEffect(() => {
    getActivity();
    const unsubscribe = navigation.addListener("focus", () => {
      getActivity();
    });

    return unsubscribe;
  }, []);

  const user = Firebase.auth().currentUser.uid;

  const filterHabits = () => {
    return activity.filter((activity) => {
      return activity.userId == user;
    });
  };

  const habitList = filterHabits();

  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}>You havn't selected any habits</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/gray-abstract.jpg")}
      >
        <CustomHead
          text="Active Habits"
          color="transparent"
          centerColor={colors.secondary}
          leftIcon={() => (
            <Icon
              name="chevron-left"
              type="entypo"
              size={30}
              onPress={() => navigation.navigate("MainFlow")}
              color={colors.secondary}
            />
          )}
          rightIcon={null}
        />
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
                <ActivityCard item={item} />
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

export default ActivityScreen;

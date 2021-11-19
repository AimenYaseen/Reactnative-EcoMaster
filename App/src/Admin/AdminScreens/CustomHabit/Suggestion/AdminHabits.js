import React, { useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

import { CustomCard } from "../../../components/Custom/CustomCard";
import { Context as CustomContext } from "../../../AdminContext/CustomContext";
import { habit as habitList } from "../../../../data/Suggestion/habit";

const screenHeight = Dimensions.get("screen").height;

export default AdminHabits = ({ navigation }) => {
  const {
    state: { customHabit },
    getCustom,
  } = useContext(CustomContext);

  React.useEffect(() => {
    getCustom();
    const unsubscribe = navigation.addListener("focus", () => {
      getCustom();
    });

    return unsubscribe;
  }, []);

  const filterHabits = () => {
    return customHabit.filter((habit) => {
      return habit.category === Habits;
    });
  };

  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}> There are no News yet... </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../../../assets/images/edit.jpeg")}
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
                <CustomCard
                  image={require("../../../../assets/images/leave.jpeg")}
                  title={item.title}
                  caption={item.caption}
                />
              </>
            );
          }}
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
    // backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.83,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.black,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 80,
  },
});

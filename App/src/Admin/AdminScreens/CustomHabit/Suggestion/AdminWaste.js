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

import { CustomCard } from "../../../components/Custom/CustomCard";
import { Context as CustomContext } from "../../../AdminContext/CustomContext";
import colors from "../../../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const AdminWaste = ({ navigation }) => {
  const {
    state: { customHabit, loading },
    getCustom,
  } = useContext(CustomContext);

  React.useEffect(() => {
    // getCustom();
    const unsubscribe = navigation.addListener("focus", () => {
      getCustom();
    });

    return unsubscribe;
  }, []);

  const filterHabits = () => {
    return customHabit.filter((habit) => {
      return habit.category === "Waste";
    });
  };

  const habitList = filterHabits();

  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}>There are no Suggestions yet!</Text>
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
                <CustomCard item={item} />
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
    color: colors.gray,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 80,
  },
});

export default AdminWaste;

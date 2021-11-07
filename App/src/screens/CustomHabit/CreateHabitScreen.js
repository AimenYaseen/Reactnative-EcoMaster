import React from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const CreateHabitScreen = ({ navigation }) => {
  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}> You do not have any Habits yet... </Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <NewsCard title={item.title} caption={item.caption} image={item.image} />
    );
  };

  return (
    <View>
      <CustomHead
        text="Your Habits"
        color={colors.white}
        centerColor={colors.secondary}
        leftIcon={null}
        rightIcon={() => (
          <Icon
            name="add-box"
            type="material-icons"
            size={35}
            onPress={() => navigation.navigate("HabitForm")}
            color={colors.secondary}
          />
        )}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: screenHeight * 0.04 }}
        ListEmptyComponent={listEmpty}
        // data={result}
        keyExtractor={(index) => index.toString()}
        // renderItem={renderItem}
      />
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

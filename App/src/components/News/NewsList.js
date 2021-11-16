import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

import colors from "../../constants/colors";
import { NewsCard } from "../Cards/NewsCard";

const screenHeight = Dimensions.get("screen").height;

const NewsList = ({ title, result }) => {
  if (!result.length) {
    return null;
  }

  const listEmpty = () => (
    <View style={styles.container}>
      <Text style={styles.text}> There are no feedbacks yet... </Text>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <NewsCard title={item.title} caption={item.caption} image={item.image} />
    );
  };

  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          paddingBottom: screenHeight * 0.04,
          paddingRight: screenHeight * 0.04,
        }}
        ListEmptyComponent={listEmpty}
        data={result}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 15,
    // marginLeft: 15,
    // marginBottom: 5,
  },
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

export default NewsList;

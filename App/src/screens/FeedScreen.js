import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

import { NewsCard } from "../components/Cards/NewsCard";
import colors from "../constants/colors";
import { news } from "../data/news";

const screenHeight = Dimensions.get("screen").height;

const FeedScreen = () => {
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
    <FlatList
      contentContainerStyle={{ paddingBottom: screenHeight * 0.1 }}
      ListEmptyComponent={listEmpty}
      data={news}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
  },
  text: {
    color: colors.gray,
  },
});

export default FeedScreen;

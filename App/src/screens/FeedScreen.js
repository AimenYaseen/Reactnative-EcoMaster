import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  InteractionManager,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Context as UserContext } from "../context/UserContext";
import { NewsCard } from "../components/Cards/NewsCard";
import NewsList from "../components/News/NewsList";
import colors from "../constants/colors";
import { news } from "../data/news";

const screenHeight = Dimensions.get("screen").height;

const FeedScreen = ({ navigation }) => {
  const { getUser } = useContext(UserContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getUser();
  //     const task = InteractionManager.runAfterInteractions(() => {
  //       getUser();
  //     });

  //     return () => {
  //       task.cancel();
  //     };
  //   }, [navigation])
  // );

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewsList title="Do You Know?" result={news} />
        <NewsList title="Information" result={news} />
        <NewsList title="Tips" result={news} />
        <View />
      </ScrollView>
    </View>
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

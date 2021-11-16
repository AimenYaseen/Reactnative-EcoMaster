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

import NewsList from "../components/News/NewsList";
import colors from "../constants/colors";
import { Context as NewsContext } from "../Admin/AdminContext/NewsContext";

const screenHeight = Dimensions.get("screen").height;

const FeedScreen = ({ navigation }) => {
  const { state, getNewsTips, getNewsInformation } = useContext(NewsContext);

  React.useEffect(() => {
    getNewsTips();
    getNewsInformation();

    const unsubscribe = navigation.addListener("focus", () => {
      getNewsTips();
      getNewsInformation();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NewsList title="Do You Know?" result={state.newsTips} />
        <NewsList title="Information" result={state.newsInformation} />
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";

import NewsList from "../../components/News/NewsList";
import colors from "../../constants/colors";
import { news } from "../../data/news";

const screenHeight = Dimensions.get("screen").height;

const AdminFeedScreen = () => {
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

export default AdminFeedScreen;

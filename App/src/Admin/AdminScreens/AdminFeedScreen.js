import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import NewsList from "../components/News/NewsList";
import colors from "../../constants/colors";
import { Context as NewsContext } from "../AdminContext/NewsContext";

const screenHeight = Dimensions.get("screen").height;

const AdminFeedScreen = ({ navigation }) => {
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
        <NewsList title="Tips" result={state.newsTips} />
        <NewsList title="Information" result={state.newsInformation} />
        <View />
      </ScrollView>
      <Spinner
        visible={state.loading}
        color={colors.secondary}
        animation="fade"
        overlayColor={"rgba(0,0,0, 0.50)"}
        textContent={"Loading..."}
        textStyle={{
          fontSize: 18,
          // marginTop: -130,
          marginLeft: 15,
          //  textAlign: "center",
          color: colors.secondary,
        }}
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
    height: screenHeight,
  },
  text: {
    color: colors.gray,
  },
});

export default AdminFeedScreen;

import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../constants/colors";
import { CustomHead } from "../../../components/CustomHead";
import NewsForm from "../../components/News/NewsForm";
import { Context as NewsContext } from "../../AdminContext/NewsContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddNews = ({ navigation }) => {
  const {
    state: { loading },
    addNews,
  } = useContext(NewsContext);

  return (
    <View style={styles.container}>
      <CustomHead
        text="Add News"
        color={colors.success}
        statusColor={colors.success}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("AdminMainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={null}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../assets/news_back.jpg")}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewsForm
            loading={loading}
            text="Add"
            imageVisible={false}
            onPress={async (
              newsCategory,
              newsTitle,
              newsCaption,
              newsImage,
              time
            ) =>
              await addNews(
                newsCategory,
                newsTitle,
                newsCaption,
                newsImage,
                time
              )
            }
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: colors.white,
  },
  background: {
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    // paddingTop: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
});

export default AddNews;

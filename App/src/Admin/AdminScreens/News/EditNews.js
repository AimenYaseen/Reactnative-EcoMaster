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

const EditNews = ({ navigation, route }) => {
  const {
    state: { loading },
    editNews,
  } = useContext(NewsContext);

  const item = route.params.item;
  const title = route.params.title;
  return (
    <View style={styles.container}>
      <CustomHead
        text="Edit News"
        color={colors.mustard}
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
            text="Edit"
            newsTitle={item.title}
            newsCaption={item.caption}
            newsCategory={title}
            newsImage={item.image}
            imageVisible={true}
            onPress={async (
              newsCategory,
              newsTitle,
              newsCaption,
              newsImage,
              time
            ) =>
              await editNews(
                item.id,
                newsCategory,
                newsTitle,
                newsCaption,
                newsImage
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

export default EditNews;

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
import CustomForm from "../../components/Custom/CustomForm";
import { Context as CustomContext } from "../../AdminContext/CustomContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddCustom = ({ navigation }) => {
  const {
    state: { loading },
    addCustom,
  } = useContext(CustomContext);

  return (
    <View style={styles.container}>
      <CustomHead
        text="Add Suggestions"
        color={colors.success}
        statusColor={colors.success}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("AdminCustom")}
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
          <CustomForm
            loading={loading}
            text="Add"
            imageVisible={false}
            onPress={async (
              customCategory,
              customTitle,
              customDescription,
              customDuration,
              customImage,
              time
            ) => {
              console.log("Pressed");
              await addCustom(
                customCategory,
                customTitle,
                customDescription,
                customDuration,
                customImage,
                time
              );
            }}
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

export default AddCustom;

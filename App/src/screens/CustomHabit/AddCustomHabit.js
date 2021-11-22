import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import colors from "../../constants/colors";
import CustomHabitForm from "../../components/CustomHabitForm";
import { Context as CustomContext } from "../../context/CustomHabitContext";

const AddCustomHabit = ({ navigation }) => {
  const {
    state: { loading },
    addCustom,
  } = useContext(CustomContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/white.jpg")}
      >
        <CustomHead
          text="Create Post"
          color="transparent"
          centerColor={colors.secondary}
          leftIcon={() => (
            <Icon
              name="chevron-left"
              type="entypo"
              size={30}
              onPress={() =>
                navigation.navigate("Custom", { screen: "CreateHabit" })
              }
              color={colors.secondary}
            />
          )}
          rightIcon={null}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomHabitForm
            text="Add"
            imageVisible={false}
            onPress={async (
              customTitle,
              customDescription,
              customDuration,
              customImage,
              time
            ) => {
              console.log("Pressed");
              await addCustom(
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

export default AddCustomHabit;

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

const EditCustomHabit = ({ navigation, route }) => {
  const {
    state: { loading },
    editCustom,
  } = useContext(CustomContext);

  const item = route.params.item;
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/white.jpg")}
      >
        <CustomHead
          text="Edit Habit"
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
            text="Edit"
            customTitle={item.title}
            customDescription={item.description}
            customDuration={item.duration}
            customImage={item.image}
            imageVisible={true}
            onPress={async (
              customTitle,
              customDescription,
              customDuration,
              customImage
            ) => {
              console.log("Pressed");
              await editCustom(
                item.id,
                customTitle,
                customDescription,
                customDuration,
                customImage
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

export default EditCustomHabit;

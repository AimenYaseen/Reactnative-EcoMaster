import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { TileCard } from "../../../components/CustomCard";

export default Habits = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/edit.jpeg")}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TileCard
            image={require("../../../assets/images/leave.jpeg")}
            title="Zero to Hero"
            caption="Some Caption Text"
          />
          <TileCard
            image={require("../../../assets/images/leave.jpeg")}
            title="Zero to Hero"
            caption="Some Caption Text"
          />
          <TileCard
            image={require("../../../assets/images/leave.jpeg")}
            title="Zero to Hero"
            caption="Some Caption Text"
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    //justifyContent: "center",
    resizeMode: "contain",
    paddingHorizontal: 10,
  },
});

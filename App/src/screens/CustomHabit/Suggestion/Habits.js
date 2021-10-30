import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { TileCard } from "../../../components/CustomCard";

import { habit as habitList } from "../../../data/Suggestion/habit";

const screenHeight = Dimensions.get("screen").height;

export default Habits = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/edit.jpeg")}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: screenHeight * 0.2 }}
          showsVerticalScrollIndicator={false}
          data={habitList}
          initialNumToRender={habitList.length}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <>
                <TileCard
                  image={require("../../../assets/images/leave.jpeg")}
                  title={item.title}
                  caption={item.caption}
                />
              </>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    //paddingTop: screenHeight * 0.1,
    flex: 1,
    //height: screenHeight * 1.1,
    //justifyContent: "center",
    resizeMode: "contain",
    paddingHorizontal: 10,
  },
});

import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { CustomCard } from "../../../components/Custom/CustomCard";

import { habit as habitList } from "../../../../data/Suggestion/habit";

const screenHeight = Dimensions.get("screen").height;

export default AdminHabits = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../../../assets/images/edit.jpeg")}
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
                <CustomCard
                  image={require("../../../../assets/images/leave.jpeg")}
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
    flex: 1,
    resizeMode: "contain",
  },
});

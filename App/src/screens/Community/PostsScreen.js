import React from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { Icon } from "react-native-elements";
import { CommunityCard } from "../../components/Cards/CommunityCard";

import { CustomHead } from "../../components/CustomHead";
import { Posts } from "../../data/posts";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;

const PostsScreen = ({ navigation }) => {
  return (
    <>
      <CustomHead
        text="Community"
        color="white"
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={32}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.secondary}
          />
        )}
        rightIcon={() => (
          <Icon
            name="add"
            type="ionicons"
            size={36}
            onPress={() => navigation.navigate("AddPost")}
            color={colors.secondary}
          />
        )}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            padding: 0,
            paddingBottom: screenHeight * 0.1,
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={Posts.length}
          data={Posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommunityCard item={item} activeLike={true} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    //padding: 0,
    //paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
});

export default PostsScreen;

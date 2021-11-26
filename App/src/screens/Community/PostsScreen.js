import React, { useState, useContext } from "react";
import { FlatList, StyleSheet, Dimensions, View, Text } from "react-native";
import { Icon, FAB, SpeedDial } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { CommunityCard } from "../../components/Cards/CommunityCard";

import { CustomHead } from "../../components/CustomHead";
import Spinner from "react-native-loading-spinner-overlay";
import { Context as PostContext } from "../../context/PostContext";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const PostsScreen = ({ navigation }) => {
  const {
    state: { posts, loading },
    getPost,
  } = useContext(PostContext);

  useFocusEffect(
    React.useCallback(() => {
      getPost();
      const task = () => {
        getPost();
      };

      return () => {
        task();
      };
    }, [navigation])
  );

  const listEmpty = () => (
    <View style={styles.container2}>
      {/* <Text style={styles.text}> There are no posts yet... </Text> */}
    </View>
  );

  return (
    <>
      {/* {console.log(posts)} */}
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
        rightIcon={null}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            padding: 0,
            width: screenWidth * 1,
            paddingBottom: screenHeight * 0.1,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={listEmpty}
          initialNumToRender={posts.length}
          data={posts.reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <CommunityCard item={item} />
            </>
          )}
        />
        <FAB
          //raised
          size="large"
          title={
            <Icon
              name="add"
              type="ionicons"
              size={30}
              onPress={() => navigation.navigate("AddPost")}
              color={colors.white}
            />
          }
          iconContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          placement="right"
          color={colors.secondary}
          buttonStyle={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
        <Spinner visible={loading} color={colors.secondary} animation="fade" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  buttonContainer: {
    margin: screenWidth * 0.1,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  container2: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.83,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.gray,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 80,
  },
});

export default PostsScreen;

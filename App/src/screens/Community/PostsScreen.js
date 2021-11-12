import React, { useEffect, useContext } from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import { Icon, FAB, SpeedDial } from "react-native-elements";
import { CommunityCard } from "../../components/Cards/CommunityCard";

import { CustomHead } from "../../components/CustomHead";
import Spinner from "react-native-loading-spinner-overlay";
import { Context as PostContext } from "../../context/PostContext";
import { Posts } from "../../data/posts";
import colors from "../../constants/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const PostsScreen = ({ navigation }) => {
  const {
    state: { posts, loading },
    getPost,
  } = useContext(PostContext);

  useEffect(() => {
    getPost();
  }, []);

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
          initialNumToRender={posts.length}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CommunityCard item={item} activeLike={true} />
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
});

export default PostsScreen;

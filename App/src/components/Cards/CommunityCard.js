import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Firebase } from "../../Firebase/config";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import moment from "moment";

import colors from "../../constants/colors";

export const CommunityCard = ({ item }) => {
  const [userData, setUserData] = useState(null);
  const likeIcon = item.liked ? "heart" : "heart-outline";
  const likeIconColor = item.liked ? colors.like : colors.gray4;

  let likeText;
  let commentText;

  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  if (item.comments == 1) {
    commentText = "1 Comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " Comments";
  } else {
    commentText = "Comment";
  }

  const getUser = async () => {
    try {
      await Firebase.database()
        .ref("Users/" + item.userId)
        .once("value", async (snapshot) => {
          if (snapshot.exists) {
            const data = await snapshot.val();
            // console.log(data);
            setUserData(data);
          }
        });
    } catch (error) {
      //loader
      Alert.alert("ERROR!", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [item]);

  let defaultImage = require("../../assets/images/default/default-user.jpeg");
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.userInfo}>
        <Image
          source={
            userData
              ? userData.image
                ? { uri: userData.image }
                : defaultImage
              : defaultImage
          }
          style={styles.userImg}
        />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>
            {userData ? `${userData.firstName} ` : "Test"}
            {userData ? userData.lastName : "User"}
          </Text>
          <Text style={styles.postTime}>{moment(item.postTime).fromNow()}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.postImage ? (
        <Card.Image source={{ uri: item.postImage }} style={styles.postImage} />
      ) : (
        <Card.Divider style={styles.divider} />
      )}
      <View style={styles.interactionWrapper}>
        <TouchableOpacity
          style={[
            styles.interaction,
            { backgroundColor: item.liked ? colors.select : "transparent" },
          ]}
        >
          <Icon
            name={likeIcon}
            type="ionicon"
            size={25}
            color={likeIconColor}
          />
          <Text style={[styles.interactionText, { color: likeIconColor }]}>
            {likeText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
          <Icon name="md-chatbubble-outline" type="ionicon" size={25} />
          <Text style={styles.interactionText}>{commentText}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.whiteSmoke,
    // width: "100%",
    marginBottom: 5,
    borderRadius: 10,
    padding: 0,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 12,
  },
  divider: {
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 0,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: colors.gray3,
  },
  postText: { fontSize: 14, paddingHorizontal: 12 },
  postImage: {
    width: "100%",
    height: 250,
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  interactionText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.gray4,
    marginTop: 4,
    marginLeft: 5,
  },
});

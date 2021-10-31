import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

import colors from "../../constants/colors";

export const CommunityCard = ({ item, activeLike, activeComment }) => {
  const likeIcon = item.liked ? "heart" : "heart-outline";
  const likeIconColor = item.liked ? "#2e64e5" : "#333";

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

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.userInfo}>
        <Image source={item.userImg} style={styles.userImg} />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.postTime}>{item.postTime}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.postImg ? (
        <Card.Image source={item.postImg} style={styles.postImage} />
      ) : (
        <Card.Divider style={styles.divider} />
      )}
      <View style={styles.interactionWrapper}>
        <TouchableOpacity
          style={[
            styles.interaction,
            { backgroundColor: item.liked ? "#2e64e515" : "transparent" },
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
    backgroundColor: "#f8f8f8",
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
    color: "#666",
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
    color: "#333",
    marginTop: 4,
    marginLeft: 5,
  },
});

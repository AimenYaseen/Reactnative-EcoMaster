import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import moment from "moment";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Firebase } from "../../Firebase/config";

import colors from "../../constants/colors";
import { Context as PostContext } from "../../context/PostContext";

export const CommunityCard = ({ item }) => {
  const { getPost } = useContext(PostContext);
  const [userData, setUserData] = useState(null);
  // const fileUri = FileSystem.cacheDirectory + "tmp.jpg";
  // const imageURL = item ? (item.postImage ? item.postImage : null) : null;
  const user = Firebase.auth().currentUser.uid;
  let liked = false;

  item.likedBy.includes(user) ? (liked = true) : (liked = false);

  const likeIcon = liked ? "heart" : "heart-outline";
  const likeIconColor = liked ? colors.like : colors.gray4;

  let likeText;

  if (item.likedBy.length == 2) {
    likeText = " 1 Like";
  } else if (item.likedBy.length > 2) {
    likeText = item.likedBy.length - 1 + " Likes";
  } else {
    likeText = " Like";
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

  // const onShare = async () => {
  //   await Sharing.isAvailableAsync().then(async (available) => {
  //     if (available) {
  //       Alert.alert("Congratulations!", "Sharing is available");
  //       const options = {
  //         mimeType: "image/jpeg",
  //         dialogTitle: item.post,
  //         UTI: "image/jpeg",
  //       };

  //       await FileSystem.downloadAsync(item.postImage, fileUri)
  //         .then(({ uri }) => {
  //           Alert.alert("Image Downloaded \n", uri);
  //         })
  //         .catch((error) => {
  //           Alert.alert("ERROR!", JSON.stringify(error.message));
  //         });

  //       // Sharing only allows one to share a file.
  //       await Sharing.shareAsync(fileUri, options)
  //         .then((data) => {
  //           Alert.alert("Image Shared \n", data);
  //         })
  //         .catch((error) => {
  //           Alert.alert("ERROR!", JSON.stringify(error.message));
  //         });
  //     } else {
  //       Alert.alert("ERROR!", "Sharing is NOT available");
  //     }
  //   });
  // };

  const onLike = async () => {
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref(`Posts/${item.id}/likedBy/` + uid)
      .set(uid)
      .then(() => {
        getPost();
      })
      .catch((error) => Alert.alert("ERROR!", error.message));
  };

  const onDislike = async () => {
    const uid = await AsyncStorage.getItem("user");
    await Firebase.database()
      .ref(`Posts/${item.id}/likedBy/` + uid)
      .remove()
      .then(() => {
        getPost();
      })
      .catch((error) => Alert.alert("ERROR!", error.message));
  };

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
          onPress={liked ? onDislike : onLike}
        >
          <Icon
            name={likeIcon}
            type="ionicon"
            size={22}
            color={likeIconColor}
            style={{ marginTop: 3 }}
          />
          <Text style={[styles.interactionText, { color: likeIconColor }]}>
            {likeText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.interaction}
          // onPress={onShare}
        >
          <Icon
            name="share-2"
            type="feather"
            size={20}
            style={{ marginTop: 3 }}
          />
          <Text style={styles.interactionText}> Share</Text>
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
    fontSize: 14,
    fontWeight: "bold",
    color: colors.gray4,
    marginTop: 4,
    marginLeft: 5,
  },
});

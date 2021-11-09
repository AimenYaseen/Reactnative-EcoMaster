import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import {
  Icon,
  Avatar,
  ListItem,
  BottomSheet,
  Button,
} from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import Spinner from "react-native-loading-spinner-overlay";
import { Context as UserContext } from "../../context/UserContext";
import { Context as PostContext } from "../../context/PostContext";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddPost = ({ navigation }) => {
  const {
    state: { loading, imageUrl },
    addPost,
    uploadPostImage,
  } = useContext(PostContext);
  const {
    state: { userData },
    getUser,
  } = useContext(UserContext);

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const likes = 5;
  const time = Date.now();

  const list = [
    {
      title: "Choose Image",
      containerStyle: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        //marginTop: 10,
      },
      onPress: () => openImagePickerAsync(),
    },
    { title: "Take Picture", onPress: () => openImagePickerCameraAsync() },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setVisible(false),
    },
  ];

  let defaultImage = require("../../assets/images/default/default-user.jpeg");
  // ________________________LIBRARY_________________________
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };
  // _______________________CAMERA____________________________
  let openImagePickerCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  return (
    <>
      <CustomHead
        text="Create Post"
        color={colors.whiteSmoke}
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("Post")}
            color={colors.secondary}
          />
        )}
        rightIcon={null}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
          backgroundColor: colors.whiteSmoke,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
              //borderWidth: 1,
            }}
          >
            <Avatar
              rounded
              source={
                userData.image
                  ? { uri: userData.image }
                  : require("../../assets/images/default/default-user.jpeg")
              }
              size={50}
              containerStyle={styles.avatar}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="What's On Your Mind?"
            multiline
            onChangeText={(text) => setPost(text)}
          />
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : null}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Button
              raised
              type="solid"
              title="Choose an Image"
              onPress={() => setVisible(true)}
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                width: screenWidth * 0.5,
                borderRadius: 30,
                backgroundColor: colors.blue,
              }}
            />
            <Button
              raised
              type="solid"
              title="Add Post"
              onPress={() => {
                if (image) {
                  uploadPostImage(image);
                }
                if (imageUrl) {
                  addPost({ post, image: imageUrl, time, likes });
                  //getUser();
                  navigation.navigate("Post");
                } else {
                  updateUser({ post, image, time, likes });
                  getUser();
                  navigation.navigate("Post");
                }
              }}
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                width: screenWidth * 0.25,
                borderRadius: 30,
                backgroundColor: colors.blue,
              }}
            />
          </View>
          <BottomSheet
            isVisible={visible}
            containerStyle={{
              backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
              // borderTopRightRadius: 20,
              //borderTopLeftRadius: 20,
              //paddingTop: 10,
            }}
          >
            {list.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}
              >
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
          <Spinner
            visible={loading}
            color={colors.secondary}
            animation="fade"
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.whiteSmoke,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 15,
    borderRadius: 30,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  imageText: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.gray3,
    marginVertical: 10,
    padding: 5,
  },
  input: {
    padding: 15,
    width: "100%",
    height: "auto",
    borderRadius: 10,
    fontSize: 24,
    backgroundColor: colors.whiteSmoke,
    borderColor: colors.blue,
  },
  avatar: {
    top: screenHeight * 0.03,
    alignSelf: "center",
    marginBottom: screenHeight * 0.06,
    marginRight: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default AddPost;

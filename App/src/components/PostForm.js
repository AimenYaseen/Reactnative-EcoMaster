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
import { Firebase } from "../../Firebase/config";

import { CustomHead } from "../../components/CustomHead";
import Spinner from "react-native-loading-spinner-overlay";
import { Context as UserContext } from "../../context/UserContext";
import { Context as PostContext } from "../../context/PostContext";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const PostForm = ({ navigation }) => {
  const {
    state: { loading },
    addPost,
  } = useContext(PostContext);
  const {
    state: { userData },
  } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const likes = 5;
  let time = new Date().getTime();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setPost("");
      setImage(null);
    });

    return unsubscribe;
  }, [navigation]);

  const uploadImage = async () => {
    if (image == null) {
      return "";
    }
    const Uri = image;
    let filename = Uri.substring(Uri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    setUploading(true);

    let uploadUri;
    try {
      const response = await fetch(image);
      uploadUri = await response.blob();
    } catch (error) {
      dispatch({ type: "loader", payload: false });
      Alert.alert("ERROR", error.message);
    }

    const storageRef = Firebase.storage().ref("postImages/").child(filename);
    const task = storageRef.put(uploadUri, {
      contentType: "image/jpeg",
    });

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      console.log(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);

      return url;
    } catch (error) {
      setUploading(false);
      Alert.alert("ERROR", error.message);
      return null;
    }
  };

  const onSubmitHandle = async () => {
    const imageUrl = await uploadImage();
    await addPost(post, imageUrl, time, likes);
  };

  const list = [
    {
      title: "Choose Image",
      containerStyle: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        //marginTop: 10,
      },
      onPress: () => {
        openImagePickerAsync();
        setVisible(false);
      },
    },
    {
      title: "Take Picture",
      onPress: () => {
        openImagePickerCameraAsync();
        setVisible(false);
      },
    },
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
      width: 1200,
      height: 780,
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
      width: 1200,
      height: 780,
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  return (
    <>
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
              source={userData.image ? { uri: userData.image } : defaultImage}
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
              onPress={onSubmitHandle}
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
            visible={uploading}
            color={colors.secondary}
            animation="fade"
            overlayColor={"rgba(0,0,0, 0.50)"}
            textContent={"Loading..."}
            textStyle={{
              fontSize: 18,
              // marginTop: -130,
              marginLeft: 15,
              //  textAlign: "center",
              color: colors.secondary,
            }}
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
    height: 250,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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

export default PostForm;

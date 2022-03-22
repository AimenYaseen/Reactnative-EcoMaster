import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import { ListItem, BottomSheet, Button } from "react-native-elements";
import { Firebase } from "../../../Firebase/config";

import colors from "../../../constants/colors";
import { BlockInput } from "../../../components/CustomInput";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const NewsForm = ({
  // newsTitle,
  newsCaption,
  text,
  newsCategory,
  newsImage,
  imageVisible,
  onPress,
  loading,
}) => {
  // const [title, setTitle] = useState(newsTitle);
  const [caption, setCaption] = useState(newsCaption);
  const [category, setCategory] = useState(newsCategory);
  const [uploading, setUploading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  let time = new Date().getTime();

  const disabled = image || newsImage ? false : true;

  const uploadImage = async () => {
    if (image == null) {
      return null;
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

    const storageRef = Firebase.storage().ref("newsImages/").child(filename);
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
    let imageUrl = await uploadImage();
    if (imageUrl === null && newsImage) {
      imageUrl = newsImage;
    }
    if (category == "Information" || category == "Tips") {
      onPress(category, caption, imageUrl, time);
    } else {
      Alert.alert(
        "ERROR!",
        "You have entered the wrong Category name, Please Try Again with Information/Tips..."
      );
    }
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

  // let defaultImage = require("../../assets/images/default/default-user.jpeg");
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
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        {
          flexGrow: 1,
          paddingBottom: 30,
          backgroundColor: colors.whiteSmoke,
          borderColor: colors.secondary,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <BlockInput
        disabled={text === "Edit" ? true : false}
        label="Category"
        value={category}
        placeholder="Information / Tips"
        multiline={false}
        onChangeText={(text) => setCategory(text)}
      />
      {/* <BlockInput
        label="Title"
        value={title}
        placeholder="News Title"
        multiline={false}
        onChangeText={(text) => setTitle(text)}
      /> */}
      <BlockInput
        label="Description"
        value={caption}
        placeholder="News Description"
        multiline={true}
        onChangeText={(text) => setCaption(text)}
      />
      {disabled ? (
        <Text
          style={{
            fontStyle: "italic",
            color: colors.gray,
            marginTop: -10,
            marginBottom: 5,
          }}
        >
          Image is compulsory...
        </Text>
      ) : null}
      {image || newsImage ? <Text style={styles.imageText}>Image</Text> : null}
      {imageVisible ? (
        <Image
          source={
            image ? { uri: image } : newsImage ? { uri: newsImage } : null
          }
          style={styles.image}
        />
      ) : image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : null}
      <Button
        raised
        type="solid"
        title="Choose an Image"
        onPress={() => setVisible(true)}
        containerStyle={styles.buttonContainer}
        buttonStyle={{
          width: screenWidth * 0.5,
          borderRadius: 30,
          backgroundColor: colors.mauve,
        }}
      />
      <Button
        raised
        disabled={disabled}
        type="solid"
        title={`${text} News`}
        onPress={onSubmitHandle}
        containerStyle={styles.buttonContainer}
        buttonStyle={{
          width: screenWidth * 0.5,
          borderRadius: 30,
          backgroundColor: text === "Edit" ? colors.mustard : colors.success,
        }}
      />
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
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <Spinner
        visible={loading || uploading}
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
    </KeyboardAwareScrollView>
  );
};

NewsForm.defaultProps = () => {
  return {
    newsTitle: "",
    newsCategory: "",
    newsCaption: "",
    newsImage: "",
  };
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    //marginLeft: 15,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
  },
  container: {
    marginVertical: screenHeight * 0.05,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingTop: 30,
    // backgroundColor: colors.whiteSmoke,
    height: "auto",
    width: screenWidth * 0.9,
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 30,
  },
  image: {
    width: "95%",
    height: 200,
    borderRadius: 10,
    margin: 5,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  imageText: {
    alignSelf: "flex-start",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
    marginTop: -5,
  },
  input: {
    marginHorizontal: screenWidth * 0.02,
  },
});

export default NewsForm;

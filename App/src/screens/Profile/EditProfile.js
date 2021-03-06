import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Icon,
  ListItem,
  BottomSheet,
  Input,
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CountryPicker from "react-native-country-picker-modal";
//import CountryPicker from "react-native-region-country-picker";
import Spinner from "react-native-loading-spinner-overlay";
import { Firebase } from "../../Firebase/config";

import { CustomHead } from "../../components/CustomHead";
import { SimpleInput } from "../../components/CustomInput";
import colors from "../../constants/colors";
import { Context as UserContext } from "../../context/UserContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EditScreen = ({ navigation }) => {
  const {
    state: { userData, loading },
    getUser,
    updateUser,
  } = useContext(UserContext);

  const [firstName, setFirstname] = useState(userData.firstName);
  const [lastName, setLastname] = useState(userData.lastName);
  const [country, setCountry] = useState(userData.country);
  const [bio, setBio] = useState(userData.bio);

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [uploading, setUploading] = useState(false);
  let countryPickerRef = undefined;

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

    const storageRef = Firebase.storage().ref("userImages/").child(filename);
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
      setImage(null);

      return url;
    } catch (error) {
      setUploading(false);
      Alert.alert("ERROR", error.message);
      return null;
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

  const rightIcon = () => (
    <Icon
      name="check-circle"
      type="material-icons"
      size={30}
      onPress={async () => {
        let imgUrl = await uploadImage();

        if (imgUrl === null && userData.image) {
          imgUrl = userData.image;
        }

        await updateUser(imgUrl, bio, firstName, lastName, country);
      }}
      color={colors.secondary}
    />
  );

  const leftIcon = () => (
    <Icon
      name="cancel"
      type="material-icons"
      size={30}
      onPress={() => navigation.navigate("Profile")}
      color={colors.secondary}
    />
  );

  let defaultImage = require("../../assets/images/default/default-user.jpeg");
  // IMAGE FROM LIBRARY
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      width: 300,
      height: 300,
      allowsEditing: true,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };
  // IMAGE FROM CAMERA
  let openImagePickerCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      width: 300,
      height: 300,
    });
    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  return (
    <>
      {/* {console.log(image)} */}
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/white.jpg")}
        //blurRadius={2}
      >
        <CustomHead
          // text="Profile"
          color="transparent"
          centerColor={null}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.container}>
            <Avatar
              rounded
              source={
                image
                  ? { uri: image }
                  : userData.image
                  ? { uri: userData.image }
                  : defaultImage
              }
              size={140}
              containerStyle={styles.avatar}
            >
              <Avatar.Accessory
                //solid
                reverse
                name="edit-2"
                type="feather"
                size={24}
                onPress={() => setVisible(true)}
                color={colors.secondary}
                containerStyle={styles.iconContainer}
              />
            </Avatar>
            <View style={styles.input}>
              <SimpleInput
                label="Bio"
                placeholder="Your short bio upto 120 words..."
                maxLength={120}
                value={bio}
                onChangeText={(text) => setBio(text)}
              />
              <Text
                style={{
                  color: colors.gray,
                  marginTop: -20,
                  marginHorizontal: 10,
                  marginBottom: 15,
                }}
              >
                Your bio is shown on your profile...
              </Text>
              <SimpleInput
                label="First Name"
                value={firstName}
                placeholder="first"
                onChangeText={(text) => setFirstname(text)}
              />
              <SimpleInput
                label="Last Name"
                placeholder="last"
                value={lastName}
                onChangeText={(text) => setLastname(text)}
              />
              <SimpleInput
                label="Country"
                placeholder="Country"
                // value={JSON.stringify(country, null, 2)}
                isEditable={false}
                value={country}
                rightIcon={
                  <Icon
                    name="circledown"
                    type="ant-design"
                    size={25}
                    color={colors.secondary}
                    onPress={() => {
                      //countryPickerRef.open();
                      setVisible2(true);
                    }}
                  />
                }
              />
            </View>
            {/* <CountryPicker
              countryPickerRef={(ref) => {
                countryPickerRef = ref;
              }}
              enable={true}
              darkMode={false}
              countryCode={"US"}
              containerConfig={{
                showFlag: true,
                showCallingCode: true,
                showCountryName: true,
                showCountryCode: true,
              }}
              modalConfig={{
                showFlag: true,
                showCallingCode: true,
                showCountryName: true,
                showCountryCode: true,
              }}
              onSelectCountry={(data) => {
                console.log("DATA", data);
              }}
              onInit={(data) => {
                console.log("DATA", data);
              }}
              onOpen={() => {
                console.log("Open");
              }}
              onClose={() => {
                console.log("Close");
                countryPickerRef.close();
              }}
              // containerStyle={{
              //   container: {},
              //   flagStyle: {},
              //   callingCodeStyle: {},
              //   countryCodeStyle: {},
              //   countryNameStyle: {},
              // }}
              // modalStyle={{
              //   container: {},
              //   searchStyle: {},
              //   tileStyle: {},
              //   itemStyle: {
              //     itemContainer: {},
              //     flagStyle: {},
              //     countryCodeStyle: {},
              //     countryNameStyle: {},
              //     callingNameStyle: {},
              //   },
              // }}
              title={"Country"}
              searchPlaceholder={"Search"}
              showCloseButton={true}
              showModalTitle={true}
            /> */}
            <CountryPicker
              placeholder=""
              withEmoji={true}
              onSelect={(country) => setCountry(country.name)}
              visible={visible2}
              onClose={() => setVisible2(false)}
              containerButtonStyle={{ color: "#3h3h3h" }}
              withAlphaFilter
              withFilter
              withFlag
            />

            <BottomSheet
              isVisible={visible}
              containerStyle={{
                backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
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
          </View>
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
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    //alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
  avatar: {
    top: screenHeight * 0.03,
    alignSelf: "center",
    resizeMode: "contain",
    height: 130,
    width: 130,
    marginBottom: screenHeight * 0.1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 10,
  },
  input: {
    marginHorizontal: screenWidth * 0.03,
  },
  iconContainer: { marginRight: 20, bottom: 5 },
});

export default EditScreen;

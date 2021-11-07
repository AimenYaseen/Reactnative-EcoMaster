import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import { Avatar, Icon, ListItem, BottomSheet } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

import { CustomHead } from "../../components/CustomHead";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";
import { Context as UserContext } from "../../context/UserContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const {
    state: { userData, imageUrl },
    getUser,
    updateUser,
    uploadImage,
  } = useContext(UserContext);

  const [firstName, setFirstname] = useState(userData.firstName);
  const [lastName, setLastname] = useState(userData.lastName);
  const [country, setCountry] = useState(userData.country);
  const [bio, setBio] = useState(userData.bio);

  const [image, setImage] = useState(userData.image);
  const [visible, setVisible] = useState(false);

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
      onPress={() => {
        if (image) {
          updateUser(image, bio, firstName, lastName, country);
          getUser();
          navigation.navigate("Profile");
        }
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
      aspect: [4, 3],
      quality: 0.5,
    });
    if (pickerResult.uri) {
      uploadImage(pickerResult.uri);
    }
    if (imageUrl) {
      setImage(imageUrl);
    }
  };
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
    if (pickerResult.uri) {
      uploadImage(pickerResult.uri);
    }
    if (imageUrl) {
      setImage(imageUrl);
    }
  };

  return (
    <>
      <ImageBackground
        style={styles.background}
        // source={require("../../assets/images/edit2.jpeg")}
        blurRadius={2}
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
              source={image ? { uri: image } : defaultImage}
              // icon={{ name: "user", type: "font-awesome" }}
              size={140}
              containerStyle={styles.avatar}
              //placeholderContent={}
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
                placeholder="short bio..."
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
                placeholder="Pakistan, Sahiwal"
                value={country}
                onChangeText={(text) => setCountry(text)}
              />
            </View>
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

export default ProfileScreen;

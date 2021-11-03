import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Avatar, Icon, ListItem, BottomSheet } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

import { CustomHead } from "../../components/CustomHead";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);

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

  const rightIcon = () => (
    <Icon
      name="check-circle"
      type="material-icons"
      size={30}
      onPress={() => navigation.navigate("Profile")}
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
    });
    setImage(pickerResult.uri);
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
    setImage(pickerResult.uri);
  };

  return (
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
              placeholder="first"
              onChangeText={(text) => setFirstname(text)}
            />
            <SimpleInput
              label="Last Name"
              placeholder="last"
              onChangeText={(text) => setLastname(text)}
            />
            <SimpleInput
              label="Country"
              placeholder="Pakistan, Sahiwal"
              onChangeText={(text) => setCountry(text)}
            />
            <SimpleInput
              label="Gender"
              placeholder="Female / Male"
              onChangeText={(text) => setGender(text)}
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
    //justifyContent: "center",
    resizeMode: "contain",
  },
  avatar: {
    top: screenHeight * 0.03,
    alignSelf: "center",
    marginBottom: screenHeight * 0.07,
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

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CustomHead } from "../../components/CustomHead";
import { SimpleInput, IconInput } from "../../components/CustomInput";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

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
            source={require("../../assets/images/cherry.jpeg")}
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

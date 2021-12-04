import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

import { CustomHead } from "../../components/CustomHead";
import { GradientButton } from "../../components/GradientButton";
import {
  ConfirmationOverlay,
  PasswordOverlay,
} from "../../components/CustomOverlay";
import colors from "../../constants/colors";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const {
    state: { userData, loading },
    getUser,
    changePassword,
  } = useContext(UserContext);

  const [pVisible, setPVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const email = "abc@example.com";
  const firstName = "";
  const lastName = "";
  const country = "Country, City";
  const bio = "Your Short Info HERE...";

  const [current, setCurrent] = useState("");
  const [newP, setNewP] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      const task = () => {
        getUser();
      };

      return () => {
        task();
      };
    }, [navigation])
  );

  let defaultImage = require("../../assets/images/default/default-user.jpeg");
  return (
    <>
      <CustomHead
        text={() => <Text style={styles.text}>Profile</Text>}
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("MainFlow")}
            color={colors.white}
          />
        )}
        rightIcon={() => (
          <Icon
            name="user-edit"
            type="font-awesome-5"
            size={20}
            onPress={() => navigation.navigate("EditProfile")}
            color={colors.white}
          />
        )}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../Admin/assets/white.jpg")}
        //blurRadius={2}
      >
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
                userData
                  ? userData.image
                    ? { uri: userData.image }
                    : defaultImage
                  : defaultImage
              }
              size={140}
              containerStyle={styles.avatar}
            />
            <View>
              <Text style={[styles.text, { color: "black" }]}>
                {userData ? `${userData.firstName} ` : firstName}
                {userData ? userData.lastName : lastName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  type="entypo"
                  name="location-pin"
                  color={colors.secondary}
                  size={18}
                />
                <Text style={{ padding: 5 }}>
                  {userData
                    ? userData.country
                      ? userData.country
                      : country
                    : country}
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: screenHeight * 0.06,
                }}
              >
                {userData ? (userData.bio ? userData.bio : bio) : bio}
              </Text>
            </View>
            <View style={[styles.email, styles.shadow]}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Email</Text>
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="material-icons"
                  name="email"
                  color={colors.secondary}
                  size={20}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  {userData ? userData.email : email}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.email,
                styles.shadow,
                {
                  height: screenHeight * 0.07,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <Text>Change Password?</Text>
              <Icon
                type="entypo"
                name="chevron-right"
                color={colors.secondary}
                size={26}
                onPress={() => setPVisible(true)}
              />
            </View>
            <PasswordOverlay
              visible={pVisible}
              onBackdropPress={() => setPVisible(false)}
              text="Change Password"
              onPress={() => {
                changePassword({ current, newPassword: newP });
                // setPVisible(false);
              }}
              label1="Current"
              onChangeText1={(text) => setCurrent(text)}
              label2="New"
              onChangeText2={(text) => setNewP(text)}
            />
            <View style={styles.button}>
              <GradientButton
                text="Sign Out"
                onPress={() => setConfirm(true)}
              />
            </View>
            <ConfirmationOverlay
              visible={confirm}
              onBackdropPress={() => setConfirm(false)}
              onPress={() => {
                signout();
              }}
              onPressCancel={() => setConfirm(false)}
              msg="Are you sure?"
            />
          </View>
          <Spinner
            visible={loading}
            color={colors.secondary}
            animation="fade"
          />
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.white,
    justifyContent: "center",
    //alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
  },
  avatar: {
    top: screenHeight * 0.05,
    alignSelf: "center",
    marginBottom: screenHeight * 0.07,
  },
  email: {
    marginHorizontal: screenWidth * 0.03,
    marginBottom: screenHeight * 0.02,
    height: screenHeight * 0.08,
    width: screenWidth * 0.95,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.white,
    textAlign: "center",
    //paddingLeft: 2,
  },
  button: {
    paddingVertical: screenWidth * 0.12,
    paddingHorizontal: screenWidth * 0.3,
  },
});

export default ProfileScreen;

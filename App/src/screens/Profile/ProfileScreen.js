import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  // ActivityIndicator,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";
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
import { Context as HabitContext } from "../../context/HabitTrackerContext";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const {
    state: { userData, loading },
    getUser,
    changePassword,
  } = useContext(UserContext);
  const {
    //  state: { loading },
    clearReward,
  } = useContext(HabitContext);

  const [pVisible, setPVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const email = "abc@example.com";
  const firstName = "";
  const lastName = "";
  const country = "Country";
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

  const invite = async () => {
    const fs = RNFetchBlob.fs;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch(
        "GET",
        "https://firebasestorage.googleapis.com/v0/b/ecomaster-74319.appspot.com/o/customImages%2Fea624f68-d44c-41a2-93c4-a1dfc36020511640411394058.jpg?alt=media&token=a98e54db-3dbf-4896-9b0a-169dd172891b"
      )
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .then((base64Data) => {
        // here's base64 encoded image
        console.log(base64Data);
        const image = "data:image/jpeg;base64," + base64Data;
        const shareOptions = {
          title: "Invite Friends",
          message:
            "Join Eco-Master" +
            "\nhttps://github.com/AimenYaseen/Reactnative-EcoMaster",
          url: image,
        };

        Share.open(shareOptions)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

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
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="entypo"
                  name="key"
                  color={colors.secondary}
                  size={20}
                />
                <Text style={{ paddingHorizontal: 10 }}>Change Password?</Text>
              </View>
              <Icon
                type="entypo"
                name="chevron-right"
                color={colors.secondary}
                size={26}
                onPress={() => setPVisible(true)}
              />
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
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="ionicon"
                  name="md-rocket-sharp"
                  color={colors.secondary}
                  size={20}
                />
                <Text style={{ paddingHorizontal: 10 }}>Invite Friends</Text>
              </View>
              <Icon
                type="entypo"
                name="chevron-right"
                color={colors.secondary}
                size={26}
                onPress={() => invite()}
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
              onPress={async () => {
                await clearReward();
                signout();
              }}
              onPressCancel={() => setConfirm(false)}
              msg="Are you sure?"
            />
          </View>
          {loading ? (
            <View style={styles.loading}>
              <Spinner
                visible={loading}
                color={colors.secondary}
                //  overlayColor={"rgba(0,0,0, 0.50)"}
                textContent={"Loading..."}
                textStyle={{
                  fontSize: 18,
                  // marginTop: -130,
                  marginLeft: 15,
                  //  textAlign: "center",
                  color: colors.secondary,
                }}
                animation="fade"
                // indicatorStyle={{
                //   backgroundColor: "white",
                //   // marginTop: screenHeight * 0.48,
                //   // marginBottom: screenHeight * 0.45,
                //   // marginHorizontal: screenWidth * 0.25,
                //   // borderRadius: 25,
                // }}
              />
            </View>
          ) : null}
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
    paddingVertical: screenWidth * 0.09,
    paddingHorizontal: screenWidth * 0.3,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;

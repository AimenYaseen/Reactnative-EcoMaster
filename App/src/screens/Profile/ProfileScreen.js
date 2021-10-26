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
import { GradientButton } from "../../components/GradientButton";
import {
  ConfirmationOverlay,
  PasswordOverlay,
} from "../../components/CustomOverlay";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [pVisible, setPVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const firstName = "Aimen";
  const lastName = "Yaseen";
  const email = "aimenyaseen6@gmail.com";
  const country = "Pakistan, Sahiwal";
  const bio = "bsdskfjskfejn skhds kdduedh";

  return (
    <>
      <CustomHead
        text={null}
        color={colors.secondary}
        centerColor={colors.white}
        leftIcon={() => <Text style={styles.text}>Profile</Text>}
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
          />
          <View>
            <Text style={[styles.text, { color: "black" }]}>
              {firstName} {lastName}
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
              <Text style={{ padding: 5 }}>{country}</Text>
            </View>
            <Text
              style={{ textAlign: "center", marginBottom: screenHeight * 0.06 }}
            >
              {bio}
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
              <Text style={{ paddingHorizontal: 10 }}>{email}</Text>
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
          />
          <View style={styles.button}>
            <GradientButton text="Sign Out" onPress={() => setConfirm(true)} />
          </View>
          <ConfirmationOverlay
            visible={confirm}
            onBackdropPress={() => setConfirm(false)}
            onPress={() => navigation.navigate("AuthFlow")}
            onPressCancel={() => setConfirm(false)}
            msg="Are you sure?"
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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

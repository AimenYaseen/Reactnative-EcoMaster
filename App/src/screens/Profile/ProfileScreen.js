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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");

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
          <View style={styles.input}></View>
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
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.white,
  },
});

export default ProfileScreen;

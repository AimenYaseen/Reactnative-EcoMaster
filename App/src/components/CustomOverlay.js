import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { Overlay, Divider } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";

import colors from "../constants/colors";
import { OverlayInput } from "./CustomInput";
import { GradientButton } from "./GradientButton";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const PasswordOverlay = ({
  visible,
  onBackdropPress,
  text,
  onPress,
  label1,
  onChangeText1,
  label2,
  onChangeText2,
}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{
        borderRadius: 15,
        height: screenHeight * 0.45,
        width: screenWidth * 0.89,
        padding: null,
      }}
    >
      <View style={styles.Pcontainer}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 25,
            color: colors.secondary,
          }}
        >
          {text}
        </Text>
        <OverlayInput label={label1} onChangeText={onChangeText1} />
        <OverlayInput label={label2} onChangeText={onChangeText2} />
        <View style={styles.button}>
          <GradientButton text="Save" onPress={onPress} />
        </View>
      </View>
    </Overlay>
  );
};

export const ConfirmationOverlay = ({
  msg,
  visible,
  onBackdropPress,
  onPress,
  onPressCancel,
}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{
        borderRadius: 20,
        height: screenHeight * 0.2,
        width: screenWidth * 0.7,
        justifyContent: "center",
        alignItems: "center",
        padding: null,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{msg}</Text>
      <View
        style={{
          flexDirection: "row",
          //borderWidth: 1,
          width: screenWidth * 0.5,
          justifyContent: "space-around",
          padding: 10,
          marginTop: 5,
        }}
      >
        <Icon
          name="cancel"
          type="material-icons"
          size={35}
          onPress={onPressCancel}
          color={colors.secondary}
        />
        <Icon
          name="check-circle"
          type="material-icons"
          size={35}
          onPress={onPress}
          color={colors.secondary}
        />
      </View>
    </Overlay>
  );
};

export const HabitOverlay = ({ data, visible, onBackdropPress, onPress }) => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 15,
          marginTop: 20,
          //borderWidth: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 8,
            width: 8,
            marginTop: 5,
            borderRadius: 4,
            marginRight: 5,
            backgroundColor: colors.secondary,
          }}
        />
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={{
        borderRadius: 20,
        height: screenHeight * 0.6,
        width: screenWidth * 0.9,
        padding: null,
      }}
    >
      <View style={styles.Hcontainer}>
        <Text style={styles.step}>Steps:</Text>
        <Divider
          color={colors.secondary}
          width={1.5}
          inset
          insetType="right"
          style={{
            marginLeft: 20,
            width: screenWidth * 0.76,
            marginTop: 10,
            alignItems: "center",
          }}
        />
        <FlatList
          contentContainerStyle={{
            paddingBottom: screenHeight * 0.1,
            paddingTop: screenHeight * 0.01,
            //justifyContent: "center",
            //borderWidth: 1,
            paddingHorizontal: screenWidth * 0.04,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          initialNumToRender={data.length}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={renderItem}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  Pcontainer: {
    backgroundColor: "white",
    borderColor: colors.secondary,
    borderWidth: 2,
    alignItems: "center",
    height: screenHeight * 0.45,
    width: screenWidth * 0.89,
    borderRadius: 15,
  },
  Hcontainer: {
    backgroundColor: "white",
    borderColor: colors.secondary,
    borderWidth: 3,
    //alignItems: "center",
    //justifyContent: "center",
    height: screenHeight * 0.6,
    width: screenWidth * 0.9,
    borderRadius: 15,
  },
  step: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
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
  button: {
    // borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    height: screenWidth * 0.17,
    width: screenWidth * 0.4,
  },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Icon, Input } from "react-native-elements";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

export const SimpleInput = ({ label, placeholder, onChangeText }) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        label={label}
        labelStyle={{ color: colors.black }}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        inputContainerStyle={{
          borderBottomColor: focus ? colors.secondary : colors.gray,
          borderBottomWidth: focus ? 2 : 1,
          paddingHorizontal: 3,
        }}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
      />
    </>
  );
};

export const IconInput = ({ label, value, onChangeText, name, type }) => {
  const [secure, setSecure] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      secureTextEntry={secure ? true : false}
      label={label}
      labelStyle={{ color: colors.black }}
      value={value}
      onChangeText={onChangeText}
      rightIcon={
        <Icon
          name={name}
          type={type}
          color={secure ? colors.gray : colors.secondary}
          size={15}
          onPress={() => (secure ? setSecure(false) : setSecure(true))}
        />
      }
      inputContainerStyle={{
        borderBottomColor: focus ? colors.secondary : colors.gray,
        borderBottomWidth: focus ? 1.5 : 1,
      }}
      autoCorrect={false}
      autoCapitalize="none"
      autoComplete="off"
    />
  );
};

export const ProfileInput = ({ label, placeholder, onChangeText, color }) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        //label={label}
        // labelStyle={{ color: colors.black }}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        leftIcon={{
          type: "material-icons",
          name: "email",
          color: colors.gray2,
        }}
        inputContainerStyle={{
          backgroundColor: color,
          borderColor: focus ? colors.secondary : null,
          borderWidth: focus ? 2 : 0,
          borderBottomWidth: focus ? 2 : 0,
          paddingHorizontal: 5,
          borderRadius: 10,
          height: 50,
          ...colors.shadow,
        }}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: screenWidth * 0.35,
    width: screenWidth * 0.45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "transparent",
    backgroundColor: colors.white,
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
});

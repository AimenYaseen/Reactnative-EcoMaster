import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Icon, Input } from "react-native-elements";

import colors from "../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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

export const OverlayInput = ({ label, onChangeText }) => {
  const [secure, setSecure] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 18,
          marginBottom: 5,
          alignSelf: "flex-start",
        }}
      >
        {label}
      </Text>
      <View style={styles.input}>
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          secureTextEntry={secure ? true : false}
          label={null}
          value="password"
          onChangeText={onChangeText}
          rightIcon={
            <Icon
              name="eye"
              type="entypo"
              color={secure ? colors.gray : colors.secondary}
              size={15}
              onPress={() => (secure ? setSecure(false) : setSecure(true))}
            />
          }
          inputContainerStyle={{
            //borderWidth: 1,
            borderColor: focus ? colors.secondary : colors.gray,
            borderBottomWidth: focus ? 1.5 : null,
            borderWidth: focus ? 1.5 : null,
            height: screenHeight * 0.06,
            width: screenWidth * 0.8,
            alignSelf: "center",
            borderRadius: 10,
            padding: 10,
          }}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: screenHeight * 0.02,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    padding: null,
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
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

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Input } from "react-native-elements";

import colors from "../constants/colors";

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
          borderBottomWidth: focus ? 1.5 : 1,
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

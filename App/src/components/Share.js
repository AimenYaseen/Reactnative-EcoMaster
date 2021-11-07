import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Share() {
  return (
    <>
      <Button
        raised
        type="solid"
        title="Share"
        containerStyle={{
          marginTop: 20,
          alignSelf: "flex-end",
          marginRight: 15,
          borderRadius: 30,
        }}
        buttonStyle={{
          width: screenWidth * 0.25,
          borderRadius: 30,
          backgroundColor: colors.blue,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});

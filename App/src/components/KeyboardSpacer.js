import React, { useEffect, useState } from "react";
import { View, Keyboard, StyleSheet, Dimensions } from "react-native";

export const KeyboardSpacer = ({ Toggle }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (event) => {
      const screenHeight = Dimensions.get("window").height;
      const endY = event.endCoordinates.screenY;

      setKeyboardSpace(screenHeight - endY);
      Toggle(true);
    });
    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardSpace(0);
      Toggle(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return <View style={[styles.container, { height: keyboardSpace }]} />;
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

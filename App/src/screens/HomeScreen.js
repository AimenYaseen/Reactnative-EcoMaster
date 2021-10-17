import React, { useState } from "react";
import { View, ScrollView, StatusBar, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { UpperBorder, Head } from "../components/CustomHead";
import colors from "../constants/colors";

const HomeScreen = () => {
  const [scrollable, setScrollable] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}
        >
          <Text>Home Screen</Text>
          <KeyboardSpacer
            Toggle={(isKeyboardVisible) => setScrollable(isKeyboardVisible)}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
});

export default HomeScreen;

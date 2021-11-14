import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import {
  Icon,
  Avatar,
  ListItem,
  BottomSheet,
  Button,
} from "react-native-elements";
//import { Firebase } from "../../Firebase/config";

import colors from "../../../constants/colors";
import { BlockInput } from "../../../components/CustomInput";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const NewsForm = ({ postTitle, postContent, text, onSave }) => {
  const [title, setTitle] = useState(postTitle);
  const [caption, setCaption] = useState(postContent);
  const [category, setCategory] = useState(postContent);
  const [uploading, setUploading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: 30,
          backgroundColor: colors.whiteSmoke,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <BlockInput
        label="Category"
        value={category}
        placeholder="abc@example.com"
        multiline={false}
        onChangeText={(text) => setCategory(text)}
      />
      <BlockInput
        label="Title"
        value={title}
        placeholder="abc@example.com"
        multiline={false}
        onChangeText={(text) => setTitle(text)}
      />
      <BlockInput
        label="Caption"
        value={caption}
        placeholder="abc@example.com"
        multiline={true}
        onChangeText={(text) => setCaption(text)}
      />
      <Button
        raised
        type="solid"
        title="Choose an Image"
        // onPress={() => setVisible(true)}
        containerStyle={styles.buttonContainer}
        buttonStyle={{
          width: screenWidth * 0.5,
          borderRadius: 30,
          backgroundColor: colors.mauve,
        }}
      />
      <Button
        raised
        type="solid"
        title={`${text} News`}
        // onPress={onSubmitHandle}
        containerStyle={styles.buttonContainer}
        buttonStyle={{
          width: screenWidth * 0.5,
          borderRadius: 30,
          backgroundColor: colors.success,
        }}
      />
    </KeyboardAwareScrollView>
  );
};

NewsForm.defaultProps = () => {
  return {
    postTitle: "",
    postContent: "",
    Image: "",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    //marginLeft: 15,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
  },
  container: {
    marginVertical: screenHeight * 0.05,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 10,
    padding: 15,
    paddingTop: 30,
    backgroundColor: colors.whiteSmoke,
    height: "auto",
    width: screenWidth * 0.9,
    //flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 30,
  },
});

export default NewsForm;

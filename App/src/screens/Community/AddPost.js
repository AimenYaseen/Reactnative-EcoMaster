import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon, Avatar, Input, Button } from "react-native-elements";

import { CustomHead } from "../../components/CustomHead";
import { GradientButton } from "../../components/GradientButton";
import colors from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AddPost = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  let defaultImage = require("../../assets/images/default/default-img.jpg");

  return (
    <>
      <CustomHead
        text="Create Post"
        color={colors.whiteSmoke}
        centerColor={colors.secondary}
        leftIcon={() => (
          <Icon
            name="chevron-left"
            type="entypo"
            size={30}
            onPress={() => navigation.navigate("Post")}
            color={colors.secondary}
          />
        )}
        rightIcon={null}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
          backgroundColor: colors.white,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
              //borderWidth: 1,
            }}
          >
            <Avatar
              rounded
              source={defaultImage}
              size={50}
              containerStyle={styles.avatar}
              //placeholderContent={}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Name</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="What's On Your Mind?"
            multiline
            numberOfLines={5}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Button
              raised
              type="solid"
              title="Choose an Image"
              onPress={() => setVisible(true)}
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                width: screenWidth * 0.5,
                borderRadius: 30,
                backgroundColor: colors.blue,
              }}
            />
            <Button
              raised
              type="solid"
              title="Add Post"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                width: screenWidth * 0.25,
                borderRadius: 30,
                backgroundColor: colors.blue,
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderWidth: 1,
    //justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.whiteSmoke,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 15,
    borderRadius: 30,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  imageText: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.gray3,
    marginVertical: 10,
    padding: 5,
  },
  input: {
    textAlign: "center",
    padding: 15,
    width: "100%",
    //height: 100,
    borderRadius: 10,
    fontSize: 24,
    backgroundColor: colors.whiteSmoke,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  avatar: {
    top: screenHeight * 0.03,
    alignSelf: "center",
    marginBottom: screenHeight * 0.06,
    marginRight: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default AddPost;

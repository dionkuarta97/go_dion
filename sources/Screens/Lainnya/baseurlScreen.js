import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import { setFirstLogin } from "../../Redux/Auth/authActions";
import { setBaseurl } from "../../Redux/Init/initActions";
import Sizes from "../../Theme/Sizes";

const BaseurlScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [newBaseUrl, setNewBaseUrl] = useState("");
  const defaultBaseUrl = "https://apionline.gobimbelonline.net";

  const baseUrl = useSelector((state) => state.initReducer.baseUrl);
  const { firstLogin } = useSelector((state) => state.authReducer);

  console.log(baseUrl);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Initial Base Url" />
      <View style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        <Text>Default Base Url : {defaultBaseUrl}</Text>
        <DefaultPrimaryButton
          text="Use Default Base Url"
          onPress={() => {
            if (firstLogin) {
              dispatch(setBaseurl(defaultBaseUrl));
              navigation.replace("BoardingScreen");
            } else {
              dispatch(setBaseurl(defaultBaseUrl));
              navigation.replace("MainScreen");
            }
          }}
        />

        <Text>OR</Text>

        <DefaultTextInput placeholder="New BaseUrl" onChangeText={setNewBaseUrl} />
        <DefaultPrimaryButton
          text="Submit New Base Url"
          onPress={() => {
            if (firstLogin) {
              dispatch(setBaseurl(newBaseUrl));
              navigation.replace("BoardingScreen");
            } else {
              dispatch(setBaseurl(newBaseUrl));
              navigation.replace("MainScreen");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BaseurlScreen;

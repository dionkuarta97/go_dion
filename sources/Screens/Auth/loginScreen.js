import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { useNavigation } from "@react-navigation/core";
import LoginContent from "./Component/LoginContent";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const [now, setNow] = useState();

  useEffect(() => {
    let time = new Date().toLocaleTimeString("id-ID");
    console.log(time);
    if (Platform.OS === "android") {
      setNow(Number(time.split(":")[0]));
    } else {
      setNow(Number(time.split(".")[0]));
    }
  }, []);

  console.log(now);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <SliverAppBar
        leftItem={
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.blackColor}
            onPress={() => navigation.goBack()}
          />
        }
        element={
          <Text style={{ ...Fonts.black25Bold }}>
            Selamat{" "}
            {now >= 5 && now < 10
              ? "Pagi"
              : now >= 10 && now < 15
              ? "Siang"
              : now >= 15 && now < 18
              ? "Sore"
              : "Malam"}
          </Text>
        }
        toolbarColor={Colors.primaryColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={230}
        src={require("../../../assets/Images/appbar_bg.png")}
      >
        <LoginContent />
        <StatusBar backgroundColor={Colors.primaryColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from "react";
import { Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { useNavigation } from "@react-navigation/core";
import ForgotPasswordContent from "./Component/ForgotPasswordContent";

import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";

const ForgotPasswordScreen = (props) => {
   const navigation = useNavigation();

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
               <Text style={{ ...Fonts.black25Bold }}>Lupa Password</Text>
            }
            toolbarColor={Colors.primaryColor}
            toolBarMinHeight={40}
            toolbarMaxHeight={230}
            src={require("../../../assets/Images/appbar_bg.png")}
         >
            <ForgotPasswordContent />
            <StatusBar backgroundColor={Colors.primaryColor} />
         </SliverAppBar>
      </SafeAreaView>
   );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

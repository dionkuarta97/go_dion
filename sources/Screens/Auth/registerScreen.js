import React, { createRef } from "react";
import { Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { useNavigation } from "@react-navigation/core";
import RegisterContent from "./Component/RegisterContent";

import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";

const RegisterScreen = (props) => {
   const navigation = useNavigation();
   const scrollRef = createRef();

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
            scrollRef={scrollRef}
            element={
               <Text style={{ ...Fonts.black25Bold }}>Buat Akun Baru</Text>
            }
            toolbarColor={Colors.primaryColor}
            toolBarMinHeight={40}
            toolbarMaxHeight={230}
            src={require("../../../assets/Images/appbar_bg.png")}
         >
            <RegisterContent
               scrollRef={scrollRef}
               sendedEmail={props.route.params.email}
            />
            <StatusBar backgroundColor={Colors.primaryColor} />
         </SliverAppBar>
      </SafeAreaView>
   );
};

export default RegisterScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

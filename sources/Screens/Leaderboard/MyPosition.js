import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import LeaderboardContent from "./Component/LeaderboardContent";
import MyPositionContent from "./Component/MyPositionContent";

const MyPosition = ({ route }) => {
   const { params } = route;

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title={"Posisi Saya"}
            backEnabled={true}
         />
         <MyPositionContent
            select={params.select}
            tahun={params.tahun}
         />
      </SafeAreaView>
   );
};

export default MyPosition;

import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import LeaderboardContent from "./Component/LeaderboardContent";
import MyPositionContent from "./Component/MyPositionContent";

const MyPosition = ({ route }) => {
  const { params } = route;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={"My Position"} backEnabled={true} />
      <MyPositionContent select={params.select} />
    </SafeAreaView>
  );
};

export default MyPosition;

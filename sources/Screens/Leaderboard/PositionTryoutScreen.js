import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import LeaderboardContent from "./Component/LeaderboardContent";
import MyPositionContent from "./Component/MyPositionContent";
import PositionTryoutContent from "./Component/PositionTryoutContent";

const PositionTryoutScreen = ({ route }) => {
  const { params } = route;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title={"Posisi Saya"} backEnabled={true} />
      <PositionTryoutContent
        tahun={params.tahun}
        id={params.id}
        select={params.select}
      />
    </SafeAreaView>
  );
};

export default PositionTryoutScreen;

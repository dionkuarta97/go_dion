import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTabBar from "../../Components/DefaultTabBar";
import GoTryoutContent from "./Component/GoTryoutContent";

const GoTryoutScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Go Tryout" backEnabled={true} />
      <DefaultTabBar
        routes={[
          { key: "item1", title: "Belum Diikuti" },
          { key: "item2", title: "Diikuti Sebagian" },
          { key: "item3", title: "Sudah Diikuti" },
        ]}
        screen={[<GoTryoutContent status="untouched" />, <GoTryoutContent status="touched" />, <GoTryoutContent status="done" />]}
      />
    </SafeAreaView>
  );
};

export default GoTryoutScreen;

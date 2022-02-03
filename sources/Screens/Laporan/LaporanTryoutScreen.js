import { ScrollView } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ListTryout from "./components/ListTryout";
import SelectTypeTryout from "./components/SelectTypeTryout";
import TryoutChart from "./components/TryoutChart";

export const LaporanTryoutScreen = () => {
  const [select, setSelect] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Laporan Tryout" backEnabled={true} />

      <ScrollView padding={5}>
        <SelectTypeTryout select={select} onChange={(val) => setSelect(val)} />

        <TryoutChart type={select} />

        <ListTryout type={select} />
      </ScrollView>
    </SafeAreaView>
  );
};

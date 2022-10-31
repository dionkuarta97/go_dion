import { ScrollView, View } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import LoadingModal from "../../Components/Modal/LoadingModal";
import Colors from "../../Theme/Colors";
import ListTryout from "./components/ListTryout";
import SelectTypeTryout from "./components/SelectTypeTryout";
import TryoutChart from "./components/TryoutChart";

export const LaporanTryoutScreen = () => {
  const [select, setSelect] = useState("");
  const { listTryout } = useSelector((state) => state.laporanReducer);
  const { chartTryout, prodi } = useSelector((state) => state.laporanReducer);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar title="Laporan Tryout" backEnabled={true} />

      <ScrollView padding={5}>
        <SelectTypeTryout select={select} onChange={(val) => setSelect(val)} />
        {listTryout.loading && chartTryout.loading && <LoadingModal />}
        <TryoutChart type={select} />

        <ListTryout type={select} />
      </ScrollView>
    </SafeAreaView>
  );
};

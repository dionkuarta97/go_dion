import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultCard from "../../Components/Card/DefaultCard";
import DefaultTabBar from "../../Components/DefaultTabBar";

import Divider from "../../Components/Divider";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import PurchaseContent from "./Component/purchaseContent";

const PurchasePendingScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title="Pembelian Pending" />
      <PurchaseContent from={"home"} status="pending" />
    </SafeAreaView>
  );
};

export default PurchasePendingScreen;

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

const PurchaseScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar backEnabled={false} title="Pembelian" />
            <DefaultTabBar
                routes={[
                    { key: "item1", title: "Pending" },
                    { key: "item2", title: "Success" },
                    { key: "item3", title: "Expired" },
                ]}
                screen={[
                    <PurchaseContent status="pending" />,
                    <PurchaseContent status="done" />,
                    <PurchaseContent status="expire" />,
                ]}
            />
            {/* <View style={{flex: 1}}>
                <PurchaseContent />
            </View> */}
        </SafeAreaView>
    );
};

export default PurchaseScreen;

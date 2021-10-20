import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";

const PaymentScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <DefaultAppBar title="Pembayaran" backEnabled={true} />

            <Text>Payment</Text>
        </SafeAreaView>
    );
};

export default PaymentScreen;

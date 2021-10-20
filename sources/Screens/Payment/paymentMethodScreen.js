import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Sizes from "../../Theme/Sizes";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import {TouchableOpacity} from "react-native-gesture-handler";
import Fonts from "../../Theme/Fonts";

const PaymentMethodScreen = () => {
    const renderSubItem = (title) => {
        return (
            <TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        marginLeft: 20,
                        padding: Sizes.fixPadding,
                        borderTopWidth: 1,
                        borderTopColor: "lightgrey",
                    }}
                >
                    <Text style={{flex: 1}}>{title}</Text>
                    <Text style={{...Fonts.gray14Regular}}>Pilih</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Metode Pembayaran" backEnabled={true} />
            <View style={{paddingVertical: Sizes.fixPadding * 2}}>
                <ExpandableTile title="Transfer Bank" icon="account-balance">
                    {renderSubItem("BNI")}
                    {renderSubItem("BCA")}
                    {renderSubItem("MANDIRI")}
                </ExpandableTile>
                <ExpandableTile title="Kartu Kredit" icon="credit-card">
                    {renderSubItem("MASTER CARD")}
                    {renderSubItem("GPN")}
                </ExpandableTile>
            </View>
        </SafeAreaView>
    );
};

export default PaymentMethodScreen;

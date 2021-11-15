import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Sizes from "../../Theme/Sizes";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fonts from "../../Theme/Fonts";

const PaymentMethodScreen = () => {
    const renderHeader = ({ title, icon }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    paddingVertical: Sizes.fixPadding * 2,
                    paddingHorizontal: Sizes.fixPadding * 2,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "lightgrey",
                }}
            >
                <MaterialIcons
                    name={icon}
                    size={22}
                    color="black"
                    style={{ marginRight: Sizes.fixPadding }}
                />

                <Text style={{ flex: 1, ...Fonts.black15Bold }}>{title}</Text>
            </View>
        );
    };

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
                    <Text style={{ flex: 1 }}>{title}</Text>
                    <Text style={{ ...Fonts.gray14Regular }}>Pilih</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="Metode Pembayaran" backEnabled={true} />
            <View style={{ paddingVertical: Sizes.fixPadding * 2 }}>
                <ExpandableTile
                    header={renderHeader({
                        title: "Transfer Bank",
                        icon: "account-balance",
                    })}
                >
                    {renderSubItem("BNI")}
                    {renderSubItem("BCA")}
                    {renderSubItem("MANDIRI")}
                </ExpandableTile>

                <ExpandableTile
                    header={renderHeader({
                        title: "Kartu Kredit",
                        icon: "credit-card",
                    })}
                >
                    {renderSubItem("MASTER CARD")}
                    {renderSubItem("GPN")}
                </ExpandableTile>
            </View>
        </SafeAreaView>
    );
};

export default PaymentMethodScreen;

import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/core";

const PaymentMethodCard = () => {
    const navigation = useNavigation();
    const selectedPaymentMethod = useSelector(
        (state) => state.paymentReducer.selectedPaymentMethod
    );

    return (
        <View
            style={{
                ...styles.card,
                padding: Sizes.fixPadding,
            }}
        >
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <MaterialIcons
                    name="account-balance-wallet"
                    size={22}
                    color="black"
                />
                <Text
                    style={{
                        flex: 1,
                        ...Fonts.black17Bold,
                        marginLeft: 10,
                    }}
                >
                    Metode Pembayaran
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("PaymentMethodScreen")}
                >
                    <Text style={{...Fonts.orangeColor17Bold}}>Ubah</Text>
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    ...Fonts.gray15Regular,
                    marginLeft: 32,
                    marginTop: 5,
                }}
            >
                {selectedPaymentMethod === null
                    ? "Belum memilih metode"
                    : selectedPaymentMethod.title}
            </Text>
        </View>
    );
};

export default PaymentMethodCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
});

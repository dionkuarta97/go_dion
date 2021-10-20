import React from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/core";

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const renderItem = () => {
        return (
            <View style={styles.item}>
                <Text style={{flex: 4, ...Fonts.gray15Bold}}>
                    Paket Komplit Ujian Nasional 0
                </Text>
                <Text
                    style={{
                        flex: 1,
                        ...Fonts.gray15Regular,
                    }}
                >
                    Rp. 50.000
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <DefaultAppBar title="Checkout" backEnabled={true} />
            <View style={{flex: 1, padding: Sizes.fixPadding * 2}}>
                <Text style={{...Fonts.black19Bold}}>Order Summary</Text>
                <View
                    style={{
                        flex: 1,
                        ...styles.card,
                    }}
                >
                    <ScrollView style={{flex: 1}}>
                        {renderItem()}
                        {renderItem()}
                        {renderItem()}
                        {renderItem()}
                        {renderItem()}
                        {renderItem()}
                        {renderItem()}
                    </ScrollView>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingVertical: Sizes.fixPadding,
                            paddingHorizontal: Sizes.fixPadding / 2,
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.black19Bold,
                            }}
                        >
                            Total
                        </Text>
                        <Text
                            style={{
                                ...Fonts.black17Regular,
                            }}
                        >
                            Rp. 50.000
                        </Text>
                    </View>
                </View>

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
                            onPress={() =>
                                navigation.navigate("PaymentMethodScreen")
                            }
                        >
                            <Text style={{...Fonts.orangeColor17Bold}}>
                                Ubah
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            ...Fonts.gray15Regular,
                            marginLeft: 32,
                            marginTop: 5,
                        }}
                    >
                        Belum memilih metode
                    </Text>
                </View>

                <DefaultPrimaryButton
                    text="Lanjutkan Pembayaran"
                    onPress={() => navigation.navigate("PaymentMethod")}
                />
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
    },
    card: {
        backgroundColor: "white",
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
});

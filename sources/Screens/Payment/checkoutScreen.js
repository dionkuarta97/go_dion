import React, {useEffect} from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import NumberFormat from "react-number-format";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import PaymentMethodCard from "./Component/PaymentMethodCard";
import {
    getPaymentProcess,
    setPaymentMethod,
    setPaymentProcess,
    setSelectedPaymentMethod,
} from "../../Redux/Payment/paymentActions";
import LoadingModal from "../../Components/Modal/LoadingModal";
import {clearCart} from "../../Redux/Cart/cartActions";
import DefaultModal from "../../Components/Modal/DefaultModal";

const CheckoutScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const cart = useSelector((state) => state.cartReducer.cart);
    const paymentProcess = useSelector(
        (state) => state.paymentReducer.paymentProcess
    );

    useEffect(() => {
        dispatch(setSelectedPaymentMethod(null));
        dispatch(setPaymentProcess({loading: false, error: null, data: null}));
    }, []);

    const renderItem = (item) => {
        return (
            <View style={styles.item} key={item._id}>
                <Text style={{flex: 4, ...Fonts.gray15Bold}}>{item.title}</Text>
                <NumberFormat
                    value={
                        item.price_discount > 0
                            ? item.price_discount
                            : item.price
                    }
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={"IDR "}
                    renderText={(value, props) => (
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.gray15Regular,
                            }}
                        >
                            {value}
                        </Text>
                    )}
                />
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
                        {cart.map((val) => renderItem(val))}
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
                        <NumberFormat
                            value={cart.reduce(
                                (total, x) =>
                                    total +
                                    (x.price_discount > 0
                                        ? x.price_discount
                                        : x.price),
                                0
                            )}
                            displayType={"text"}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={"IDR "}
                            renderText={(value, props) => (
                                <Text
                                    style={{
                                        ...Fonts.black17Regular,
                                    }}
                                >
                                    {value}
                                </Text>
                            )}
                        />
                    </View>
                </View>

                <PaymentMethodCard />

                <DefaultPrimaryButton
                    text="Lanjutkan Pembayaran"
                    onPress={() => {
                        dispatch(getPaymentProcess());
                    }}
                />

                {paymentProcess.loading && <LoadingModal />}
                {paymentProcess.data !== null && (
                    <DefaultModal>
                        <Text>Berhasil melakukan checkout</Text>
                        <DefaultPrimaryButton
                            text="Lihat status pembayaran"
                            onPress={() => {
                                dispatch(clearCart());
                                navigation.popToTop();
                                navigation.navigate("PaymentScreen", {
                                    orderId: paymentProcess.data.order_id,
                                });
                            }}
                        />
                    </DefaultModal>
                )}
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

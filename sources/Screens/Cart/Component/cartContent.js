import {useNavigation} from "@react-navigation/core";
import React from "react";
import {ScrollView, Text, View} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {useDispatch, useSelector} from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import ProductCardHorizontal from "../../../Components/Card/ProductCardHorizontal";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";

const CartContent = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isLogin = useSelector((state) => state.authReducer.isLogin);
    const cart = useSelector((state) => state.cartReducer.cart);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, padding: Sizes.fixPadding * 2}}>
                {cart.map((val) => (
                    <ProductCardHorizontal
                        key={val._id}
                        id={val._id}
                        title={val.title}
                        thumbnail={val.thumbnail}
                        price={
                            val.price_discount > 0
                                ? val.price_discount
                                : val.price
                        }
                    />
                ))}

                <View style={{height: 25}} />
            </ScrollView>
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding,
                    backgroundColor: "white",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 3,
                        marginTop: 10,
                    }}
                >
                    <Text style={{flex: 1, ...Fonts.black17Regular}}>
                        Jumlah Item
                    </Text>
                    <Text style={{...Fonts.black17Regular}}>{cart.length}</Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 3,
                    }}
                >
                    <Text style={{flex: 1, ...Fonts.black19Bold}}>Total</Text>
                    <Text
                        style={{
                            ...Fonts.primaryColor23Bold,
                            color: Colors.orangeColor,
                        }}
                    >
                        IDR{" "}
                        {cart.reduce(
                            (total, x) =>
                                total +
                                (x.price_discount > 0
                                    ? x.price_discount
                                    : x.price),
                            0
                        )}
                    </Text>
                </View>
                <DefaultPrimaryButton
                    text="Checkout"
                    onPress={() => {
                        if (isLogin) navigation.navigate("CheckoutScreen");
                        else navigation.navigate("LoginScreen");
                    }}
                />
            </View>
        </View>
    );
};

export default CartContent;

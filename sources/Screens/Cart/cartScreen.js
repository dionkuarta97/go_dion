import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import {getSliderImages} from "../../Redux/Home/homeActions";
import HomeContent from "../Home/Component/HomeContent";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ProductCardHorizontal from "../../Components/Card/ProductCardHorizontal";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import {useNavigation} from "@react-navigation/core";
import {clearCart} from "../../Redux/Cart/cartActions";

const CartScreen = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer.cart);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title="Keranjang"
                backEnabled={true}
                rightItem={
                    <TouchableOpacity onPress={() => dispatch(clearCart())}>
                        <Text>Kosongkan</Text>
                    </TouchableOpacity>
                }
            />
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
                    onPress={() => navigation.navigate("CheckoutScreen")}
                />
            </View>
            <StatusBar backgroundColor={Colors.primaryColor} />
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

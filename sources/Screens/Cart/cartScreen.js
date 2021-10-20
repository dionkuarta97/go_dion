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

const CartScreen = (props) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title="Keranjang"
                backEnabled={true}
                rightItem={
                    <View>
                        <Text>Kosongkan</Text>
                    </View>
                }
            />
            <ScrollView style={{flex: 1, padding: Sizes.fixPadding * 2}}>
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
                <ProductCardHorizontal />
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
                    <Text style={{...Fonts.black17Regular}}>10</Text>
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
                        Rp. 200.000
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

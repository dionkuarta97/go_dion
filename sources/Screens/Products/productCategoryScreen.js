import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import SliverAppBar from "../../Components/sliverAppBar";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import {FlatGrid} from "react-native-super-grid";
import ProductCard from "../../Components/ProductCard";
import {useNavigation} from "@react-navigation/core";
import ActionButtonFilter from "../../Components/ActionButton/ActionButtonFilter";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
    {id: 5, title: "a"},
    {id: 6, title: "a"},
];

const ProductCategoryScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title="Produk Category"
                backEnabled={true}
                rightItem={
                    <View style={{flexDirection: "row"}}>
                        <ActionButtonFilter />
                        <View style={{width: 15}} />
                        <ActionButtonCart />
                    </View>
                }
            />
            <View style={{flex: 1}}>
                <FlatGrid
                    listKey="productlist"
                    itemDimension={220}
                    renderItem={() => <ProductCard />}
                    data={products}
                />
            </View>
            <View
                style={{
                    height: 50,
                    flexDirection: "row",
                    backgroundColor: LpColorsUtils.primaryColor,
                    alignItems: "center",
                    paddingHorizontal: LpSizesUtils.fixPadding,
                }}
            >
                <Text style={{...LpFontStyles.black15Regular, flex: 1}}>
                    Anda membeli product{" "}
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
            </View>
        </SafeAreaView>
    );
};

export default ProductCategoryScreen;

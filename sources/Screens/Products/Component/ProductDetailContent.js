import React from "react";
import {Text, View} from "react-native";
import DefaultTabBar from "../../../Components/DefaultTabBar";
import ProductTabInfo from "./ProductTabInfo";
import ProductTabMateri from "./ProductTabMateri";

const ProductDetailContent = () => {
    return (
        <View style={{flex: 1}}>
            <DefaultTabBar
                routes={[
                    {key: "item1", title: "Overview"},
                    {key: "item2", title: "Materi"},
                ]}
                screen={[<ProductTabInfo />, <ProductTabMateri />]}
            />
            <Text>Tes</Text>
        </View>
    );
};

export default ProductDetailContent;

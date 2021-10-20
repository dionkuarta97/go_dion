import {useNavigation} from "@react-navigation/core";
import React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import ProductCard from "../../../Components/ProductCard";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
];

const ProductContent = () => {
    const navigation = useNavigation();

    const sectionHeader = (title) => {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{...Fonts.black20Bold, flex: 1}}>{title}</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("ProductCategoryScreen")}
                >
                    <Text style={{...Fonts.orangeColor14Bold}}>
                        Lihat Semua
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{paddingVertical: Sizes.fixPadding}}>
            <View>
                {sectionHeader("Paket Belajar")}
                <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <ProductCard />}
                    data={products}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 4.0,
                    }}
                />
            </View>

            <View>
                {sectionHeader("Paket Tryout")}
                <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <ProductCard />}
                    data={products}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 4.0,
                    }}
                />
            </View>
        </View>
    );
};

export default ProductContent;
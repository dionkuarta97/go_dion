import {useNavigation} from "@react-navigation/core";
import React, {useEffect} from "react";

import {LogBox, Text, TouchableOpacity, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import ProductCard from "../../../Components/ProductCard";
import {LpFontStyles} from "../../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../../Theme/utils/learnProUtils";
import HomeCarousel from "./HomeCarousel";
import HomeMenu from "./HomeMenu";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
];

const HomeContent = () => {
    const navigation = useNavigation();

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);

    const sectionHeader = (title) => {
        return (
            <View
                style={{
                    marginHorizontal: LpSizesUtils.fixPadding,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{...LpFontStyles.black20Bold, flex: 1}}>
                    {title}
                </Text>

                <TouchableOpacity activeOpacity={0.8}>
                    <Text style={{...LpFontStyles.orangeColor14Bold}}>
                        Lihat Semua
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{flex: 1}}>
            <HomeCarousel />
            <HomeMenu />

            <View>
                {sectionHeader("Materi Baru")}
                <View style={{marginHorizontal: LpSizesUtils.fixPadding}}>
                    <FlatList
                        keyExtractor={(item) => `${item.id}`}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => <ProductCard />}
                        data={products}
                        contentContainerStyle={{
                            paddingHorizontal: LpSizesUtils.fixPadding,
                            paddingTop: LpSizesUtils.fixPadding * 2.0,
                            paddingBottom: LpSizesUtils.fixPadding * 4.0,
                        }}
                    />
                </View>
            </View>

            <View>
                {sectionHeader("Materi Populer")}
                <View style={{marginHorizontal: LpSizesUtils.fixPadding}}>
                    <FlatList
                        keyExtractor={(item) => `${item.id}`}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={(item) => <ProductCard />}
                        data={products}
                        contentContainerStyle={{
                            paddingHorizontal: LpSizesUtils.fixPadding,
                            paddingTop: LpSizesUtils.fixPadding * 2.0,
                            paddingBottom: LpSizesUtils.fixPadding * 4.0,
                        }}
                    />
                </View>
            </View>

            <View style={{height: 50}}></View>
        </View>
    );
};

export default HomeContent;

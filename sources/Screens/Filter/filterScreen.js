import React from "react";
import {useNavigation} from "@react-navigation/core";
import {MaterialIcons} from "@expo/vector-icons";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import FilterSearchText from "./Component/FilterSearchText";
import FilterSearchCategories from "./Component/FilterSearchCategories";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const FilterScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar backEnabled={true} title="Cari Produk" />
            <ScrollView
                style={{
                    paddingHorizontal: Sizes.fixPadding,
                    paddingVertical: Sizes.fixPadding * 2,
                }}
            >
                <FilterSearchText />
                <FilterSearchCategories />
            </ScrollView>
        </SafeAreaView>
    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    card: {
        marginVertical: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        elevation: 2,
    },
});

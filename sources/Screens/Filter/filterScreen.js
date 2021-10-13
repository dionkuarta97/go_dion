import React from "react";
import {useNavigation} from "@react-navigation/core";
import {MaterialIcons} from "@expo/vector-icons";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import FilterSearchText from "./Component/FilterSearchText";
import FilterSearchCategories from "./Component/FilterSearchCategories";

const FilterScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Cari Produk" />
            <ScrollView
                style={{
                    paddingHorizontal: LpSizesUtils.fixPadding,
                    paddingVertical: LpSizesUtils.fixPadding * 2,
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
        marginVertical: LpSizesUtils.fixPadding,
        backgroundColor: LpColorsUtils.whiteColor,
        borderRadius: LpSizesUtils.fixPadding,
        padding: LpSizesUtils.fixPadding,
        elevation: 2,
    },
});

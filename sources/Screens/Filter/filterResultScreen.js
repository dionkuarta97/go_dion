import {useNavigation} from "@react-navigation/core";
import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import ProductCard from "../../Components/ProductCard";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
    {id: 5, title: "a"},
    {id: 6, title: "a"},
];

const FilterResultScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Hasil Pencarian" />
            <View
                style={{
                    paddingHorizontal: LpSizesUtils.fixPadding,
                    paddingVertical: LpSizesUtils.fixPadding * 2,
                }}
            >
                <View style={styles.card}>
                    <Text
                        style={{...LpFontStyles.black15Regular, color: "grey"}}
                    >
                        Pencarian:
                    </Text>

                    <Text style={{...LpFontStyles.black17Regular}}>
                        Buku bab mantap
                    </Text>
                </View>
            </View>
            <View style={{flex: 1}}>
                <FlatGrid
                    listKey="productlist"
                    itemDimension={220}
                    renderItem={() => <ProductCard />}
                    data={products}
                />
            </View>
        </SafeAreaView>
    );
};

export default FilterResultScreen;

const styles = StyleSheet.create({
    card: {
        marginVertical: LpSizesUtils.fixPadding,
        backgroundColor: LpColorsUtils.whiteColor,
        borderRadius: LpSizesUtils.fixPadding,
        padding: LpSizesUtils.fixPadding,
        elevation: 2,
    },
});

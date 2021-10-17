import {useNavigation} from "@react-navigation/core";
import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import ProductCard from "../../Components/ProductCard";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

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
            <DefaultAppBar backEnabled={true} title="Hasil Pencarian" />
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding,
                    paddingVertical: Sizes.fixPadding * 2,
                }}
            >
                <View style={styles.card}>
                    <Text style={{...Fonts.black15Regular, color: "grey"}}>
                        Pencarian:
                    </Text>

                    <Text style={{...Fonts.black17Regular}}>
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
        marginVertical: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        elevation: 2,
    },
});

import React from "react";
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions} from "react-native";
import Divider from "../../../Components/Divider";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const {width} = Dimensions.get("screen");

const ProductDetailContent = (props) => {
    const item = props.item;

    const titleText = (title) => {
        return <Text style={{...Fonts.indigoColor18Bold}}>{title}</Text>;
    };
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: Sizes.fixPadding,
                paddingVertical: Sizes.fixPadding * 3,
            }}
        >
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {titleText("Informasi")}
                <View style={styles.content}>
                    <Text>{item.desc}</Text>
                    <Divider />
                    <Text>Kategory: {item.details.category}</Text>
                    <Divider />
                    <Text>Level: {item.details.level}</Text>
                    <Divider />
                    <Text>Wilayah: {item.details.wilayah}</Text>
                    <Divider />
                    {item.purchased && (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                // dispatch(addToCart(item));
                                // navigation.navigate("CartScreen");
                            }}
                            style={{
                                ...styles.button,
                                backgroundColor: Colors.primaryColor,
                            }}
                        >
                            <Text style={{...Fonts.black17Bold}}>
                                Lanjutkan Belajar Kamu
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
    content: {
        padding: Sizes.fixPadding,
        height: 1000,
    },
    button: {
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "center",
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 3.0,
    },
});

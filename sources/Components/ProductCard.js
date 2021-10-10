import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LpFontStyles} from "../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../Theme/utils/learnProUtils";

const ProductCard = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ProductDetailScreen")}
            style={styles.card}
        >
            <Image
                source={require("../../assets/Images/new_course/new_course_4.png")}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={{...LpFontStyles.gray15Regular}}>
                    Paket belajar tryout ujian mantap
                </Text>
                <Text
                    style={{
                        ...LpFontStyles.black17Bold,
                        marginVertical: LpSizesUtils.fixPadding - 5.0,
                    }}
                >
                    Paket Belajar
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: LpSizesUtils.fixPadding - 5.0,
                    }}
                >
                    <Text
                        style={{
                            color: LpColorsUtils.orangeColor,
                            textDecorationLine: "line-through",
                        }}
                    >
                        Rp. 50.000
                    </Text>
                </View>
                <Text
                    style={{
                        ...LpFontStyles.black19Bold,
                        marginTop: LpSizesUtils.fixPadding,
                    }}
                >
                    Rp. 45.000
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        elevation: 1.0,
        width: 220.0,
        borderRadius: LpSizesUtils.fixPadding * 2.0,
        backgroundColor: LpColorsUtils.whiteColor,
        overflow: "hidden",
        marginRight: LpSizesUtils.fixPadding * 2.0,
    },
    image: {
        width: 220.0,
        height: 150.0,
        borderTopRightRadius: LpSizesUtils.fixPadding * 2.0,
        borderTopLeftRadius: LpSizesUtils.fixPadding * 2.0,
    },
    infoContainer: {
        paddingHorizontal: LpSizesUtils.fixPadding,
        paddingTop: LpSizesUtils.fixPadding,
        paddingBottom: LpSizesUtils.fixPadding * 2.0,
    },
});

import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Fonts from "../Theme/Fonts";
import Sizes from "../Theme/Sizes";
import Colors from "../Theme/Colors";

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
                <Text style={{...Fonts.gray15Regular}}>
                    Paket belajar tryout ujian mantap
                </Text>
                <Text
                    style={{
                        ...Fonts.black17Bold,
                        marginVertical: Sizes.fixPadding - 5.0,
                    }}
                >
                    Paket Belajar
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: Sizes.fixPadding - 5.0,
                    }}
                >
                    <Text
                        style={{
                            color: Colors.orangeColor,
                            textDecorationLine: "line-through",
                        }}
                    >
                        Rp. 50.000
                    </Text>
                </View>
                <Text
                    style={{
                        ...Fonts.black19Bold,
                        marginTop: Sizes.fixPadding,
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
        borderRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        overflow: "hidden",
        marginRight: Sizes.fixPadding * 2.0,
    },
    image: {
        width: 220.0,
        height: 150.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
    },
    infoContainer: {
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
});

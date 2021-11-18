import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

import Fonts from "../Theme/Fonts";
import Sizes from "../Theme/Sizes";
import Colors from "../Theme/Colors";

const dummyProductData = {
    _id: "6167e3732d4fb95908691d2a",
    category: "tryout",
    desc: "Tryout UNBK 2021",
    details: {
        attr1: "Lorem ipsum 1",
        attr2: "Lorem ipsum 2",
        attr3: "Lorem ipsum 3",
        category: "Tryout 2",
        level: "9 SMP",
        wilayah: "Jawa Tengah",
    },
    includes: ["6167e2052d4fb95908691d28"],
    is_active: true,
    price: 87000,
    price_discount: 67000,
    purchased: false,
    thumbnail:
        "http://yrama-widya.co.id/wp-content/uploads/2018/08/Sonar-Maestro-USBN-SMP-2019.jpg",
    title: "Tryout UNBK 2021",
};

const ProductCard = (props) => {
    const navigation = useNavigation();
    console.log(props);
    const item = props.data == undefined ? dummyProductData : props.data;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ProductDetailScreen")}
            style={styles.card}
        >
            <Image
                source={{uri: item.thumbnail}}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={{...Fonts.gray15Regular}}>{item.title}</Text>
                <Text
                    style={{
                        ...Fonts.black17Bold,
                        marginVertical: Sizes.fixPadding - 5.0,
                    }}
                >
                    {props.section}
                </Text>
                {item.price_discount !== 0 && (
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
                            IDR {item.price}
                        </Text>
                    </View>
                )}

                <Text
                    style={{
                        ...Fonts.black19Bold,
                        marginTop: Sizes.fixPadding,
                    }}
                >
                    {`IDR ${
                        item.price_discount !== 0
                            ? item.price_discount
                            : item.price
                    }`}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

ProductCard.propTypes = {
    data: PropTypes.object,
    section: PropTypes.string,
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

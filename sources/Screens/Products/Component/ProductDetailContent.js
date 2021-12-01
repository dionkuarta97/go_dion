import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Divider from "../../../Components/Divider";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addToCart } from "../../../Redux/Cart/cartActions";

const { width } = Dimensions.get("screen");

const ProductDetailContent = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const item = props.item;

    const titleText = (title) => {
        return (
            <Text
                style={{ ...Fonts.black17Bold, marginBottom: Sizes.fixPadding }}
            >
                {title}
            </Text>
        );
    };

    const infoTile = (title, text) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                    paddingVertical: Sizes.fixPadding,
                }}
            >
                <Text style={{ flex: 1, color: "grey" }}>{title}</Text>
                <Text style={{ flex: 3 }}>{text}</Text>
            </View>
        );
    };
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: Sizes.fixPadding * 2,
                paddingVertical: Sizes.fixPadding * 3,
                backgroundColor: "white",
            }}
        >
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {titleText("Detail Produk")}
                <View style={styles.content}>
                    {infoTile("Informasi", item.desc)}
                    {infoTile("Kategori", item.details.category)}
                    {infoTile("Level", item.details.level)}
                    {infoTile("Wilayah", item.details.wilayah)}

                    {item.purchased ? (
                        <DefaultPrimaryButton
                            text="Lanjutkan Belajar Kamu"
                            onPress={() => {
                                navigation.navigate("ProductIncludeScreen", {
                                    produkId: item._id,
                                });
                            }}
                        />
                    ) : (
                        <DefaultPrimaryButton
                            text="Beli Sekarang"
                            onPress={() => {
                                dispatch(addToCart(item));
                                navigation.popToTop();
                                navigation.navigate("CartScreen");
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
    content: {},
    button: {
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "center",
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 3.0,
    },
});

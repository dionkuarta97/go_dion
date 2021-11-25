import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import {getSliderImages} from "../../Redux/Home/homeActions";
import NumberFormat from "react-number-format";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import {useNavigation} from "@react-navigation/core";
import ProductDetailContent from "./Component/ProductDetailContent";
import {addToCart} from "../../Redux/Cart/cartActions";

const {width} = Dimensions.get("screen");

const ProductDetailScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const item = props.route.params.item;
    const section = props.route.params.section;

    const cart = useSelector((state) => state.cartReducer.cart);

    const productInfo = () => {
        return (
            <View>
                <Text style={{...Fonts.primaryColor16Regular}}>{section}</Text>
                <Text
                    style={{
                        ...Fonts.primaryColor28Bold,
                        marginVertical: Sizes.fixPadding,
                    }}
                >
                    {item.title}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{...Fonts.primaryColor16Regular}}>5</Text>
                        <MaterialIcons
                            name="star"
                            size={17}
                            color={Colors.primaryColor}
                        />
                        <Text style={{...Fonts.primaryColor16Regular}}>
                            (7 Reviews)
                        </Text>
                    </View>
                    <NumberFormat
                        value={
                            item.price_discount > 0
                                ? item.price_discount
                                : item.price
                        }
                        displayType={"text"}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={"IDR "}
                        renderText={(value, props) => (
                            <Text style={{...Fonts.primaryColor25Bold}}>
                                {value}
                            </Text>
                        )}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        dispatch(addToCart(item));
                        navigation.popToTop();
                        navigation.navigate("CartScreen");
                    }}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.primaryColor,
                    }}
                >
                    <Text style={{...Fonts.black17Bold}}>Buy Now</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        this.props.navigation.navigate("WatchTrailer")
                    }
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.whiteColor,
                        marginBottom: Sizes.fixPadding,
                    }}
                >
                    <Text style={{...Fonts.black17Bold}}>Watch Trailer</Text>
                </TouchableOpacity> */}
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <SliverAppBar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={Colors.primaryColor}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightItem={
                    !cart.some((val) => val._id === item._id) ? (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => dispatch(addToCart(item))}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MaterialIcons
                                name={"add"}
                                size={24}
                                color={Colors.primaryColor}
                            />
                            <Text
                                style={{
                                    ...Fonts.primaryColor16Regular,
                                    marginLeft: Sizes.fixPadding - 5.0,
                                }}
                            >
                                Add to Cart
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MaterialIcons
                                name={"done"}
                                size={24}
                                color={Colors.primaryColor}
                            />
                            <Text
                                style={{
                                    ...Fonts.primaryColor16Regular,
                                    marginLeft: Sizes.fixPadding - 5.0,
                                }}
                            >
                                Added to Cart
                            </Text>
                        </View>
                    )
                }
                element={productInfo()}
                borderBottomRadius={20}
                toolbarColor={Colors.whiteColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={370}
                isImageBlur={true}
                src={{uri: item.thumbnail}}
            >
                <ProductDetailContent item={item} />
                <StatusBar backgroundColor={Colors.blackColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    button: {
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "center",
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 3.0,
    },
});

import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import CompStyles from "../../Theme/styles/globalStyles";
import Sizes from "../../Theme/Sizes";
import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../Redux/Cart/cartActions";

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
};
const ProductCardHorizontal = (props) => {
    const dispatch = useDispatch();
    return (
        <View style={CompStyles.defaultCard}>
            <View style={{flexDirection: "row"}}>
                <Image style={styles.image} source={{uri: props.thumbnail}} />
                <View style={{flex: 1, paddingLeft: Sizes.fixPadding}}>
                    <Text style={{...Fonts.black17Bold}}>{props.title}</Text>
                    <View style={{flex: 1}} />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <NumberFormat
                            value={props.price}
                            displayType={"text"}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix={"IDR "}
                            renderText={(value, props) => (
                                <Text style={{flex: 1, ...Fonts.black15Bold}}>
                                    {value}
                                </Text>
                            )}
                        />

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => dispatch(removeFromCart(props.id))}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: Colors.neutralRedColor,
                                    borderRadius: Sizes.fixPadding,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <MaterialIcons
                                    name="delete"
                                    size={25}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

ProductCardHorizontal.propTypes = propTypes;

export default ProductCardHorizontal;

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: Sizes.fixPadding,
    },
});

import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import CompStyles from "../../Theme/styles/globalStyles";
import Sizes from "../../Theme/Sizes";
import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";

const ProductCardHorizontal = () => {
    return (
        <View style={CompStyles.defaultCard}>
            <View style={{flexDirection: "row"}}>
                <Image
                    style={styles.image}
                    source={require("../../../assets/Images/new_course/new_course_4.png")}
                />
                <View style={{flex: 1, paddingLeft: Sizes.fixPadding}}>
                    <Text style={{...Fonts.black17Bold}}>
                        Paket Komplit Ujian Nasional
                    </Text>
                    <View style={{flex: 1}} />
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{flex: 1, ...Fonts.black15Bold}}>
                            Rp. 50.000
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                console.log("tes");
                            }}
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

export default ProductCardHorizontal;

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: Sizes.fixPadding,
    },
});

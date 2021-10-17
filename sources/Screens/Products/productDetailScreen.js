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

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import {useNavigation} from "@react-navigation/core";
import ProductDetailContent from "./Component/ProductDetailContent";

const {width} = Dimensions.get("screen");

const ProductDetailScreen = (props) => {
    const navigation = useNavigation();

    const productInfo = () => {
        return (
            <View>
                <Text style={{...Fonts.primaryColor16Regular}}>
                    Paket Belajar
                </Text>
                <Text
                    style={{
                        ...Fonts.primaryColor28Bold,
                        marginVertical: Sizes.fixPadding,
                    }}
                >
                    Paket Belajar bersama sama
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
                    <Text style={{...Fonts.primaryColor25Bold}}>
                        Rp. 45.000
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        this.props.navigation.navigate("TakeCourse", {
                            courseName: this.courseName,
                            image: this.image,
                        })
                    }
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.primaryColor,
                    }}
                >
                    <Text style={{...Fonts.black17Bold}}>Take the Course</Text>
                </TouchableOpacity>
                <TouchableOpacity
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
                </TouchableOpacity>
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
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {}}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MaterialIcons
                            name={true ? "done" : "add"}
                            size={24}
                            color={Colors.primaryColor}
                        />
                        <Text
                            style={{
                                ...Fonts.primaryColor16Regular,
                                marginLeft: Sizes.fixPadding - 5.0,
                            }}
                        >
                            {true ? "Added to Wishlist" : "Add to Wishlist"}
                        </Text>
                    </TouchableOpacity>
                }
                element={productInfo()}
                borderBottomRadius={20}
                toolbarColor={Colors.whiteColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={370}
                isImageBlur={true}
                src={require("../../../assets/Images/new_course/new_course_4.png")}
            >
                <ProductDetailContent />
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

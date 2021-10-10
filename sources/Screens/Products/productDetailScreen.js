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
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {useNavigation} from "@react-navigation/core";
import ProductDetailContent from "./Component/ProductDetailContent";

const {width} = Dimensions.get("screen");

const ProductDetailScreen = (props) => {
    const navigation = useNavigation();

    const productInfo = () => {
        return (
            <View>
                <Text style={{...LpFontStyles.primaryColor16Regular}}>
                    Paket Belajar
                </Text>
                <Text
                    style={{
                        ...LpFontStyles.primaryColor28Bold,
                        marginVertical: LpSizesUtils.fixPadding,
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
                        <Text style={{...LpFontStyles.primaryColor16Regular}}>
                            5
                        </Text>
                        <MaterialIcons
                            name="star"
                            size={17}
                            color={LpColorsUtils.primaryColor}
                        />
                        <Text style={{...LpFontStyles.primaryColor16Regular}}>
                            (7 Reviews)
                        </Text>
                    </View>
                    <Text style={{...LpFontStyles.primaryColor25Bold}}>
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
                        backgroundColor: LpColorsUtils.primaryColor,
                    }}
                >
                    <Text style={{...LpFontStyles.black17Bold}}>
                        Take the Course
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        this.props.navigation.navigate("WatchTrailer")
                    }
                    style={{
                        ...styles.button,
                        backgroundColor: LpColorsUtils.whiteColor,
                        marginBottom: LpSizesUtils.fixPadding,
                    }}
                >
                    <Text style={{...LpFontStyles.black17Bold}}>
                        Watch Trailer
                    </Text>
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
                        color={LpColorsUtils.primaryColor}
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
                            color={LpColorsUtils.primaryColor}
                        />
                        <Text
                            style={{
                                ...LpFontStyles.primaryColor16Regular,
                                marginLeft: LpSizesUtils.fixPadding - 5.0,
                            }}
                        >
                            {true ? "Added to Wishlist" : "Add to Wishlist"}
                        </Text>
                    </TouchableOpacity>
                }
                element={productInfo()}
                borderBottomRadius={20}
                toolbarColor={LpColorsUtils.whiteColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={370}
                isImageBlur={true}
                src={require("../../../assets/Images/new_course/new_course_4.png")}
            >
                <ProductDetailContent />
                <StatusBar backgroundColor={LpColorsUtils.blackColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    button: {
        paddingVertical: LpSizesUtils.fixPadding + 2.0,
        alignItems: "center",
        justifyContent: "center",
        width: width - 40,
        borderRadius: LpSizesUtils.fixPadding - 5.0,
        marginTop: LpSizesUtils.fixPadding + 3.0,
    },
});

import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import {useNavigation} from "@react-navigation/core";
import ProductContent from "./Component/ProductContent";
import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import ActionButtonFilter from "../../Components/ActionButton/ActionButtonFilter";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const ProductScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1}}>
            <SliverAppBar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.goBack()}
                    />
                }
                rightItem={
                    <View style={{flexDirection: "row"}}>
                        <ActionButtonFilter />
                        <View style={{width: 15}} />
                        <ActionButtonCart />
                    </View>
                }
                element={
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Text style={Fonts.black25Bold}>Produk Kami</Text>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <ProductContent />
                <StatusBar backgroundColor={Colors.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default ProductScreen;

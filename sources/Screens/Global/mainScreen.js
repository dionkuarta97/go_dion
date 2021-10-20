import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import HomeScreen from "../Home/homeScreen";
import CartScreen from "../Cart/cartScreen";
import PurchaseScreen from "../Purchase/purchaseScreen";

const bottomNavMenu = [
    {title: "Home", icon: "home"},
    {title: "Pembelian", icon: "shopping-cart"},
    {title: "Laporan", icon: "show-chart"},
    {title: "Leaderboard", icon: "insert-chart"},
    {title: "Lainnya", icon: "more-vert"},
];

export default MainScreen = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const bottomTabBarItem = ({index, icon, title}) => {
        return (
            <TouchableOpacity
                key={index.toString()}
                activeOpacity={0.9}
                onPress={() => setCurrentIndex(index)}
            >
                {currentIndex == index ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFEACC",
                            width: 140.0,
                            paddingVertical: Sizes.fixPadding,
                            borderRadius: Sizes.fixPadding * 4.0,
                        }}
                    >
                        {icon}
                        <Text
                            style={{
                                ...Fonts.orangeColor14Bold,
                                marginLeft: Sizes.fixPadding * 2.0,
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                ) : (
                    icon
                )}
            </TouchableOpacity>
        );
    };
    return (
        <View style={{flex: 1}}>
            {currentIndex == 0 ? (
                <HomeScreen />
            ) : currentIndex == 1 ? (
                <PurchaseScreen />
            ) : (
                <HomeScreen />
            )}

            <View style={styles.bottomTabBarStyle}>
                {bottomNavMenu.map((val, idx) =>
                    bottomTabBarItem({
                        index: idx,
                        icon: (
                            <MaterialIcons
                                name={val.icon}
                                size={27}
                                color={Colors.orangeColor}
                            />
                        ),
                        title: val.title,
                    })
                )}
            </View>
            <StatusBar backgroundColor={Colors.primaryColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: "absolute",
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        borderTopColor: "gray",
        borderTopWidth: 0.2,
    },
});
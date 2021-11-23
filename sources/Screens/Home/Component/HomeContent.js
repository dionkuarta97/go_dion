import {useNavigation} from "@react-navigation/core";
import React, {useEffect} from "react";

import {LogBox, Text, TouchableOpacity, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import ProductCard from "../../../Components/ProductCard";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import HomeCarousel from "./HomeCarousel";
import HomeMenu from "./HomeMenu";
// import dynamicLinks from "@react-native-firebase/dynamic-links";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
];

const HomeContent = () => {
    const navigation = useNavigation();

    // const handleDynamicLink = (link) => {
    //     console.log("dynamic link called...");
    //     console.log("=====>", link);
    //     // Handle dynamic link inside your own application
    //     if (link.url === "https://gobimbelonline.net/newpassword") {
    //         navigation.navigate("NewPasswordScreen");
    //     }
    // };

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

        // listen to dynamic links
        // dynamicLinks()
        //     .getInitialLink()
        //     .then((link) => {
        //         console.log("======== Link useEffect =======");
        //         if (
        //             link.url === "https://gobimbelonline.net/newpassword"
        //         ) {
        //             console.log("new password called...");
        //             navigation.navigate("NewPasswordScreen");
        //         }
        //     });

        // // subscribe to dynamic link
        // const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // // When the component is unmounted, remove the listener
        // return () => unsubscribe();
    }, []);

    const sectionHeader = (title) => {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Text style={{...Fonts.black20Bold, flex: 1}}>{title}</Text>

                <TouchableOpacity activeOpacity={0.8}>
                    <Text style={{...Fonts.orangeColor14Bold}}>
                        Lihat Semua
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{flex: 1}}>
            <HomeCarousel />
            <HomeMenu />

            <View>
                {sectionHeader("Materi Baru")}

                <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <ProductCard />}
                    data={products}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 4.0,
                    }}
                />
            </View>

            <View>
                {sectionHeader("Materi Populer")}
                <FlatList
                    keyExtractor={(item) => `${item.id}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => <ProductCard />}
                    data={products}
                    contentContainerStyle={{
                        paddingHorizontal: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 4.0,
                    }}
                />
            </View>

            <View style={{height: 50}}></View>
        </View>
    );
};

export default HomeContent;

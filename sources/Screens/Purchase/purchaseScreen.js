import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultCard from "../../Components/Card/DefaultCard";
import Divider from "../../Components/Divider";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const PurchaseScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar backEnabled={false} title="Pembelian" />
            <View style={{flex: 1, padding: Sizes.fixPadding * 2}}>
                <DefaultCard>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.black17Bold,
                                color: Colors.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: Sizes.fixPadding * 2,
                                paddingVertical: Sizes.fixPadding / 2,
                                backgroundColor: Colors.primaryColor,
                                color: "white",
                                borderRadius: Sizes.fixPadding,
                                letterSpacing: 1.2,
                            }}
                        >
                            Pending
                        </Text>
                    </View>

                    <Divider />
                    <Text>14 Oktober 2021 17:30</Text>
                </DefaultCard>
                <DefaultCard>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.black17Bold,
                                color: Colors.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: Sizes.fixPadding * 2,
                                paddingVertical: Sizes.fixPadding / 2,
                                backgroundColor: "#28a745",
                                color: "white",
                                borderRadius: Sizes.fixPadding,
                                letterSpacing: 1.2,
                            }}
                        >
                            Sukses
                        </Text>
                    </View>

                    <Divider />
                    <Text>14 Oktober 2021 17:30</Text>
                </DefaultCard>
                <DefaultCard>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={{
                                flex: 1,
                                ...Fonts.black17Bold,
                                color: Colors.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: Sizes.fixPadding * 2,
                                paddingVertical: Sizes.fixPadding / 2,
                                backgroundColor: "#dc3545",
                                color: "white",
                                borderRadius: Sizes.fixPadding,
                                letterSpacing: 1.2,
                            }}
                        >
                            Expired
                        </Text>
                    </View>

                    <Divider />
                    <Text>14 Oktober 2021 17:30</Text>
                </DefaultCard>
            </View>
        </SafeAreaView>
    );
};

export default PurchaseScreen;

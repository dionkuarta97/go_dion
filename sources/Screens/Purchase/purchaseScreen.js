import React from "react";
import {SafeAreaView, Text, View} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultCard from "../../Components/Card/DefaultCard";
import Divider from "../../Components/Divider";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";

const PurchaseScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar backEnabled={false} title="Pembelian" />
            <View style={{flex: 1, padding: LpSizesUtils.fixPadding * 2}}>
                <DefaultCard>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text
                            style={{
                                flex: 1,
                                ...LpFontStyles.black17Bold,
                                color: LpColorsUtils.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: LpSizesUtils.fixPadding * 2,
                                paddingVertical: LpSizesUtils.fixPadding / 2,
                                backgroundColor: LpColorsUtils.primaryColor,
                                color: "white",
                                borderRadius: LpSizesUtils.fixPadding,
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
                                ...LpFontStyles.black17Bold,
                                color: LpColorsUtils.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: LpSizesUtils.fixPadding * 2,
                                paddingVertical: LpSizesUtils.fixPadding / 2,
                                backgroundColor: "#28a745",
                                color: "white",
                                borderRadius: LpSizesUtils.fixPadding,
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
                                ...LpFontStyles.black17Bold,
                                color: LpColorsUtils.orangeColor,
                            }}
                        >
                            GO-0123231123
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: LpSizesUtils.fixPadding * 2,
                                paddingVertical: LpSizesUtils.fixPadding / 2,
                                backgroundColor: "#dc3545",
                                color: "white",
                                borderRadius: LpSizesUtils.fixPadding,
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

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import CompStyles from "../../../Theme/styles/globalStyles";
import Fonts from "../../../Theme/Fonts";
import { useNavigation } from "@react-navigation/core";

const HomePendingPayment = () => {
    const navigation = useNavigation();
    return (
        <View>
            {true ? (
                <View
                    style={{
                        ...CompStyles.defaultCard,
                        marginHorizontal: Sizes.fixPadding * 2,
                        backgroundColor: Colors.primaryColor,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("PurchasePendingScreen");
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ flex: 1, ...Fonts.black15Bold }}>
                                Pending 1 pembayaran
                            </Text>
                            <MaterialIcons
                                name="chevron-right"
                                size={25}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View />
            )}
        </View>
    );
};

export default HomePendingPayment;

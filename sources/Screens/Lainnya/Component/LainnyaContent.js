import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import Fonts from "../../../Theme/Fonts";
import {useNavigation} from "@react-navigation/core";

const LainnyaContent = () => {
    const navigation = useNavigation();

    const renderTile = (lable, icon, screenName) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(screenName)}
            >
                <View
                    style={{
                        flexDirection: "row",
                        padding: Sizes.fixPadding * 2,
                        backgroundColor: "white",
                        elevation: 2,
                        marginBottom: Sizes.fixPadding * 2,
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons name={icon} size={28} color="gray" />
                    <Text
                        style={{
                            flex: 1,
                            ...Fonts.gray17Regular,
                            fontWeight: "bold",
                            marginLeft: Sizes.fixPadding,
                        }}
                    >
                        {lable}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{flex: 1, paddingVertical: Sizes.fixPadding * 2}}>
            {renderTile("Profil", "person", "ProfileScreen")}
            {renderTile("History Pengerjaan", "history")}
            {renderTile("Logout", "logout")}
        </View>
    );
};

export default LainnyaContent;

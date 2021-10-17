import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";
import Sizes from "../../Theme/Sizes";

import PropTypes from "prop-types";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

const propTypes = {
    title: PropTypes.string,
    rightItem: PropTypes.node,
    backEnabled: PropTypes.bool,
};

const DefaultAppBar = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.appBar}>
            <View style={{flex: 1, flexDirection: "row"}}>
                {props.backEnabled && (
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                )}
                <Text
                    style={{
                        ...Fonts.black19Bold,
                        marginLeft: Sizes.fixPadding,
                    }}
                >
                    {props.title}
                </Text>
            </View>
            {props.rightItem}
        </View>
    );
};

export default DefaultAppBar;

DefaultAppBar.propTypes = propTypes;

const styles = StyleSheet.create({
    appBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
});

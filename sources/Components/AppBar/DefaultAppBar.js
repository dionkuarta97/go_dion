import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import PropTypes from "prop-types";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

const propTypes = {
    title: PropTypes.string,
    rightItem: PropTypes.node,
};

const DefaultAppBar = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.appBar}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        ...LpFontStyles.black19Bold,
                        marginLeft: LpSizesUtils.fixPadding,
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
        backgroundColor: LpColorsUtils.primaryColor,
        paddingVertical: LpSizesUtils.fixPadding + 5.0,
        paddingHorizontal: LpSizesUtils.fixPadding * 2.0,
        elevation: 10.0,
    },
});

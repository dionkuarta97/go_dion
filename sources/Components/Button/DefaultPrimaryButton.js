import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";

const DefaultPrimaryButton = ({text, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.button}
        >
            <Text style={{...LpFontStyles.black19Bold}}>{text}</Text>
        </TouchableOpacity>
    );
};

export default DefaultPrimaryButton;

DefaultPrimaryButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: LpColorsUtils.primaryColor,
        paddingVertical: LpSizesUtils.fixPadding + 5.0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: LpSizesUtils.fixPadding - 5.0,
        marginVertical: LpSizesUtils.fixPadding + 5.0,
    },
});

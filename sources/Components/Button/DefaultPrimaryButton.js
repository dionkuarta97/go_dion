import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const DefaultPrimaryButton = ({ text, onPress, type }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={type == null ? styles.button : styles.outlinedButton}
        >
            <Text style={{ ...Fonts.black19Bold }}>{text}</Text>
        </TouchableOpacity>
    );
};

export default DefaultPrimaryButton;

DefaultPrimaryButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    type: PropTypes.string,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0,
    },
    outlinedButton: {
        paddingVertical: Sizes.fixPadding + 3.0,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.primaryColor,
        marginVertical: Sizes.fixPadding + 5.0,
    },
});

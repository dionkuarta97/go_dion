import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const DefaultPrimaryButton = ({text, onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.button}
        >
            <Text style={{...Fonts.black19Bold}}>{text}</Text>
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
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding + 5.0,
    },
});

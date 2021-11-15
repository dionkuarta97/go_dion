import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Colors from "../../Theme/Colors";
import Sizes from "../../Theme/Sizes";
import { TouchableOpacity } from "react-native-gesture-handler";

const RoundedButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <View
                style={{
                    backgroundColor: Colors.primaryColor,
                    paddingVertical: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding * 2,
                    borderRadius: 100,
                }}
            >
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default RoundedButton;

RoundedButton.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
};

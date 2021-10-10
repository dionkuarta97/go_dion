import React, {useState} from "react";
import {TextInput, View} from "react-native";
import PropTypes from "prop-types";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import {LpColorsUtils} from "../../Theme/utils/learnProUtils";

const DefaultTextInput = (props) => {
    const [focused, setFocused] = useState(false);
    return (
        <View
            style={{
                flexDirection: "row",
                marginVertical: 15,
                borderBottomColor: focused
                    ? LpColorsUtils.primaryColor
                    : "#898989",
                borderBottomWidth: 1,
            }}
        >
            <TextInput
                autoCapitalize="none"
                placeholder={props.placeholder}
                style={{
                    ...LpFontStyles.black17Regular,
                    paddingVertical: 5,
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};

export default DefaultTextInput;

DefaultTextInput.propTypes = {
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
};

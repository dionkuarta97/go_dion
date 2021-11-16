import React, {useState} from "react";
import {TextInput, View} from "react-native";
import PropTypes from "prop-types";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const DefaultTextInput = (props) => {
    const [focused, setFocused] = useState(false);
    return (
        <View
            style={{
                flexDirection: "row",
                marginVertical: 15,
                borderBottomColor: focused ? Colors.primaryColor : "#898989",
                borderBottomWidth: 1,
            }}
        >
            <TextInput
                autoCapitalize="none"
                value={props.value}
                placeholder={props.placeholder}
                style={{
                    flex: 1,
                    ...Fonts.black17Regular,
                    paddingVertical: Sizes.fixPadding / 2,
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
    value: PropTypes.string,
    onChangeText: PropTypes.func,
};

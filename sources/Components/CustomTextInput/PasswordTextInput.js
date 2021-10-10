import React, {useState} from "react";
import {TextInput, View} from "react-native";
import PropTypes from "prop-types";
import {Entypo} from "@expo/vector-icons";
import {LpColorsUtils, LpSizesUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";

const PasswordTextInput = (props) => {
    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    return (
        <View
            style={{
                flexDirection: "row",
                marginVertical: 15,
                alignItems: "center",
                borderBottomColor: focused
                    ? LpColorsUtils.primaryColor
                    : "#898989",
                borderBottomWidth: 1,
            }}
        >
            <TextInput
                autoCapitalize="none"
                placeholder={props.placeholder}
                secureTextEntry={passwordVisible}
                style={{
                    ...LpFontStyles.black17Regular,
                    paddingVertical: 5,
                    flex: 1,
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChangeText={props.onChangeText}
            />
            <View style={{paddingHorizontal: LpSizesUtils.fixPadding}}>
                <Entypo
                    name={passwordVisible ? "eye" : "eye-with-line"}
                    size={24}
                    color={focused ? LpColorsUtils.primaryColor : "#898989"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                />
            </View>
        </View>
    );
};

export default PasswordTextInput;

PasswordTextInput.propTypes = {
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
};

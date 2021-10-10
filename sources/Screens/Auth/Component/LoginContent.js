import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import {LpFontStyles, LpCompStyles} from "../../../Theme/styles/learnProStyles";
import {LpColorsUtils, LpSizesUtils} from "../../../Theme/utils/learnProUtils";

const LoginContent = () => {
    const navigation = useNavigation();

    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const registerText = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
            >
                <Text
                    style={{
                        ...LpFontStyles.gray18Bold,
                        textAlign: "center",
                        marginTop: LpSizesUtils.fixPadding - 5.0,
                        marginBottom: LpSizesUtils.fixPadding,
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        );
    };

    const forgetPasswordText = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
                <Text
                    style={{
                        ...LpFontStyles.gray18Bold,
                        textAlign: "center",
                    }}
                >
                    Forgot your password?
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                paddingVertical: LpSizesUtils.fixPadding * 7.0,
                paddingHorizontal: LpSizesUtils.fixPadding * 2.0,
            }}
        >
            <DefaultTextInput
                placeholder="Username"
                onChangeText={(value) => setUsernameText(value)}
            />
            <PasswordTextInput
                placeholder="Password"
                onChangeText={(value) => setPasswordText(value)}
            />

            <DefaultPrimaryButton text="Sign In" />
            {registerText()}
            {forgetPasswordText()}
        </View>
    );
};

export default LoginContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

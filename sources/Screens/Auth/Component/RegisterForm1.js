import React from "react";
import {Text, View} from "react-native";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const RegisterForm1 = () => {
    return (
        <View>
            <Text style={{...Fonts.black20Bold}}>Account Form</Text>

            <DefaultTextInput
                placeholder="Email"
                onChangeText={(value) => {}}
            />

            <DefaultTextInput
                placeholder="Full Name"
                onChangeText={(value) => {}}
            />

            <DefaultTextInput
                placeholder="Phone Number"
                onChangeText={(value) => {}}
            />

            <DefaultTextInput
                placeholder="Class Level"
                onChangeText={(value) => {}}
            />

            <PasswordTextInput
                placeholder="Password"
                onChangeText={(value) => {}}
            />

            <PasswordTextInput
                placeholder="Password Repeat"
                onChangeText={(value) => {}}
            />
        </View>
    );
};

export default RegisterForm1;
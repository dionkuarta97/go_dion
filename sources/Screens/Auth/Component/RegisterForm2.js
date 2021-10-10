import React from "react";
import {Text, View} from "react-native";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import {LpFontStyles} from "../../../Theme/styles/learnProStyles";

const RegisterForm2 = () => {
    return (
        <View>
            <Text style={{...LpFontStyles.black20Bold}}>Wali Info Form</Text>

            <DefaultTextInput
                placeholder="Wali Name"
                onChangeText={(value) => {}}
            />

            <DefaultTextInput
                placeholder="Wali Phone Number"
                onChangeText={(value) => {}}
            />

            <DefaultTextInput
                placeholder="Wali Email"
                onChangeText={(value) => {}}
            />
        </View>
    );
};

export default RegisterForm2;

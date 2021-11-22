import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import PasswordTextInput from "../../Components/CustomTextInput/PasswordTextInput";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";

const NewPasswordScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="New Password" />
            <View style={{flex: 1, padding: Sizes.fixPadding * 2}}>
                <Text style={{...Fonts.black15Bold}}>
                    Masukkan password baru kamu
                </Text>
                <PasswordTextInput
                    placeholder="New Password"
                    onChangeText={setPassword}
                />
                <PasswordTextInput
                    placeholder="Repeat New Password"
                    onChangeText={setRepeatPassword}
                />
                {password !== repeatPassword && (
                    <Text style={{color: Colors.neutralRedColor}}>
                        Password tidak sama
                    </Text>
                )}
                <View style={{flex: 1}} />

                {password !== "" && password === repeatPassword && (
                    <DefaultPrimaryButton text="Submit" />
                )}
            </View>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
        </SafeAreaView>
    );
};

export default NewPasswordScreen;

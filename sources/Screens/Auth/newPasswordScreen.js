import {useNavigation} from "@react-navigation/core";
import React, {useState, useEffect} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import DefaultModal from "../../Components/Modal/DefaultModal";
import {updatePassword} from "../../Redux/Profile/profileActions";

const NewPasswordScreen = ({route}) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const params = route.params;

    const dispatch = useDispatch();

    const _updatePassword = useSelector(
        (state) => state.profileReducer.updatePassword
    );

    useEffect(() => {
        console.log("params ===> ", params);
    }, []);

    function updateParams() {
        console.log("update params...");
        var par = {
            email: params.email,
            token: params.token,
            password: password,
        };

        dispatch(updatePassword(par));
    }

    function passwordValidation(text) {
        if (text.length < 8) return "Password must be atleast 8 characters";
        if (!text.match(new RegExp("[A-Z]")))
            return "Password must contain at least one uppercase";
        if (!text.match(new RegExp("[a-z]")))
            return "Password must contain at least one lowercase";
        if (text.search(/[0-9]/) < 0) {
            return "Your password must contain at least one digit";
        }
        return null;
    }

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
                {passwordValidation(password) != null && (
                    <Text style={{fontSize: 12, color: "red", opacity: 0.5}}>
                        {passwordValidation(password)}
                    </Text>
                )}
                <PasswordTextInput
                    placeholder="Repeat New Password"
                    onChangeText={setRepeatPassword}
                />
                {password !== repeatPassword && (
                    <Text style={{fontSize: 12, color: "red", opacity: 0.5}}>
                        Password Tidak Sama
                    </Text>
                )}
                <View style={{flex: 1}} />

                {password !== "" && password === repeatPassword && (
                    <DefaultPrimaryButton
                        text="Submit"
                        onPress={() => updateParams()}
                    />
                )}

                {_updatePassword.data == 200 && (
                    <DefaultModal>
                        <Text>Password Berhasil Diperbaharui</Text>
                        <DefaultPrimaryButton
                            text="Ke Halaman Login"
                            onPress={() => {
                                // todo : replace route to init
                                navigation.goBack();
                                navigation.goBack();
                            }}
                        />
                    </DefaultModal>
                )}

{_updatePassword.data == 400 && (
                    <DefaultModal>
                        <Text>Password Gagal Diperbaharui</Text>
                        <DefaultPrimaryButton
                            text="Ke Halaman Login"
                            onPress={() => {
                                // todo : replace route
                                // _updatePassword.data = 0
                                navigation.goBack();
                                // navigation.navigate("LoginScreen");
                            }}
                        />
                    </DefaultModal>
                )}

                {_updatePassword.error !== null && (
                    <Text style={{color: "red"}}>{login.error}</Text>
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

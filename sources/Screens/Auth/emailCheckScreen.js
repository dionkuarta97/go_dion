import {useNavigation} from "@react-navigation/core";
import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import {getEmailCheck, setEmailCheck} from "../../Redux/Auth/authActions";
import Colors from "../../Theme/Colors";
import Sizes from "../../Theme/Sizes";

const EmailCheckScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const checkEmail = useSelector((state) => state.authReducer.checkEmail);

    useEffect(() => {
        dispatch(setEmailCheck({loading: false, data: null, error: null}));
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Check Email" backEnabled={true} />
            <View style={{padding: Sizes.fixPadding * 2}}>
                <Text>Ketikkan alamat email yang akan kamu gunakan.</Text>
                <View style={{marginVertical: 30}}>
                    <TextInput
                        style={{
                            height: 40,
                            padding: 10,
                            backgroundColor: "white",
                            borderRadius: 5,
                        }}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="ketikkan email kamu"
                    />
                </View>
                <DefaultPrimaryButton
                    text="Check"
                    onPress={() => dispatch(getEmailCheck(email))}
                />
            </View>
            {checkEmail.loading && (
                <ActivityIndicator color={Colors.orangeColor} size={24} />
            )}
            {checkEmail.error !== null && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>{checkEmail.error}</Text>
                </View>
            )}
            {checkEmail.data !== null && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: Sizes.fixPadding * 2,
                    }}
                >
                    <Text>{checkEmail.data}</Text>
                    <View
                        style={{
                            width: "100%",
                        }}
                    >
                        <DefaultPrimaryButton
                            text="Continue Register"
                            onPress={() =>
                                navigation.navigate("RegisterScreen", {
                                    email: email,
                                })
                            }
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default EmailCheckScreen;

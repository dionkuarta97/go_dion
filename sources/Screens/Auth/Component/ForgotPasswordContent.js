import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {Text, View} from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import {Fontisto} from "@expo/vector-icons";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const ForgotPasswordContent = () => {
    const navigation = useNavigation();

    const [kirim, setKirim] = useState(false);
    return (
        <View
            style={{
                paddingVertical: Sizes.fixPadding * 7.0,
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}
        >
            {!kirim ? (
                <View>
                    <View style={{marginBottom: Sizes.fixPadding}}>
                        <Text style={{...Fonts.black17Regular}}>
                            Masukkan email yang kamu daftarkan. Kami akan
                            mengirimkan link untuk informasi password
                        </Text>
                    </View>
                    <DefaultTextInput placeholder="email kamu" />

                    <DefaultPrimaryButton
                        text="Kirim Permintaan"
                        onPress={() => setKirim(true)}
                    />
                </View>
            ) : (
                <View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Fontisto
                            name="paper-plane"
                            size={100}
                            color={Colors.primaryColor}
                        />
                        <View
                            style={{marginVertical: 50, alignItems: "center"}}
                        >
                            <Text style={{...Fonts.black17Regular}}>
                                Kami mengirimkan link ke email kamu
                            </Text>
                            <Text
                                style={{
                                    ...Fonts.black17Bold,
                                    marginTop: 20,
                                }}
                            >
                                emailku@gmail.com
                            </Text>
                        </View>
                    </View>
                    <DefaultPrimaryButton
                        text="Kembali ke halaman login"
                        onPress={() => navigation.goBack()}
                    />
                </View>
            )}
        </View>
    );
};

export default ForgotPasswordContent;

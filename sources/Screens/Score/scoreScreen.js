import {useNavigation} from "@react-navigation/core";
import React, {useState} from "react";
import {Dimensions, Image, SafeAreaView, Text, View} from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";

const ScoreScreen = () => {
    const navigation = useNavigation();

    const [done, setDone] = useState(false);
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Detail Score" />
            <View style={{flex: 1}}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{height: 200}}
                        resizeMode="contain"
                        source={require("../../../assets/Images/soal/onscoring.png")}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: "white",
                        paddingHorizontal: 25,
                        paddingVertical: 25,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        elevation: 30,
                        minHeight: Dimensions.get("screen").height * 0.5,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{fontWeight: "bold"}}>
                            Jawaban kamu sedang dinilai,
                        </Text>
                        <Text style={{color: "grey", textAlign: "center"}}>
                            Jadi tunggu beberapa saat lagi, lakukan Refresh Skor
                            untuk melihat kondisi nilai kamu
                        </Text>
                    </View>
                    {!done && (
                        <DefaultPrimaryButton
                            text={"Refresh Skor"}
                            onPress={() => setDone(true)}
                        />
                    )}
                    {done && (
                        <DefaultPrimaryButton
                            text={"Kembali ke Home"}
                            onPress={() => navigation.goBack()}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ScoreScreen;

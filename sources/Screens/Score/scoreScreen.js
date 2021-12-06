import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { getScore } from "../../Redux/Score/scoreActions";
import Sizes from "../../Theme/Sizes";
import OnResult from "./Component/OnResult";
import OnScoring from "./Component/OnScoring";

const ScoreScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const idMateri = props.route.params.idMateri;

    const score = useSelector((state) => state.scoreReducer.score);

    useEffect(() => {
        dispatch(getScore(idMateri));
    }, []);

    const [done, setDone] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="Detail Score" />
            <View style={{ flex: 1, position: "relative" }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingVertical: Sizes.fixPadding * 2,
                    }}
                >
                    <Image
                        style={{ height: 200 }}
                        resizeMode="contain"
                        source={require("../../../assets/Images/soal/onscoring.png")}
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "white",
                        paddingHorizontal: 25,
                        paddingVertical: 25,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        elevation: 30,
                        minHeight: Dimensions.get("screen").height * 0.5,
                        width: Dimensions.get("screen").width,
                    }}
                >
                    {score.data === null && (
                        <View style={{ flex: 1 }}>
                            <OnScoring />
                            <DefaultPrimaryButton
                                text={"Refresh Skor"}
                                onPress={() => dispatch(getScore(idMateri))}
                            />
                        </View>
                    )}
                    {score.data !== null && (
                        <View style={{ flex: 1 }}>
                            <OnResult detail={score.data} />
                            <DefaultPrimaryButton
                                text={"Kembali ke Home"}
                                onPress={() => navigation.popToTop()}
                            />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ScoreScreen;

import React, {useCallback, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Image,
    Dimensions,
    Text,
    TouchableHighlight,
    Alert,
    StatusBar,
} from "react-native";
import imgMateri from "../../../assets/Images/laporan/tryout2.png";
import imgTryout from "../../../assets/Images/laporan/soal.png";
import {MaterialIcons} from "@expo/vector-icons";
import Fonts from "../../Theme/Fonts";

import {useNavigation} from "@react-navigation/core";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import {useToast} from "native-base";
import {useDispatch, useSelector} from "react-redux";

import NoData from "../../Components/NoData";
import {getTahunAjaran} from "../../Redux/Data/dataActions";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import Analytics from "../../Services/goAnalytics";
import {EventAnalytic} from "../../Utils/event_analytic";
const PilihLeaderboardScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const {isLogin} = useSelector((state) => state.authReducer);
    const {listTahunAjaran} = useSelector((state) => state.dataReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        checkInternet().then((data) => {
            if (data) {
                dispatch(getTahunAjaran());
            } else {
                toast.show({
                    placement: "top",
                    duration: null,
                    width: Dimensions.get("screen").width / 1.3,
                    render: ({id}) => {
                        return (
                            <>
                                <ToastErrorContent
                                    content="Kamu tidak terhubung ke internet"
                                    onPress={() => {
                                        toast.closeAll();
                                    }}
                                />
                            </>
                        );
                    },
                });
            }
        });
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <SliverAppBar
                element={
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Text style={Fonts.black25Bold}>Leaderboard</Text>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                {!isLogin ? (
                    <View
                        style={{
                            marginTop: 50,
                        }}
                    >
                        <NoData
                            msg="Halaman ini akan muncul setelah kamu login"
                            img="noimage"
                        />
                    </View>
                ) : (
                    <>
                        {listTahunAjaran.loading ? (
                            <LoadingIndicator />
                        ) : (
                            <View style={{padding: 20}}>
                                <TouchableHighlight
                                    style={{borderRadius: 15}}
                                    onPress={() => {
                                        if (listTahunAjaran.data) {
                                            /** send analytic */
                                            Analytics.logCustomEvent(
                                                EventAnalytic.GoLeaderboardTryout
                                            );

                                            navigation.navigate(
                                                "LeaderTryoutScreen"
                                            );
                                        } else {
                                            Alert.alert(
                                                "Error",
                                                "Terjadi kesalahan pada server"
                                            );
                                        }
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            height:
                                                Dimensions.get("screen")
                                                    .height / 6.5,
                                            flexDirection: "row",
                                            padding: 20,
                                            elevation: 4,
                                            borderRadius: 15,
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "white",
                                                elevation: 3,
                                                borderRadius: 15,
                                            }}
                                        >
                                            <Image
                                                source={imgMateri}
                                                style={{
                                                    width:
                                                        Dimensions.get("screen")
                                                            .width / 4,
                                                    height:
                                                        Dimensions.get("screen")
                                                            .width / 4,
                                                }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                marginEnd: "auto",
                                                marginStart: 10,
                                                justifyContent: "center",
                                                flex: 1,
                                            }}
                                        >
                                            <Text
                                                style={{...Fonts.black17Bold}}
                                            >
                                                Tryout
                                            </Text>
                                            <Text
                                                style={{...Fonts.gray15Regular}}
                                            >
                                                Leaderboard Tryout yang telah
                                                kamu kerjakan
                                            </Text>
                                        </View>

                                        <View
                                            style={{justifyContent: "center"}}
                                        >
                                            <MaterialIcons
                                                name="arrow-forward-ios"
                                                size={30}
                                                color="black"
                                            />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{borderRadius: 15, marginTop: 15}}
                                    onPress={() => {
                                        if (listTahunAjaran.data) {
                                            navigation.navigate(
                                                "LeaderboardScreen"
                                            );
                                        } else {
                                            Alert.alert(
                                                "Error",
                                                "Terjadi kesalahan pada server"
                                            );
                                        }
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            height:
                                                Dimensions.get("screen")
                                                    .height / 6.5,
                                            flexDirection: "row",
                                            padding: 20,
                                            elevation: 4,
                                            borderRadius: 15,
                                        }}
                                    >
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "white",
                                                elevation: 3,
                                                borderRadius: 15,
                                            }}
                                        >
                                            <Image
                                                source={imgTryout}
                                                style={{
                                                    width:
                                                        Dimensions.get("screen")
                                                            .width / 4,
                                                    height:
                                                        Dimensions.get("screen")
                                                            .width / 4,
                                                }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                marginEnd: "auto",
                                                marginStart: 10,
                                                justifyContent: "center",
                                                flex: 1,
                                            }}
                                        >
                                            <Text
                                                style={{...Fonts.black17Bold}}
                                            >
                                                Pengerjaan Soal
                                            </Text>
                                            <Text
                                                style={{...Fonts.gray15Regular}}
                                            >
                                                Leaderboard semua soal yang
                                                telah kamu kerjakan
                                            </Text>
                                        </View>

                                        <View
                                            style={{justifyContent: "center"}}
                                        >
                                            <MaterialIcons
                                                name="arrow-forward-ios"
                                                size={30}
                                                color="black"
                                            />
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )}
                    </>
                )}
                <StatusBar backgroundColor={Colors.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default PilihLeaderboardScreen;

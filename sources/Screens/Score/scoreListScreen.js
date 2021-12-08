import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";
import { getListScore } from "../../Redux/Score/scoreActions";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import Fonts from "../../Theme/Fonts";
import { useNavigation } from "@react-navigation/core";

const ScoreListScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const listScore = useSelector((state) => state.scoreReducer.listScore);
    console.log(listScore);

    useEffect(() => {
        dispatch(getListScore());
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="My Score List" backEnabled={true} />
            {listScore.loading && <LoadingIndicator />}
            {listScore.data !== null && (
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: Sizes.fixPadding * 2,
                        paddingVertical: Sizes.fixPadding,
                    }}
                >
                    {listScore.data.length === 0 ? (
                        <EmptyIndicator />
                    ) : (
                        listScore.data.map((item, idx) => (
                            <View
                                key={item._id}
                                style={{ ...CompStyles.defaultCard }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ScoreScreen", {
                                            idMateri: item._id,
                                        });
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: Sizes.fixPadding,
                                        }}
                                    >
                                        <MaterialIcons
                                            name="calendar-today"
                                            size={20}
                                            color="black"
                                        />
                                        <Text
                                            style={{
                                                flex: 1,
                                                marginLeft:
                                                    Sizes.fixPadding / 2,
                                            }}
                                        >
                                            {moment(item.created_at).format(
                                                "DD MMM YYYY, HH:mm"
                                            ) + " WIB"}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...Fonts.black15Bold,
                                                flex: 1,
                                            }}
                                        >
                                            My Score
                                        </Text>
                                        <Text style={{ ...Fonts.black15Bold }}>
                                            {
                                                item.sessions
                                                    .total_session_final_score
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

export default ScoreListScreen;

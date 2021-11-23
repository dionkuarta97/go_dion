import {useNavigation} from "@react-navigation/core";
import React, {useEffect} from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import {useDispatch, useSelector} from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import {getMateriDetail} from "../../Redux/Materi/materiActions";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";
import LoadingIndicator from "../../Components/Indicator/LoadingIndicator";

const SubMateriScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const materiDetail = useSelector(
        (state) => state.materiReducer.materiDetail
    );

    useEffect(() => {
        dispatch(getMateriDetail());
    }, []);

    const renderSubItem = (title, onPress) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}>
                <View
                    style={{
                        paddingVertical: Sizes.fixPadding * 2,
                        paddingHorizontal: Sizes.fixPadding,
                        borderBottomWidth: 1,
                        borderBottomColor: "lightgrey",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <Text style={{...Fonts.black15Regular, flex: 1}}>
                        {title}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={30}
                        color={Colors.orangeColor}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem = (item) => {
        return (
            <View style={CompStyles.defaultCard} key={item._id}>
                <ExpandableTile
                    header={
                        <View style={{flexDirection: "row"}}>
                            <View
                                style={{
                                    height: 80,
                                    width: 80,
                                    backgroundColor: Colors.orangeColor,
                                    borderRadius: Sizes.fixPadding,
                                }}
                            ></View>
                            <View
                                style={{marginLeft: Sizes.fixPadding, flex: 1}}
                            >
                                <Text style={Fonts.gray15Bold}>
                                    {item.title}
                                </Text>
                                <Text style={Fonts.black17Bold}>
                                    {item.desc}
                                </Text>
                            </View>
                        </View>
                    }
                >
                    {renderSubItem("Video", () =>
                        navigation.navigate("MateriVideoScreen", {
                            videos: item.video,
                        })
                    )}
                    {renderSubItem("E-Book", () =>
                        navigation.navigate("MateriEbookScreen")
                    )}
                    {renderSubItem("Quiz")}
                </ExpandableTile>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Pendahuluan" backEnabled={true} />
            <View style={styles.container}>
                {/* {renderItem("Video", "Kumpulan video menarik")}
                {renderItem("PDF", "Materi belajar disini")}
                {renderItem("Ujian", "Uji pemahaman", () =>
                    navigation.navigate("TryoutDetailScreen")
                )} */}
                {materiDetail.loading && <LoadingIndicator />}
                {materiDetail.data !== null && (
                    <View style={{flex: 1}}>
                        {materiDetail.data.map((item, index) => {
                            return renderItem(item);
                        })}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SubMateriScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Sizes.fixPadding * 2,
    },
});

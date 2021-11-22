import React from "react";
import {useNavigation} from "@react-navigation/core";
import {SafeAreaView, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ExpandableTile from "../../Components/Tile/ExpendableTile";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";

const GoBelajarScreen = () => {
    const navigation = useNavigation();

    const renderItem = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("SubMateriScreen")}
            >
                <View style={CompStyles.defaultCard}>
                    <View style={{flexDirection: "row"}}>
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                backgroundColor: Colors.orangeColor,
                                borderRadius: 12,
                            }}
                        ></View>
                        <View
                            style={{
                                flex: 1,
                                marginLeft: Sizes.fixPadding,
                            }}
                        >
                            <Text style={{...Fonts.black17Bold}}>
                                Fisika SMP Kelas I Bab I-III
                            </Text>
                            <Text style={{...Fonts.gray15Regular}}>
                                Pelajaran fisika untuk SMP kelas 1
                            </Text>
                            <View style={{flex: 1}} />
                            <Text
                                style={{
                                    ...Fonts.indigoColor16Bold,
                                    color: "blue",
                                }}
                            >
                                3 Materi
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Materi Belajar" backEnabled={true} />
            <View
                style={{
                    paddingVertical: Sizes.fixPadding * 3,
                    paddingHorizontal: Sizes.fixPadding * 2,
                }}
            >
                {renderItem()}
                {renderItem()}
                {renderItem()}
                {renderItem()}
            </View>
        </SafeAreaView>
    );
};

export default GoBelajarScreen;

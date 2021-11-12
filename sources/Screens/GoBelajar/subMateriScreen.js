import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import CompStyles from "../../Theme/styles/globalStyles";

const SubMateriScreen = () => {
    const renderItem = (title, subtitle) => {
        return (
            <TouchableOpacity activeOpacity={0.6}>
                <View style={CompStyles.defaultCard}>
                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={{
                                height: 80,
                                width: 80,
                                backgroundColor: Colors.orangeColor,
                                borderRadius: Sizes.fixPadding,
                            }}
                        ></View>
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={Fonts.gray15Bold}>{title}</Text>
                            <Text style={Fonts.black17Bold}>{subtitle}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="Pendahuluan" backEnabled={true} />
            <View style={styles.container}>
                <Text style={Fonts.black17Bold}>
                    BAB IV - Perbedaan Meteoroid, Meteorit dan Meteor
                </Text>
                {renderItem("Video", "Kumpulan video menarik")}
                {renderItem("PDF", "Materi belajar disini")}
                {renderItem("Ujian", "Uji pemahaman")}
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

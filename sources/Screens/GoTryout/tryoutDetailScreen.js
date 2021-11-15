import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";

const TryoutDetailScreen = () => {
    const navigation = useNavigation();

    const tryoutSubItem = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("SoalScreen")}>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text>Tes</Text>
                    <Text
                        style={{
                            flex: 1,
                            marginHorizontal: Sizes.fixPadding,
                        }}
                    >
                        Penalaran Umum
                    </Text>
                    <Text>Done</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const tryoutCard = () => {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding,
                    padding: Sizes.fixPadding,
                    backgroundColor: "white",
                    elevation: 2,
                }}
            >
                <Text style={{ ...Fonts.black17Bold }}>
                    Tryout UTBK Agustus
                </Text>
                <Text style={{ ...Fonts.orangeColor14Bold }}>
                    TPS (76 Soal - 105 menit)
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    {tryoutSubItem()}
                    {tryoutSubItem()}
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar title="Tryout Detail" backEnabled={true} />
            {tryoutCard()}
            {tryoutCard()}
        </SafeAreaView>
    );
};

export default TryoutDetailScreen;

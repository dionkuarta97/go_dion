import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import LainnyaContent from "./Component/LainnyaContent";

const LainnyaScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
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
                        <Text style={Fonts.black25Bold}>Lainnya</Text>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <LainnyaContent />
                <StatusBar backgroundColor={Colors.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default LainnyaScreen;

import React from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import ProfileContent from "./Component/ProfileContent";
import {useNavigation} from "@react-navigation/core";
import {useSelector} from "react-redux";

const ProfileScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <SliverAppBar
                leftItem={
                    <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.goBack()}
                    />
                }
                element={
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Text style={Fonts.black25Bold}>Akun Profil</Text>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <ProfileContent />
                <StatusBar backgroundColor={Colors.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default ProfileScreen;

import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import {getSliderImages} from "../../Redux/Home/homeActions";
import HomeContent from "./Component/HomeContent";
import {useNavigation} from "@react-navigation/core";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const HomeScreen = (props) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1}}>
            <SliverAppBar
                rightItem={
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate("LoginScreen")}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                    borderRadius: 50,
                                    backgroundColor: Colors.blackColor,
                                    color: Colors.primaryColor,
                                    fontWeight: "bold",
                                    letterSpacing: 1.2,
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                        <View style={{width: 15}}></View>
                        <MaterialIcons
                            name="notifications"
                            size={25}
                            color="black"
                            onPress={() =>
                                // props.navigation.navigate("Notification")
                                console.log("notif")
                            }
                        />
                    </View>
                }
                element={
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <View style={{flex: 1}}>
                            <Text>Hello,</Text>
                            <Text style={Fonts.black25Bold}>Guest</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                this.props.navigation.navigate("AccountSetting")
                            }
                        >
                            <Image
                                style={{
                                    height: 80.0,
                                    width: 80.0,
                                    borderRadius: 40.0,
                                }}
                                source={require("../../../assets/Images/user_profile/user_3.jpg")}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                }
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <HomeContent />
                <StatusBar backgroundColor={Colors.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

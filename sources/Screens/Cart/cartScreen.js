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
import {LpColorsUtils} from "../../Theme/utils/learnProUtils";
import {LpFontStyles} from "../../Theme/styles/learnProStyles";
import HomeContent from "../Home/Component/HomeContent";

const CartScreen = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <SliverAppBar
                rightItem={
                    <MaterialIcons
                        name="notifications"
                        size={25}
                        color="black"
                        onPress={() =>
                            props.navigation.navigate("Notification")
                        }
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
                        <Text style={LpFontStyles.black25Bold}>Cart</Text>
                    </View>
                }
                toolbarColor={LpColorsUtils.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={230}
                src={require("../../../assets/Images/appbar_bg.png")}
            >
                <HomeContent />
                <StatusBar backgroundColor={LpColorsUtils.primaryColor} />
            </SliverAppBar>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

import React from "react";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Colors from "../../Theme/Colors";
import {useNavigation} from "@react-navigation/core";
import {useSelector} from "react-redux";

const ActionButtonCart = () => {
    const cart = useSelector((state) => state.cartReducer.cart);
    const navigation = useNavigation();
    return (
        <View>
            <View style={{position: "relative"}}>
                <MaterialIcons
                    name="shopping-cart"
                    size={25}
                    color="black"
                    onPress={() => {
                        if (cart.length > 0) navigation.navigate("CartScreen");
                    }}
                />
            </View>
            {cart.length > 0 && (
                <View
                    style={{
                        position: "absolute",
                        width: 18,
                        height: 18,
                        backgroundColor: Colors.orangeColor,
                        right: -9,
                        top: -9,
                        borderRadius: 9,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{fontSize: 10}}>{cart.length}</Text>
                </View>
            )}
        </View>
    );
};

export default ActionButtonCart;

import React from "react";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Colors from "../../Theme/Colors";
import {useNavigation} from "@react-navigation/core";

const ActionButtonCart = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={{position: "relative"}}>
                <MaterialIcons
                    name="shopping-cart"
                    size={25}
                    color="black"
                    onPress={() => navigation.navigate("CartScreen")}
                />
            </View>
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
                <Text style={{fontSize: 10}}>12</Text>
            </View>
        </View>
    );
};

export default ActionButtonCart;
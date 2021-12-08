import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const ActionButtonHome = () => {
    const navigation = useNavigation();

    return (
        <MaterialIcons
            name="home"
            size={25}
            color="black"
            onPress={() => navigation.popToTop()}
        />
    );
};

export default ActionButtonHome;

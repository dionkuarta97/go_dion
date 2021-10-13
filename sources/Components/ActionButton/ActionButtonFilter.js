import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/core";

const ActionButtonFilter = () => {
    const navigation = useNavigation();

    return (
        <MaterialIcons
            name="search"
            size={25}
            color="black"
            onPress={() => navigation.navigate("FilterScreen")}
        />
    );
};

export default ActionButtonFilter;

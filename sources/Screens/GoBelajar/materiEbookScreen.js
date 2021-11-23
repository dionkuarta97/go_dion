import React from "react";
import {SafeAreaView, Text, View} from "react-native";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";

const MateriEbookScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="E-Book List" backEnabled={true} />
            <View style={{flex: 1}}>
                <EmptyIndicator />
            </View>
        </SafeAreaView>
    );
};

export default MateriEbookScreen;

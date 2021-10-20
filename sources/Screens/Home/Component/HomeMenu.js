import React, {useEffect, useState} from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    VirtualizedList,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";
import {getHomeMenu} from "../../../Redux/Home/homeActions";
import {FlatList} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/core";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const HomeMenu = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const homeMenuState = useSelector((state) => state.homeReducer.homeMenu);

    useEffect(() => {
        dispatch(getHomeMenu());
    }, []);

    const onPressItem = (idx) => {
        switch (idx) {
            case 0:
                navigation.navigate("ProductScreen");
                break;

            default:
                break;
        }
    };

    const menuComponent = (item) => {
        return (
            <TouchableOpacity
                style={{marginHorizontal: 15}}
                onPress={() => onPressItem(item.idx)}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View style={styles.menu}>
                        <Image
                            source={{uri: item.image}}
                            style={{
                                width: 65,
                                height: 65,
                                tintColor: Colors.orangeColor,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            ...Fonts.black15Bold,
                            marginTop: Sizes.fixPadding,
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 20,
            }}
        >
            {homeMenuState.loading && homeMenuState.error == null ? (
                <View>
                    <Text>Loading.. </Text>
                </View>
            ) : (
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `homemenu${item._id}`}
                    data={homeMenuState.data}
                    renderItem={({item}) => menuComponent(item)}
                />
            )}
        </View>
    );
};

export default HomeMenu;

const styles = StyleSheet.create({
    menu: {
        height: 120,
        width: 120,
        elevation: 1,
        backgroundColor: Colors.whiteColor,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
});
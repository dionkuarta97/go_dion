import React, {useEffect} from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    Text,
    View,
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import SliverAppBar from "../../Components/sliverAppBar";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import {FlatGrid} from "react-native-super-grid";
import ProductCard from "../../Components/ProductCard";
import {useNavigation} from "@react-navigation/core";
import ActionButtonFilter from "../../Components/ActionButton/ActionButtonFilter";
import {useDispatch, useSelector} from "react-redux";
import {getPurchasedproduk} from "../../Redux/Produk/produkActions";

const ProductPurchasedScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const purchasedProduk = useSelector(
        (state) => state.produkReducer.purchasedProduk
    );

    const section_id = props.route.params.id;

    useEffect(() => {
        dispatch(getPurchasedproduk(section_id));
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title="Produk Terbeli"
                backEnabled={true}
                rightItem={
                    <View style={{flexDirection: "row"}}>
                        <ActionButtonFilter />
                        <View style={{width: 15}} />
                        <ActionButtonCart />
                    </View>
                }
            />
            <View style={{flex: 1}}>
                {purchasedProduk.loading && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ActivityIndicator
                            color={Colors.orangeColor}
                            size={30}
                        />
                    </View>
                )}
                {purchasedProduk.data !== null &&
                    (purchasedProduk.data.length !== 0 ? (
                        <FlatGrid
                            listKey="productlist"
                            itemDimension={220}
                            renderItem={({item}) => (
                                <ProductCard
                                    key={item._id}
                                    data={item}
                                    section={title}
                                />
                            )}
                            data={purchasedProduk.data}
                        />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text>Produk Kosong</Text>
                        </View>
                    ))}
            </View>
        </SafeAreaView>
    );
};

export default ProductPurchasedScreen;

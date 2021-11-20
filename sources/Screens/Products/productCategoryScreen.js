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
import {getAllProduk} from "../../Redux/Produk/produkActions";
import PurchasedProductBottom from "./Component/PurchasedProductBottom";

const products = [
    {id: 1, title: "a"},
    {id: 2, title: "a"},
    {id: 3, title: "a"},
    {id: 4, title: "a"},
    {id: 5, title: "a"},
    {id: 6, title: "a"},
];

const ProductCategoryScreen = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allProduk = useSelector((state) => state.produkReducer.allProduk);

    const section_id = props.route.params.id;
    const title = props.route.params.title;

    useEffect(() => {
        dispatch(getAllProduk(section_id));
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title={title}
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
                {allProduk.loading && (
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
                {allProduk.data !== null &&
                    (allProduk.data.length !== 0 ? (
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
                            data={allProduk.data}
                        />
                    ) : (
                        <Text>Produk Kosong</Text>
                    ))}
            </View>
            <PurchasedProductBottom sectionId={section_id} />
        </SafeAreaView>
    );
};

export default ProductCategoryScreen;

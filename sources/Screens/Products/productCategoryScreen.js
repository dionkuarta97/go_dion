import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import SliverAppBar from "../../Components/sliverAppBar";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import { FlatGrid } from "react-native-super-grid";
import ProductCard from "../../Components/ProductCard";
import { useNavigation } from "@react-navigation/core";
import ActionButtonFilter from "../../Components/ActionButton/ActionButtonFilter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduk } from "../../Redux/Produk/produkActions";
import PurchasedProductBottom from "./Component/PurchasedProductBottom";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CompStyles from "../../Theme/styles/globalStyles";
import NumberFormat from "react-number-format";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";

const products = [
  { id: 1, title: "a" },
  { id: 2, title: "a" },
  { id: 3, title: "a" },
  { id: 4, title: "a" },
  { id: 5, title: "a" },
  { id: 6, title: "a" },
];

const ProductCategoryScreen = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const { allProduk, loading, loadingDua, totalData } = useSelector(
    (state) => state.produkReducer
  );
  const section_id = props.route.params.id;
  const title = props.route.params.title;

  useEffect(() => {
    dispatch(getAllProduk(section_id, page));
  }, []);
  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) {
      console.log("masuk atas");
      return true;
    }
    return false;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title={title}
        backEnabled={true}
        rightItem={
          <View style={{ flexDirection: "row" }}>
            <ActionButtonFilter />
            <View style={{ width: 15 }} />
            <ActionButtonCart />
          </View>
        }
      />
      {allProduk.loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={Colors.orangeColor} size={30} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {allProduk.data !== null &&
            (allProduk.data.length !== 0 ? (
              <FlatList
                onScroll={(e) => {
                  if (allProduk.data?.length !== totalData) {
                    if (handleInfinityScroll(e)) {
                      if (!loading) {
                        setPage(page + 1);
                        dispatch(getAllProduk(section_id, page + 1));
                      }
                    }
                  }
                }}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ProductDetailScreen", {
                          item: item,
                          section: title,
                        });
                      }}
                    >
                      <View
                        style={{
                          height: Dimensions.get("window").height / 7,
                          ...CompStyles.defaultCard,
                          marginHorizontal: Sizes.fixPadding * 1,
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: Dimensions.get("window").width / 5,
                            height: Dimensions.get("window").height / 9,
                            borderRadius: Sizes.fixPadding,
                            marginRight: Sizes.fixPadding,
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <Image
                            source={{ uri: item.thumbnail }}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            resizeMode="cover"
                          />
                          {item.purchased && (
                            <View style={styles.purchasedCircle}>
                              <MaterialIcons
                                name="check"
                                size={12}
                                color="white"
                              />
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            flex: 1,
                            paddingVertical: Sizes.fixPadding / 2,
                          }}
                        >
                          <Text
                            style={{
                              ...Fonts.orangeColor14Bold,
                            }}
                          >
                            {title}
                          </Text>
                          <Text
                            style={{
                              ...Fonts.black17Regular,
                            }}
                          >
                            {item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <NumberFormat
                              value={
                                item.price_discount !== 0
                                  ? item.price_discount
                                  : item.price
                              }
                              displayType={"text"}
                              thousandSeparator="."
                              decimalSeparator=","
                              prefix={"IDR "}
                              renderText={(value, props) => (
                                <Text
                                  style={{
                                    ...Fonts.black17Bold,
                                    paddingVertical: Sizes.fixPadding / 2,
                                  }}
                                >
                                  {value}
                                </Text>
                              )}
                            />
                            {item.price_discount > 0 && (
                              <NumberFormat
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix={"IDR "}
                                renderText={(value, props) => (
                                  <Text
                                    style={{
                                      marginLeft: Sizes.fixPadding,
                                      color: "black",
                                      opacity: 0.8,
                                      textDecorationLine: "line-through",
                                    }}
                                  >
                                    {value}
                                  </Text>
                                )}
                              />
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                data={allProduk.data}
              />
            ) : (
              <EmptyIndicator />
            ))}
        </View>
      )}
      {loading && (
        <View
          style={{
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={Colors.orangeColor} size={30} />
        </View>
      )}
      <PurchasedProductBottom sectionId={section_id} />
    </SafeAreaView>
  );
};

export default ProductCategoryScreen;

const styles = StyleSheet.create({
  purchasedCircle: {
    position: "absolute",
    width: 15,
    height: 15,
    backgroundColor: "green",
    top: 5,
    right: 5,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});

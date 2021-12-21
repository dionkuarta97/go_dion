import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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
import { getPurchasedproduk } from "../../Redux/Produk/produkActions";
import CompStyles from "../../Theme/styles/globalStyles";
import NumberFormat from "react-number-format";

const ProductPurchasedScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const purchasedProduk = useSelector((state) => state.produkReducer.purchasedProduk);

  const section_id = props.route.params.id;

  useEffect(() => {
    dispatch(getPurchasedproduk(section_id));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title="Produk Terbeli"
        backEnabled={true}
        rightItem={
          <View style={{ flexDirection: "row" }}>
            <ActionButtonFilter />
            <View style={{ width: 15 }} />
            <ActionButtonCart />
          </View>
        }
      />
      <View style={{ flex: 1 }}>
        {purchasedProduk.loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          </View>
        )}
        {purchasedProduk.data !== null &&
          (purchasedProduk.data?.length !== 0 ? (
            <FlatList
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetailScreen", {
                      item: { ...item, purchased: true },
                      section: item.details.category,
                    });
                  }}
                >
                  <View
                    style={{
                      ...CompStyles.defaultCard,
                      marginHorizontal: Sizes.fixPadding * 1,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: 80,
                        height: 80,
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
                          <MaterialIcons name="check" size={12} color="white" />
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
                        {item.details.category}
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
                          value={item.price_discount !== 0 ? item.price_discount : item.price}
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

import React from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { getSliderImages } from "../../Redux/Home/homeActions";
import NumberFormat from "react-number-format";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

import { useNavigation } from "@react-navigation/core";
import ProductDetailContent from "./Component/ProductDetailContent";
import { addToCart } from "../../Redux/Cart/cartActions";

const { width } = Dimensions.get("screen");

const ProductDetailScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const item = props.route.params.item;
  const section = props.route.params.section;

  const cart = useSelector((state) => state.cartReducer.cart);

  console.log(item);

  const productInfo = () => {
    return (
      <View>
        <Text
          style={{
            ...Fonts.primaryColor16Regular,
            fontWeight: "bold",
          }}
        >
          {section}
        </Text>
        <Text
          style={{
            fontSize: 22,
            color: "white",
            fontWeight: "bold",
            marginVertical: Sizes.fixPadding,
          }}
        >
          {item.title}
        </Text>
        <NumberFormat
          value={item.price_discount > 0 ? item.price_discount : item.price}
          displayType={"text"}
          thousandSeparator="."
          decimalSeparator=","
          prefix={"IDR "}
          renderText={(value, props) => (
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
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
                  fontWeight: "bold",
                  color: "white",
                  opacity: 0.6,
                  fontSize: 14,
                  textDecorationLine: "line-through",
                }}
              >
                {value}
              </Text>
            )}
          />
        )}

        {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        dispatch(addToCart(item));
                        navigation.popToTop();
                        navigation.navigate("CartScreen");
                    }}
                    style={{
                        ...styles.button,
                        backgroundColor: Colors.primaryColor,
                    }}
                >
                    <Text style={{...Fonts.black17Bold}}>Beli Sekarang</Text>
                </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SliverAppBar
        leftItem={<MaterialIcons name="arrow-back-ios" size={24} color={Colors.primaryColor} onPress={() => navigation.goBack()} />}
        rightItem={
          !cart.some((val) => val._id === item._id) ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dispatch(addToCart(item))}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name={"add"} size={24} color={Colors.primaryColor} />
              <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginLeft: Sizes.fixPadding - 5.0,
                }}
              >
                Keranjang
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name={"done"} size={24} color={Colors.primaryColor} />
              <Text
                style={{
                  ...Fonts.primaryColor16Regular,
                  marginLeft: Sizes.fixPadding - 5.0,
                }}
              >
                Sudah ditambahkan
              </Text>
            </View>
          )
        }
        element={productInfo()}
        borderBottomRadius={20}
        toolbarColor={Colors.whiteColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={370}
        isImageBlur={true}
        src={{ uri: item.thumbnail }}
      >
        <ProductDetailContent item={item} onCart={cart.some((val) => val._id === item._id)} />
        <StatusBar backgroundColor={Colors.blackColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: Sizes.fixPadding + 2.0,
    alignItems: "center",
    justifyContent: "center",
    width: width - 40,
    borderRadius: Sizes.fixPadding - 5.0,
    marginTop: Sizes.fixPadding + 3.0,
  },
});

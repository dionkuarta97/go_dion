import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import NumberFormat from "react-number-format";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import ProductCardHorizontal from "../../../Components/Card/ProductCardHorizontal";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import { getPurchasedproduk } from "../../../Redux/Produk/produkActions";
import { getPaymentList } from "../../../Redux/Payment/paymentActions";

const CartContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const cart = useSelector((state) => state.cartReducer.cart);
  const [duplicate, setDuplicate] = useState([]);
  const purchasedProduk = useSelector(
    (state) => state.produkReducer.purchasedProduk
  );

  const checker = (id, arr) => {
    for (const key in arr) {
      if (arr[key]._id === id) {
        return true;
      }
    }
  };

  const checkAll = (arr1, arr2) => {
    for (const i in arr1) {
      for (const y in arr2) {
        if (arr1[i]._id === arr2[y]._id) {
          return true;
        }
      }
    }
  };

  useEffect(() => {
    dispatch(getPurchasedproduk("dasdsa"));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        {cart.map((val) => (
          <ProductCardHorizontal
            ganda={checker(val._id, purchasedProduk.data)}
            key={val._id}
            id={val._id}
            title={val.title}
            thumbnail={val.thumbnail}
            price={val.price_discount > 0 ? val.price_discount : val.price}
          />
        ))}

        <View style={{ height: 25 }} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 3,
            marginTop: 10,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.black17Regular }}>Jumlah Item</Text>
          <Text style={{ ...Fonts.black17Regular }}>{cart.length}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 3,
          }}
        >
          <Text style={{ flex: 1, ...Fonts.black19Bold }}>Total</Text>

          <NumberFormat
            value={cart.reduce(
              (total, x) =>
                total + (x.price_discount > 0 ? x.price_discount : x.price),
              0
            )}
            displayType={"text"}
            thousandSeparator="."
            decimalSeparator=","
            prefix={"IDR "}
            renderText={(value, props) => (
              <Text
                style={{
                  ...Fonts.primaryColor23Bold,
                  color: Colors.orangeColor,
                }}
              >
                {value}
              </Text>
            )}
          />
        </View>
        <DefaultPrimaryButton
          text="Checkout"
          onPress={() => {
            if (isLogin) {
              if (checkAll(cart, purchasedProduk?.data)) {
                Alert.alert("warning", "terdapat produk yang sudah anda beli");
              } else {
                navigation.navigate("CheckoutScreen");
              }
            } else {
              Alert.alert(
                "Informasi",
                "Anda perlu login untuk melanjutkan pembayaran",
                [
                  {
                    text: "Oke",
                    onPress: () => {
                      navigation.navigate("MainScreen");
                    },
                  },
                ]
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default CartContent;

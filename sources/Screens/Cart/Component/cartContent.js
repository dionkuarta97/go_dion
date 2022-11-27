import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import NumberFormat from "react-number-format";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import ProductCardHorizontal from "../../../Components/Card/ProductCardHorizontal";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import LoadingModal from "../../../Components/Modal/LoadingModal";

const CartContent = (props) => {
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const cart = useSelector((state) => state.cartReducer.cart);
  const carts = useSelector((state) => state.cartReducer.carts);
  const { loading, setLoading } = props;

  return (
    <View style={{ flex: 1 }}>
      {loading && <LoadingModal />}
      <ScrollView style={{ flex: 1, padding: Sizes.fixPadding * 2 }}>
        {carts.data.map((val) => (
          <ProductCardHorizontal
            key={val._id}
            id={val._id}
            title={val.title}
            thumbnail={val.thumbnail}
            setLoading={setLoading}
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
            value={carts.data.reduce(
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
              navigation.navigate("CheckoutScreen");
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

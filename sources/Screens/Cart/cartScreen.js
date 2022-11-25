import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import { useNavigation } from "@react-navigation/core";
import { clearCart, deleteAllCart } from "../../Redux/Cart/cartActions";
import CartContent from "./Component/cartContent";

const CartScreen = (props) => {
  const { route } = props;
  const { params } = route;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const carts = useSelector((state) => state.cartReducer.carts);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!carts.loading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [carts]);
  useEffect(() => {
    const backAction = () => {
      if (route.params?.from) {
        navigation.goBack();
      } else {
        navigation.navigate("ProductScreen");
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  console.log(JSON.stringify(carts, null, 2));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        backPressed={
          !route.params?.from
            ? () => {
                navigation.navigate("ProductScreen");
              }
            : null
        }
        title="Keranjang"
        backEnabled={true}
        rightItem={
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              dispatch(clearCart());
              dispatch(deleteAllCart());
            }}
          >
            <Text>Kosongkan</Text>
          </TouchableOpacity>
        }
      />
      {carts.data !== null ? (
        <>
          {carts.data.length > 0 ? (
            <CartContent setLoading={setLoading} loading={loading} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Image
                style={{
                  height: Dimensions.get("screen").width / 2,
                  width: Dimensions.get("screen").width / 2,
                  borderRadius: 50,
                }}
                source={require("../../../assets/Images/helper/empty.png")}
                resizeMode="contain"
              />
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            style={{
              height: Dimensions.get("screen").width / 2,
              width: Dimensions.get("screen").width / 2,
              borderRadius: 50,
            }}
            source={require("../../../assets/Images/helper/empty.png")}
            resizeMode="contain"
          />
        </View>
      )}
      <StatusBar backgroundColor={Colors.primaryColor} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

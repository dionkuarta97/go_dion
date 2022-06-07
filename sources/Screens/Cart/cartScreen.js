import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { getSliderImages } from "../../Redux/Home/homeActions";
import HomeContent from "../Home/Component/HomeContent";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ProductCardHorizontal from "../../Components/Card/ProductCardHorizontal";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import { useNavigation } from "@react-navigation/core";
import { clearCart } from "../../Redux/Cart/cartActions";
import CartContent from "./Component/cartContent";

const CartScreen = (props) => {
  const { route } = props;
  const { params } = route;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);

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

  console.log(JSON.stringify(route, null, 2));

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
          <TouchableOpacity onPress={() => dispatch(clearCart())}>
            <Text>Kosongkan</Text>
          </TouchableOpacity>
        }
      />
      {cart.length > 0 ? (
        <CartContent />
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

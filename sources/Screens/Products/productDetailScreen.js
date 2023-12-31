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
   Platform,
   Alert,
} from "react-native";
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
import { addCart, addToCart } from "../../Redux/Cart/cartActions";
import { Box, Button, Center, HStack } from "native-base";
import LoadingModal from "../../Components/Modal/LoadingModal";
import moment from "moment";
import DefaultModal from "../../Components/Modal/DefaultModal";
import CountDown from "react-native-countdown-component";
import Analytics from "../../Services/goAnalytics";
import { EventAnalytic } from "../../Utils/event_analytic";

const { width } = Dimensions.get("screen");

const ProductDetailScreen = (props) => {
   const navigation = useNavigation();
   const dispatch = useDispatch();

   const item = props.route.params.item;
   const section = props.route.params.section;

   const cart = useSelector((state) => state.cartReducer.cart);
   const [loading, setLoading] = useState(false);

   const carts = useSelector((state) => state.cartReducer.carts);
   const isLogin = useSelector((state) => state.authReducer.isLogin);
   const [givenAkhir, setGivenAkhir] = useState(null);
   const [current, setCurrent] = useState(null);
   const [infoWaktu, setInfoWaktu] = useState(false);
   useEffect(() => {
      setGivenAkhir(moment(item.details.tanggal_akhir));
      setCurrent(moment().utcOffset(7).startOf("second"));
      if (!carts.loading) {
         setLoading(false);
      } else {
         setLoading(true);
      }
   }, [carts]);

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
            {Platform.OS === "android" ? (
               <NumberFormat
                  value={
                     item.price_discount > 0 ? item.price_discount : item.price
                  }
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
            ) : (
               <NumberFormat
                  value={item.price_ios}
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
            )}
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
            leftItem={
               <Box
                  style={{
                     paddingLeft: 5,
                     paddingVertical: 3,
                     borderRadius: 10,
                     backgroundColor: "rgba(0,0,0, 0.3)",
                  }}
               >
                  <MaterialIcons
                     name="arrow-back-ios"
                     size={24}
                     color={Colors.whiteColor}
                     onPress={() => navigation.goBack()}
                  />
               </Box>
            }
            rightItem={
               Platform.OS === "android" && !item.purchased ? (
                  !carts.data?.some((val) => val._id === item._id) ? (
                     <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                           /** send analytic */
                           Analytics.logCustomEvent(EventAnalytic.GoBuyNow);
                           if (isLogin) {
                              if (item.expired) {
                                 Alert.alert(
                                    "Informasi",
                                    "Sayang sekali produk ini sudah berakhir"
                                 );
                              } else {
                                 if (
                                    moment
                                       .duration(givenAkhir.diff(current))
                                       .asDays() < 1
                                 ) {
                                    setInfoWaktu(true);
                                 } else {
                                    setLoading(true);
                                    dispatch(addToCart(item));
                                    dispatch(addCart(item._id));
                                 }
                              }
                           } else {
                              Alert.alert(
                                 "Informasi",
                                 "Anda perlu login untuk melanjutkan pembayaran",
                                 [
                                    {
                                       text: "Oke",
                                       onPress: () => {
                                          navigation.navigate("LoginScreen", {
                                             item: item,
                                             section: section,
                                          });
                                       },
                                    },
                                 ]
                              );
                           }
                        }}
                        style={{
                           flexDirection: "row",
                           alignItems: "center",
                           justifyContent: "center",
                           paddingHorizontal: 5,
                           paddingVertical: 3,
                           borderRadius: 10,
                           backgroundColor: "rgba(0,0,0, 0.3)",
                        }}
                     >
                        <MaterialIcons
                           name={"add"}
                           size={24}
                           color={Colors.whiteColor}
                        />
                        <Text
                           style={{
                              ...Fonts.white16Bold,
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
                           paddingHorizontal: 5,
                           paddingVertical: 3,
                           borderRadius: 10,
                           backgroundColor: "rgba(0,0,0, 0.3)",
                        }}
                     >
                        <MaterialIcons
                           name={"done"}
                           size={24}
                           color={Colors.whiteColor}
                        />
                        <Text
                           style={{
                              ...Fonts.white16Bold,
                              marginLeft: Sizes.fixPadding - 5.0,
                           }}
                        >
                           Sudah Ditambahkan
                        </Text>
                     </View>
                  )
               ) : null
            }
            element={productInfo()}
            borderBottomRadius={20}
            toolbarColor={Colors.whiteColor}
            toolBarMinHeight={40}
            toolbarMaxHeight={370}
            isImageBlur={true}
            src={{ uri: item.thumbnail }}
         >
            {Platform.OS === "android" && loading && <LoadingModal />}
            <ProductDetailContent
               item={item}
               section={section}
               onCart={carts.data?.some((val) => val._id === item._id)}
            />
            <StatusBar backgroundColor={Colors.blackColor} />
            {infoWaktu && (
               <DefaultModal>
                  <Center>
                     <Text style={{ textAlign: "center" }}>
                        Produk ini akan berakhir dalam
                     </Text>
                     <CountDown
                        key={"Count 1"}
                        until={moment
                           .duration(givenAkhir?.diff(current))
                           .asSeconds()}
                        digitStyle={{
                           backgroundColor: "transparent",
                        }}
                        separatorStyle={{
                           color: "black",
                        }}
                        showSeparator={true}
                        digitTxtStyle={{
                           color: "black",
                        }}
                        size={13}
                        timeToShow={["H", "M", "S"]}
                        timeLabels={{ h: null, m: null, s: null }}
                     />
                     <Text style={{ textAlign: "center" }}>
                        Setelah melewati waktu tersebut, produk ini akan
                        dianggap hangus. Yakin mau beli ?
                     </Text>
                     <HStack
                        space={4}
                        marginTop={5}
                     >
                        <Button
                           onPress={() => {
                              setInfoWaktu(false);
                              setLoading(true);
                              dispatch(addToCart(item));
                              dispatch(addCart(item._id));
                           }}
                           width={100}
                           colorScheme="amber"
                        >
                           Yakin
                        </Button>
                        <Button
                           onPress={() => setInfoWaktu(false)}
                           width={100}
                           variant="outline"
                           colorScheme="dark"
                        >
                           Batal
                        </Button>
                     </HStack>
                  </Center>
               </DefaultModal>
            )}
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

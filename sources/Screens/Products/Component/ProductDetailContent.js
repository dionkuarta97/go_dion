import React, { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Platform,
   Alert,
} from "react-native";

let ExpoIap;

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { addCart, addToCart } from "../../../Redux/Cart/cartActions";

import { getPaymentApple } from "../../../Redux/Payment/paymentActions";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import { capitalizeFirstLetter } from "../../../Services/helper";
import { setTransIos } from "../../../Redux/Init/initActions";
import { Box, Button, Center, HStack, useToast } from "native-base";
import moment from "moment";
import "moment/min/locales";
import CountDown from "react-native-countdown-component";
import { EventAnalytic } from "../../../Utils/event_analytic";
import Analytics from "../../../Services/goAnalytics";

/** di gunakan untuk ios */

// if (Platform.OS === "ios") {
//    ExpoIap = require("expo-in-app-purchases");
// }

/** sampai sini */

const { width } = Dimensions.get("screen");

const ProductDetailContent = (props) => {
   const toast = useToast();
   const isLogin = useSelector((state) => state.authReducer.isLogin);
   const { newTransIos } = useSelector((state) => state.initReducer);
   const [sukses, setSukses] = useState(false);
   const dispatch = useDispatch();
   const navigation = useNavigation();
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [tanggal_awal, setTanggal_awal] = useState(null);
   const [tanggal_akhir, setTanggal_akhir] = useState(null);
   const [givenAwal, setGivenAwal] = useState(null);
   const [givenAkhir, setGivenAkhir] = useState(null);
   const [current, setCurrent] = useState(null);

   const profile = useSelector((state) => state.profileReducer.profile);

   const item = props.item;
   const section = props.section;
   const onCart = props.onCart;
   const itemSkus = Platform.select({
      ios: ["com.goonline.app." + item.details.apple_id],
      android: ["com.example.coins100"],
   });
   const [kadaluwarsa, setKadaluwarsa] = useState(item.expired);

   const firstProces = async () => {
      if (Platform.OS === "ios") {
         await ExpoIap.connectAsync();
         if (!item.purchased) {
            setLoading(true);

            const { responseCode, results } = await ExpoIap.getProductsAsync(
               itemSkus
            );
            if (responseCode === ExpoIap.IAPResponseCode.OK) {
               if (results.length > 0) {
                  if (isLogin) {
                     let trans = newTransIos.filter((value) =>
                        value.user_id.includes(profile._id)
                     );

                     if (trans.length > 0) {
                        dispatch(getPaymentApple(item))
                           .then(async (json) => {
                              if (json.status) {
                                 let newTrans = newTransIos.filter(
                                    (value) => value.user_id !== profile._id
                                 );
                                 dispatch(setTransIos(newTrans));
                                 toast.show({
                                    title: "Berhasil",
                                    status: "success",
                                    description: "Berhasil melakukan pembelian",
                                    placement: "top",
                                    width: Dimensions.get("screen").width / 1.3,
                                 });
                                 navigation.navigate("MainScreen");
                              } else {
                                 toast.show({
                                    title: "Kesalahan",
                                    status: "error",
                                    description:
                                       "Pesanan anda sedang dalam antrian, coba beberapa saat lagi",
                                    placement: "top",
                                    width: Dimensions.get("screen").width / 1.3,
                                 });
                                 navigation.navigate("MainScreen");
                                 setError(
                                    "Pesanan anda sedang dalam antrian, coba beberapa saat lagi"
                                 );
                              }
                           })
                           .catch(async (err) => {
                              setError(
                                 "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi"
                              );
                           })
                           .finally(async () => {
                              setLoading(false);
                              await ExpoIap.disconnectAsync();
                           });
                     } else {
                        setLoading(false);
                        await ExpoIap.disconnectAsync();
                     }
                  } else {
                     setLoading(false);
                     await ExpoIap.disconnectAsync();
                  }
               } else {
                  toast.show({
                     title: "Kesalahan",
                     status: "error",
                     description:
                        "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi",
                     placement: "top",
                     width: Dimensions.get("screen").width / 1.3,
                  });
                  navigation.navigate("MainScreen");
                  setError(
                     "Mohon maaf, produk ini belum terdaftar untuk platfrom IOS"
                  );
                  toast.show({
                     title: "Informasi",
                     status: "warning",
                     description:
                        "Mohon maaf, produk ini belum terdaftar untuk platfrom IOS",
                     placement: "top",
                     width: Dimensions.get("screen").width / 1.3,
                  });
                  navigation.navigate("MainScreen");
                  setLoading(false);
                  await ExpoIap.disconnectAsync();
               }
            }
         } else {
            await ExpoIap.disconnectAsync();
         }
      }
   };

   const initIAPandEventListeners = async () => {
      // connect to store if not done so already
      // purchase listener. Most of this is boilerplate from the official docs, with a
      // couple of additions to process a purchase and stop processing.
      ExpoIap.setPurchaseListener(
         async ({ responseCode, results, errorCode }) => {
            // Purchase was successful
            if (responseCode === ExpoIap.IAPResponseCode.OK) {
               results.forEach(async (purchase) => {
                  if (!purchase.acknowledged) {
                     // process transaction here and unlock content
                     // !! This is your own logic that is not a part of expo-in-app-purchases.
                     // any processing that needs to be done within your app or on your server
                     // can be executed here, just before finishTransactionAsync

                     // finish the transaction on platform's end
                     if (isLogin) {
                        dispatch(getPaymentApple(item))
                           .then(async (json) => {
                              if (json.status) {
                                 let newTrans = newTransIos.filter(
                                    (value) => value.user_id !== profile._id
                                 );
                                 dispatch(setTransIos(newTrans));
                                 toast.show({
                                    title: "Berhasil",
                                    status: "success",
                                    description: "Berhasil melakukan pembelian",
                                    placement: "top",
                                    width: Dimensions.get("screen").width / 1.3,
                                 });
                                 navigation.navigate("MainScreen");
                              } else {
                                 dispatch(
                                    setTransIos([
                                       ...newTransIos,
                                       {
                                          item: item,
                                          user_id: profile._id,
                                       },
                                    ])
                                 );
                                 toast.show({
                                    title: "Kesalahan",
                                    status: "error",
                                    description:
                                       "Pesanan anda sedang dalam antrian, coba beberapa saat lagi",
                                    placement: "top",
                                    width: Dimensions.get("screen").width / 1.3,
                                 });
                                 navigation.navigate("MainScreen");
                                 setError(
                                    "Pesanan anda sedang dalam antrian, coba beberapa saat lagi"
                                 );
                              }
                           })
                           .catch(async (err) => {
                              dispatch(
                                 setTransIos([
                                    ...newTransIos,
                                    {
                                       item: item,
                                       user_id: profile._id,
                                    },
                                 ])
                              );
                              toast.show({
                                 title: "Kesalahan",
                                 status: "error",
                                 description:
                                    "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi",
                                 placement: "top",
                                 width: Dimensions.get("screen").width / 1.3,
                              });
                              navigation.navigate("MainScreen");
                              setError(
                                 "Mohon maaf telah terjadi kesalahan pada server, coba beberapa saat lagi"
                              );
                           })
                           .finally(async () => {
                              ExpoIap.finishTransactionAsync(purchase, true);
                              await ExpoIap.disconnectAsync();
                              navigation.navigate("MainScreen");
                              setLoading(false);
                           });
                     }
                  }
               });

               // handle particular error codes
            } else if (responseCode === ExpoIap.IAPResponseCode.USER_CANCELED) {
               toast.show({
                  title: "Informasi",
                  status: "warning",
                  description: "Kamu Membatalkan transaksi",
                  placement: "top",
                  width: Dimensions.get("screen").width / 1.3,
               });
               await ExpoIap.disconnectAsync();
               navigation.navigate("MainScreen");
               setLoading(false);
            } else if (responseCode === ExpoIap.IAPResponseCode.DEFERRED) {
            } else {
               toast.show({
                  title: "Kesalahan",
                  status: "error",
                  description: "Telah terjadi kesalahan pada server",
                  placement: "top",
                  width: Dimensions.get("screen").width / 1.3,
               });

               await ExpoIap.disconnectAsync();
               navigation.navigate("MainScreen");
               setLoading(false);
            }

            // stop processing. This state update should be reflected
            // in your components. E.g. make IAPs accessible again.
         }
      );
   };

   const [infoWaktu, setInfoWaktu] = useState(false);

   useEffect(async () => {
      if (Platform.OS === "ios") {
         firstProces();
         initIAPandEventListeners();
      }
      setTanggal_awal(moment(item.details.tanggal_awal).locale("id"));
      setTanggal_akhir(moment(item.details.tanggal_akhir).locale("id"));
      setGivenAwal(moment(item.details.tanggal_awal));
      setGivenAkhir(moment(item.details.tanggal_akhir));
      setCurrent(moment().utcOffset(7).startOf("second"));

      /** send analytic */

      Analytics.logCustomEvent(EventAnalytic.GoProductDetail);
   }, []);

   const requestPurchase = async () => {
      setLoading(true);
      await ExpoIap.connectAsync();
      const { responseCode, results } = await ExpoIap.getProductsAsync(
         itemSkus
      );
      if (responseCode === ExpoIap.IAPResponseCode.OK) {
         if (results.length > 0) {
            ExpoIap.purchaseItemAsync(
               "com.goonline.app." + item.details.apple_id
            );
         }
      }
   };

   const titleText = (title) => {
      return (
         <Text style={{ ...Fonts.black17Bold, marginBottom: Sizes.fixPadding }}>
            {title}
         </Text>
      );
   };

   const infoTile = (title, text) => {
      return (
         <View
            style={{
               borderBottomWidth: 1,
               borderBottomColor: "lightgrey",
               paddingVertical: Sizes.fixPadding,
            }}
         >
            <Text style={{ flex: 1, color: "grey", marginBottom: 0.5 }}>
               {title}
            </Text>
            <Text style={{ flex: 3 }}>{text}</Text>
         </View>
      );
   };
   return (
      <View
         style={{
            flex: 1,
            paddingHorizontal: Sizes.fixPadding * 2,
            paddingVertical: Sizes.fixPadding * 3,
            backgroundColor: "white",
         }}
      >
         {!loading && error && (
            <DefaultModal>
               <Text>{error}</Text>
               <DefaultPrimaryButton
                  text="Kembali ke Home"
                  onPress={() => {
                     setError(null);
                     setLoading(false);
                     navigation.popToTop();
                     navigation.navigate("MainScreen");
                  }}
               />
            </DefaultModal>
         )}
         {!loading && sukses && (
            <DefaultModal>
               <Text>Berhasil melakukan pembelian</Text>
               <DefaultPrimaryButton
                  text="Kembali ke Home"
                  onPress={() => {
                     setSukses(false);
                     setLoading(false);
                     navigation.popToTop();
                     navigation.navigate("MainScreen");
                  }}
               />
            </DefaultModal>
         )}
         {Platform.OS === "ios" && loading ? (
            <LoadingModal />
         ) : (
            <ScrollView
               nestedScrollEnabled={true}
               showsVerticalScrollIndicator={false}
            >
               {givenAkhir !== null && (
                  <>
                     {moment.duration(givenAkhir.diff(current)).asDays() >
                        0 && (
                        <>
                           {moment.duration(givenAwal.diff(current)).asDays() >
                           0 ? (
                              <>
                                 <HStack
                                    mb={5}
                                    style={{ alignItems: "center" }}
                                    space={3}
                                 >
                                    <Text
                                       style={{
                                          ...Fonts.black15Bold,
                                       }}
                                    >
                                       Dimulai dalam
                                    </Text>
                                    <Box
                                       bg={"green.500"}
                                       paddingX={2}
                                       paddingY={1}
                                       borderRadius={10}
                                    >
                                       {moment
                                          .duration(givenAwal.diff(current))
                                          .asDays() >= 1 ? (
                                          <Text
                                             style={{
                                                ...Fonts.black15Regular,
                                                color: "white",
                                             }}
                                          >
                                             {Math.floor(
                                                moment
                                                   .duration(
                                                      givenAwal.diff(current)
                                                   )
                                                   .asDays()
                                             ) + " hari lagi"}
                                          </Text>
                                       ) : (
                                          <CountDown
                                             key={"Count 1"}
                                             until={moment
                                                .duration(
                                                   givenAwal?.diff(current)
                                                )
                                                .asSeconds()}
                                             digitStyle={{
                                                backgroundColor: "transparent",
                                             }}
                                             separatorStyle={{
                                                color: "white",
                                             }}
                                             showSeparator={true}
                                             digitTxtStyle={{
                                                color: "white",
                                             }}
                                             onFinish={() => {
                                                Alert.alert(
                                                   "Informasi",
                                                   "Tryout sudah dimulai"
                                                );
                                             }}
                                             size={13}
                                             timeToShow={["H", "M", "S"]}
                                             timeLabels={{
                                                h: null,
                                                m: null,
                                                s: null,
                                             }}
                                          />
                                       )}
                                    </Box>
                                 </HStack>
                              </>
                           ) : (
                              <>
                                 <HStack
                                    mb={5}
                                    space={3}
                                    style={{ alignItems: "center" }}
                                 >
                                    <Text
                                       style={{
                                          ...Fonts.black15Bold,
                                       }}
                                    >
                                       Berakhir dalam
                                    </Text>
                                    <Box
                                       bg={"red.500"}
                                       paddingX={2}
                                       paddingY={1}
                                       borderRadius={10}
                                    >
                                       {moment
                                          .duration(givenAkhir.diff(current))
                                          .asDays() >= 1 ? (
                                          <Text
                                             style={{
                                                color: "white",
                                             }}
                                          >
                                             {Math.floor(
                                                moment
                                                   .duration(
                                                      givenAkhir.diff(current)
                                                   )
                                                   .asDays()
                                             ) + " hari lagi"}
                                          </Text>
                                       ) : (
                                          <CountDown
                                             key={"Count 1"}
                                             until={moment
                                                .duration(
                                                   givenAkhir?.diff(current)
                                                )
                                                .asSeconds()}
                                             digitStyle={{
                                                backgroundColor: "transparent",
                                             }}
                                             separatorStyle={{
                                                color: "white",
                                             }}
                                             showSeparator={true}
                                             digitTxtStyle={{
                                                color: "white",
                                             }}
                                             onFinish={() => {
                                                setKadaluwarsa(true);
                                                Alert.alert(
                                                   "Informasi",
                                                   "Tryout sudah berakhir"
                                                );
                                             }}
                                             size={13}
                                             timeToShow={["H", "M", "S"]}
                                             timeLabels={{
                                                h: null,
                                                m: null,
                                                s: null,
                                             }}
                                          />
                                       )}
                                    </Box>
                                 </HStack>
                              </>
                           )}
                        </>
                     )}
                  </>
               )}

               {kadaluwarsa && (
                  <Box
                     padding={1}
                     width={Dimensions.get("screen").width / 2.4}
                     bg={"red.600"}
                     borderRadius={10}
                     mb={3}
                  >
                     <Center>
                        <Text style={{ color: "white" }}>
                           Produk telah berakhir
                        </Text>
                     </Center>
                  </Box>
               )}

               {titleText("Detail Produk")}
               <View style={styles.content}>
                  {infoTile("Informasi", item.desc)}
                  {infoTile(
                     "Kategori",
                     capitalizeFirstLetter(item.details.category)
                  )}
                  {infoTile("Level", item.details.level)}
                  {infoTile("Wilayah", item.details.wilayah)}

                  {tanggal_awal &&
                     tanggal_akhir !== null &&
                     infoTile(
                        "Periode Aktif",
                        `${tanggal_awal.format(
                           "Do MMM YYYY HH:mm:ss"
                        )} WIB - ${tanggal_akhir.format(
                           "Do MMM YYYY H:mm:ss"
                        )} WIB`
                     )}

                  {item.purchased && (
                     <DefaultPrimaryButton
                        text={
                           item.category === "tryout"
                              ? "Lihat Tryout mu"
                              : item.category === "busak"
                              ? "Lihat Buku Sakti"
                              : "Lanjutkan Belajar mu"
                        }
                        onPress={() => {
                           if (item.category === "tryout") {
                              navigation.navigate("GoTryoutScreen");
                           } else if (item.category === "busak") {
                              navigation.navigate("BukuSaktiScreen");
                           } else {
                              navigation.navigate("ProductIncludeScreen", {
                                 produkId: item._id,
                              });
                           }
                        }}
                     />
                  )}
                  {Platform.OS === "ios" ? (
                     <>
                        {isLogin ? (
                           <>
                              {newTransIos.filter((value) =>
                                 value.user_id.includes(profile._id)
                              ).length === 0 && (
                                 <>
                                    {!item.purchased && !onCart && (
                                       <DefaultPrimaryButton
                                          text="Beli Sekarang"
                                          onPress={() => {
                                             if (kadaluwarsa) {
                                                Alert.alert(
                                                   "Informasi",
                                                   "Sayang sekali produk telah berakhir"
                                                );
                                             } else {
                                                if (
                                                   moment
                                                      .duration(
                                                         givenAkhir.diff(
                                                            current
                                                         )
                                                      )
                                                      .asDays() < 1
                                                ) {
                                                   setInfoWaktu(true);
                                                } else {
                                                   /** send analytic */
                                                   Analytics.logCustomEvent(
                                                      EventAnalytic.GoBuyNow
                                                   );

                                                   requestPurchase();
                                                }
                                             }
                                          }}
                                       />
                                    )}
                                 </>
                              )}
                           </>
                        ) : (
                           <>
                              <DefaultPrimaryButton
                                 text="Beli Sekarang"
                                 onPress={() => {
                                    Alert.alert(
                                       "Informasi",
                                       "Anda perlu login untuk melanjutkan pembayaran",
                                       [
                                          {
                                             text: "Oke",
                                             onPress: () => {
                                                navigation.navigate(
                                                   "MainScreen"
                                                );
                                             },
                                          },
                                       ]
                                    );
                                 }}
                              />
                           </>
                        )}
                     </>
                  ) : (
                     <>
                        {isLogin ? (
                           <>
                              {!item.purchased && !onCart && (
                                 <DefaultPrimaryButton
                                    text="Beli Sekarang"
                                    onPress={() => {
                                       if (kadaluwarsa) {
                                          Alert.alert(
                                             "Informasi",
                                             "Sayang sekali produk telah berakhir"
                                          );
                                       } else {
                                          /** send analytic */
                                          Analytics.logCustomEvent(
                                             EventAnalytic.GoBuyNow
                                          );

                                          if (
                                             moment
                                                .duration(
                                                   givenAkhir.diff(current)
                                                )
                                                .asDays() < 1
                                          ) {
                                             setInfoWaktu(true);
                                          } else {
                                             dispatch(addToCart(item));
                                             dispatch(addCart(item._id));

                                             navigation.navigate("CartScreen");
                                          }
                                       }
                                    }}
                                 />
                              )}
                           </>
                        ) : (
                           <>
                              <DefaultPrimaryButton
                                 text="Beli Sekarang"
                                 onPress={() => {
                                    /** send analytic */
                                    Analytics.logCustomEvent(
                                       EventAnalytic.GoBuyNow
                                    );

                                    Alert.alert(
                                       "Informasi",
                                       "Anda perlu login untuk melanjutkan pembayaran",
                                       [
                                          {
                                             text: "Oke",
                                             onPress: () => {
                                                navigation.navigate(
                                                   "LoginScreen",
                                                   {
                                                      item: item,
                                                      section: section,
                                                   }
                                                );
                                             },
                                          },
                                       ]
                                    );
                                 }}
                              />
                           </>
                        )}
                     </>
                  )}

                  {Platform.OS === "android" && (
                     <>
                        {!item.purchased && onCart && (
                           <DefaultPrimaryButton
                              text="Sudah Ada di Keranjang"
                              onPress={() => {
                                 navigation.navigate("CartScreen");
                              }}
                           />
                        )}
                     </>
                  )}
               </View>
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
                                 if (Platform.OS === "android") {
                                    dispatch(addToCart(item));
                                    dispatch(addCart(item._id)).finally(() =>
                                       navigation.navigate("CartScreen")
                                    );
                                 } else {
                                    /** send analytic */
                                    Analytics.logCustomEvent(
                                       EventAnalytic.GoBuyNow
                                    );

                                    requestPurchase();
                                 }
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
            </ScrollView>
         )}
      </View>
   );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
   content: {},
   button: {
      paddingVertical: Sizes.fixPadding + 2.0,
      alignItems: "center",
      justifyContent: "center",
      width: width - 40,
      borderRadius: Sizes.fixPadding - 5.0,
      marginTop: Sizes.fixPadding + 3.0,
   },
});

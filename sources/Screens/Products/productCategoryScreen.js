import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
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
import { Box, HStack, useToast } from "native-base";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { singkatNama } from "../../Services/helper";
import moment from "moment";

const products = [
  { id: 1, title: "a" },
  { id: 2, title: "a" },
  { id: 3, title: "a" },
  { id: 4, title: "a" },
  { id: 5, title: "a" },
  { id: 6, title: "a" },
];

const ProductCategoryScreen = (props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(null);
  const navigation = useNavigation();
  const { allProduk, loading, loadingDua, totalData } = useSelector(
    (state) => state.produkReducer
  );

  const { newTransIos } = useSelector((state) => state.initReducer);
  const profile = useSelector((state) => state.profileReducer.profile);
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const section_id = props.route.params.id;
  const title = props.route.params.title;

  useEffect(() => {
    setCurrent(moment().utcOffset(7).startOf("second"));
    checkInternet().then((connection) => {
      if (connection) {
        dispatch(getAllProduk(section_id, page));
      } else {
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
          render: ({ id }) => {
            return (
              <ToastErrorContent
                content="Kamu tidak terhubung ke internet"
                onPress={() => {
                  toast.close(id);
                  navigation.goBack();
                }}
              />
            );
          },
        });
      }
    });
  }, []);

  const awal = (tgl) => {
    return moment.duration(moment(tgl).diff(current)).asDays();
  };
  const akhir = (tgl) => {
    return moment.duration(moment(tgl).diff(current)).asDays();
  };
  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) {
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
            {Platform.OS === "android" && <ActionButtonCart />}
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
                        if (isLogin) {
                          if (
                            newTransIos.filter((value) =>
                              value.user_id.includes(profile._id)
                            ).length > 0
                          ) {
                            if (Platform.OS === "ios") {
                              Alert.alert(
                                "Informasi",
                                "Maaf masih ada transaksi yang tertunda"
                              );
                            } else {
                              navigation.navigate("ProductDetailScreen", {
                                item: item,
                                section: props.section,
                              });
                            }
                          } else {
                            navigation.navigate("ProductDetailScreen", {
                              item: item,
                              section: props.section,
                            });
                          }
                        } else {
                          navigation.navigate("ProductDetailScreen", {
                            item: item,
                            section: props.section,
                          });
                        }
                      }}
                    >
                      <View
                        style={{
                          height: Dimensions.get("window").height / 6,
                          ...CompStyles.defaultCard,
                          marginHorizontal: Sizes.fixPadding * 1,
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            width: Dimensions.get("window").width / 3.5,
                            height: Dimensions.get("window").height / 7,
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
                          <View
                            style={{
                              height: Dimensions.get("screen").height / 20,
                            }}
                          >
                            <Text
                              style={{
                                ...Fonts.black17Regular,
                              }}
                            >
                              {singkatNama(item.title, 20)}
                            </Text>
                          </View>
                          {akhir(item.details.tanggal_akhir) > 0 ? (
                            <>
                              {awal(item.details.tanggal_awal) > 0 ? (
                                <>
                                  {awal(item.details.tanggal_awal) > 7 ? (
                                    <Text style={{ fontWeight: "bold" }}>
                                      {moment(item.details.tanggal_awal)
                                        .locale("id")
                                        .format("Do MMM YYYY")}{" "}
                                      -{" "}
                                      {moment(item.details.tanggal_akhir)
                                        .locale("id")
                                        .format("Do MMM YYYY")}
                                    </Text>
                                  ) : awal(item.details.tanggal_awal) >= 1 &&
                                    awal(item.details.tanggal_awal) <= 7 ? (
                                    <>
                                      <HStack alignItems={"center"}>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginEnd: "auto",
                                          }}
                                        >
                                          Dimulai dalam
                                        </Text>
                                        <Box
                                          bg={"green.600"}
                                          borderRadius={10}
                                          paddingY={0.5}
                                          paddingX={1.5}
                                        >
                                          <Text style={{ color: "white" }}>
                                            {Math.floor(
                                              awal(item.details.tanggal_awal)
                                            )}{" "}
                                            hari lagi
                                          </Text>
                                        </Box>
                                      </HStack>
                                    </>
                                  ) : (
                                    <>
                                      <HStack alignItems={"center"}>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginEnd: "auto",
                                          }}
                                        >
                                          Dimulai
                                        </Text>
                                        <Box
                                          bg={"green.600"}
                                          borderRadius={10}
                                          paddingY={0.5}
                                          paddingX={1.5}
                                        >
                                          <Text style={{ color: "white" }}>
                                            Hari ini
                                          </Text>
                                        </Box>
                                      </HStack>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {akhir(item.details.tanggal_akhir) > 7 ? (
                                    <Text style={{ fontWeight: "bold" }}>
                                      {moment(item.details.tanggal_awal)
                                        .locale("id")
                                        .format("Do MMM YYYY")}{" "}
                                      -{" "}
                                      {moment(item.details.tanggal_akhir)
                                        .locale("id")
                                        .format("Do MMM YYYY")}
                                    </Text>
                                  ) : akhir(item.details.tanggal_akhir) >= 1 &&
                                    akhir(item.details.tanggal_akhir) <= 7 ? (
                                    <>
                                      <HStack alignItems={"center"}>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginEnd: "auto",
                                          }}
                                        >
                                          Berakhir dalam
                                        </Text>
                                        <Box
                                          bg={"red.600"}
                                          borderRadius={10}
                                          paddingY={0.5}
                                          paddingX={1.5}
                                        >
                                          <Text style={{ color: "white" }}>
                                            {Math.floor(
                                              akhir(item.details.tanggal_akhir)
                                            )}{" "}
                                            hari lagi
                                          </Text>
                                        </Box>
                                      </HStack>
                                    </>
                                  ) : (
                                    <>
                                      <HStack alignItems={"center"}>
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            marginEnd: "auto",
                                          }}
                                        >
                                          Berakhir
                                        </Text>
                                        <Box
                                          bg={"red.600"}
                                          borderRadius={10}
                                          paddingY={0.5}
                                          paddingX={1.5}
                                        >
                                          <Text style={{ color: "white" }}>
                                            Hari ini
                                          </Text>
                                        </Box>
                                      </HStack>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <Text style={{ color: Colors.neutralRedColor }}>
                                Periode Tryout Berakhir
                              </Text>
                            </>
                          )}

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <NumberFormat
                              value={
                                Platform.OS === "android"
                                  ? item.price_discount !== 0
                                    ? item.price_discount
                                    : item.price
                                  : item.price_ios
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

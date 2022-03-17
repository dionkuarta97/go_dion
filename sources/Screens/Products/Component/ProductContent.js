import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../../../Components/ProductCard";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getGroupedProduk } from "../../../Redux/Produk/produkActions";
import NoData from "../../../Components/NoData";
import checkInternet from "../../../Services/CheckInternet";
import { Center, useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const products = [
  { id: 1, title: "a" },
  { id: 2, title: "a" },
  { id: 3, title: "a" },
  { id: 4, title: "a" },
];

const ProductContent = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const groupedProduk = useSelector(
    (state) => state.produkReducer.groupedProduk
  );

  useLayoutEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getGroupedProduk());
      } else {
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
          render: ({ id }) => {
            return (
              <>
                <ToastErrorContent
                  content="Kamu tidak terhubung ke internet"
                  onPress={() => {
                    toast.closeAll();
                    navigation.goBack();
                  }}
                />
              </>
            );
          },
        });
      }
    });
  }, []);

  const sectionHeader = (id, title) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={{ ...Fonts.black20Bold, flex: 1 }}>{title}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("ProductCategoryScreen", {
              id: id,
              title: title,
            })
          }
        >
          {title !== "Buku Sakti" && title !== "Paket Belajar" && (
            <Text style={{ ...Fonts.orangeColor14Bold }}>Lihat Semua</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ paddingVertical: Sizes.fixPadding }}>
      {groupedProduk.loading && (
        <View
          style={{
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <ActivityIndicator color={Colors.orangeColor} size={50} />
        </View>
      )}
      {groupedProduk.error !== null && (
        <Center>
          <Text style={{ color: "red" }}>{groupedProduk.error}</Text>
        </Center>
      )}
      {groupedProduk.data !== null &&
        groupedProduk.data.map((val, index) => {
          return (
            <View key={`groupedproduk-${val._id}`}>
              {sectionHeader(
                val._id,
                index === 0
                  ? "Paket Belajar"
                  : index === 1
                  ? "Paket Tryout"
                  : "Buku Sakti"
              )}
              {val.data[0]?.category !== "busak" && val.data.length !== 0 ? (
                <>
                  {val.data.length !== 0 ? (
                    <FlatList
                      keyExtractor={(item, index) => `${item._id}`}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <ProductCard data={item} section={val.section} />
                      )}
                      data={val.data}
                      contentContainerStyle={styles.contentContainer}
                    />
                  ) : (
                    <View
                      style={{
                        padding: Sizes.fixPadding,
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>Produk Kosong</Text>
                    </View>
                  )}
                </>
              ) : (
                <NoData img="noimage" msg="Coming Soon" />
              )}
            </View>
          );
        })}
    </View>
  );
};

export default ProductContent;

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding * 4.0,
  },
});

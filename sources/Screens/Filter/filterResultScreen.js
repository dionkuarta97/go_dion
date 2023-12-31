import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  Platform,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import ProductCard from "../../Components/ProductCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import { useSelector } from "react-redux";
import NoData from "../../Components/NoData";

const products = [
  { id: 1, title: "a" },
  { id: 2, title: "a" },
  { id: 3, title: "a" },
  { id: 4, title: "a" },
  { id: 5, title: "a" },
  { id: 6, title: "a" },
  { id: 7, title: "a" },
  { id: 8, title: "a" },
];

const FirstRoute = () => {
  const [slice, setSlice] = useState(6);
  const { resultSearchProduct } = useSelector((state) => state.produkReducer);
  const [products, setProducts] = useState(resultSearchProduct.data[0].items);

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      {products.length === 0 ? (
        <NoData msg="Produk tidak ditemukan" />
      ) : (
        <FlatGrid
          onScroll={(e) => {
            if (handleInfinityScroll(e)) {
              if (slice < products?.length) {
                setSlice(slice + 6);
              }
            }
          }}
          listKey="productlist"
          itemDimension={Dimensions.get("window").width / 2.4}
          renderItem={(item) => (
            <ProductCard
              data={item.item}
              newStyle={{
                card: {
                  elevation: 1.0,
                  width: "100%",
                  height: Dimensions.get("window").height / 2.6,
                  backgroundColor: Colors.whiteColor,
                  overflow: "hidden",
                  marginRight: Sizes.fixPadding * 2.0,
                  borderRadius: 10,
                  marginBottom: 10,
                },
                image: {
                  width: "100%",
                  height: Dimensions.get("window").height / 6.6,
                },
                purchasedCircle: {
                  position: "absolute",
                  width: 25,
                  height: 25,
                  backgroundColor: "green",
                  top: 10,
                  right: 10,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                },
                infoContainer: {
                  paddingHorizontal: Sizes.fixPadding,
                  paddingTop: Sizes.fixPadding,
                  paddingBottom: Sizes.fixPadding * 2.0,
                },
              }}
            />
          )}
          data={products.slice(0, slice)}
        />
      )}
    </View>
  );
};

const SecondRoute = () => {
  const [slice, setSlice] = useState(6);
  const { resultSearchProduct } = useSelector((state) => state.produkReducer);
  const [products, setProducts] = useState(resultSearchProduct.data[1].items);

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      {products.length === 0 ? (
        <NoData msg="Produk Tidak Di Temukan" />
      ) : (
        <FlatGrid
          onScroll={(e) => {
            if (handleInfinityScroll(e)) {
              if (slice < products?.length) {
                setSlice(slice + 6);
              }
            }
          }}
          listKey="productlist"
          itemDimension={Dimensions.get("window").width / 2.4}
          renderItem={(item) => (
            <ProductCard
              data={item.item}
              newStyle={{
                card: {
                  elevation: 1.0,
                  width: "100%",
                  height: Dimensions.get("window").height / 2.6,
                  backgroundColor: Colors.whiteColor,
                  overflow: "hidden",
                  marginRight: Sizes.fixPadding * 2.0,
                  borderRadius: 10,
                  marginBottom: 10,
                },
                image: {
                  width: "100%",
                  height: Dimensions.get("window").height / 6.6,
                },
                purchasedCircle: {
                  position: "absolute",
                  width: 25,
                  height: 25,
                  backgroundColor: "green",
                  top: 10,
                  right: 10,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                },
                infoContainer: {
                  paddingHorizontal: Sizes.fixPadding,
                  paddingTop: Sizes.fixPadding,
                  paddingBottom: Sizes.fixPadding * 2.0,
                },
              }}
            />
          )}
          data={products.slice(0, slice)}
        />
      )}
    </View>
  );
};
const ThirdRoute = () => {
  const [slice, setSlice] = useState(6);
  const { resultSearchProduct } = useSelector((state) => state.produkReducer);
  const [products, setProducts] = useState(resultSearchProduct.data[2].items);

  function handleInfinityScroll(e) {
    let mHeight = e.nativeEvent.layoutMeasurement.height;
    let cSize = e.nativeEvent.contentSize.height;
    let Y = e.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  }
  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <NoData msg="Segera Hadir" />
    </View>
  );
};

const renderScene =
  Platform.OS === "android"
    ? SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
      })
    : SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });

const FilterResultScreen = (props) => {
  const { route } = props;
  const { keyword } = route.params;
  const { resultSearchProduct } = useSelector((state) => state.produkReducer);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = useState(
    Platform.OS === "android"
      ? [
          { key: "first", title: "Paket Belajar" },
          { key: "second", title: "Paket Tryout" },
          { key: "third", title: "Buku Sakti" },
        ]
      : [
          { key: "first", title: "Paket Belajar" },
          { key: "second", title: "Paket Tryout" },
        ]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar backEnabled={true} title="Hasil Pencarian" />
      <View
        style={{
          paddingHorizontal: Sizes.fixPadding,
        }}
      >
        <View style={styles.card}>
          <Text style={{ ...Fonts.black15Regular, color: "grey" }}>
            Pencarian:
          </Text>

          <Text style={{ ...Fonts.black17Regular }}>{keyword}</Text>
        </View>
      </View>
      {resultSearchProduct.loading ? (
        <ActivityIndicator color={Colors.orangeColor} size={30} />
      ) : (
        <TabView
          style={{ paddingHorizontal: Sizes.fixPadding }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(item) => (
            <TabBar
              {...item}
              indicatorStyle={{ backgroundColor: Colors.orangeColor }}
              style={{ backgroundColor: Colors.whiteColor }}
              renderLabel={({ route, focused, color }) => {
                return (
                  <View style={{ flex: 1 }}>
                    <Text style={{ ...Fonts.black17Bold }}>{route.title}</Text>
                    {route.title === "Paket Belajar" ? (
                      <Text
                        style={{ ...Fonts.black17Bold, alignSelf: "center" }}
                      >
                        {resultSearchProduct?.data[0]["total"].toString()}
                      </Text>
                    ) : route.title === "Paket Tryout" ? (
                      <Text
                        style={{ ...Fonts.black17Bold, alignSelf: "center" }}
                      >
                        {resultSearchProduct?.data[1]["total"].toString()}
                      </Text>
                    ) : (
                      <Text
                        style={{ ...Fonts.black17Bold, alignSelf: "center" }}
                      >
                        Segera
                      </Text>
                    )}
                  </View>
                );
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FilterResultScreen;

const styles = StyleSheet.create({
  card: {
    marginVertical: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    elevation: 2,
  },
});

import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import Fonts from "../../../Theme/Fonts";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPurchasedProduk } from "../../../Redux/Produk/produkActions";
import { useNavigation } from "@react-navigation/core";

const PurchasedProductBottom = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const section_id = props.sectionId;
  const totalPurchasedProduk = useSelector((state) => state.produkReducer.totalPurchasedProduk);

  useEffect(() => {
    dispatch(getTotalPurchasedProduk(section_id));
  }, []);

  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
        paddingHorizontal: Sizes.fixPadding,
      }}
    >
      {totalPurchasedProduk.loading && <Text>Loading...</Text>}
      {totalPurchasedProduk.data !== null && <Text style={{ ...Fonts.black15Regular, flex: 1 }}>Anda telah membeli {totalPurchasedProduk.data} product</Text>}

      <MaterialIcons
        name="arrow-forward-ios"
        size={24}
        color="black"
        onPress={() =>
          navigation.navigate("ProductPurchasedScreen", {
            id: section_id,
          })
        }
      />
    </View>
  );
};

export default PurchasedProductBottom;

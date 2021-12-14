import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../../Theme/Colors";
import Sizes from "../../../Theme/Sizes";
import Fonts from "../../../Theme/Fonts";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasedproduk, getTotalPurchasedProduk } from "../../../Redux/Produk/produkActions";
import { useNavigation, useFocusEffect } from "@react-navigation/core";

const PurchasedProductBottom = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const section_id = props.sectionId;
  const purchasedProduk = useSelector((state) => state.produkReducer.purchasedProduk);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPurchasedproduk(section_id));
    }, [])
  );

  console.log(purchasedProduk);

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
      {purchasedProduk.loading && <Text>Loading...</Text>}
      {purchasedProduk.data !== null && <Text style={{ ...Fonts.black15Regular, flex: 1 }}>Anda telah membeli {purchasedProduk?.data.length} product</Text>}

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

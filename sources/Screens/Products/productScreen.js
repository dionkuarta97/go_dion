import React from "react";
import { SafeAreaView, StatusBar, Text, View, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SliverAppBar from "../../Components/sliverAppBar";
import { useNavigation } from "@react-navigation/core";
import ProductContent from "./Component/ProductContent";
import ActionButtonCart from "../../Components/ActionButton/ActionButtonCart";
import ActionButtonFilter from "../../Components/ActionButton/ActionButtonFilter";

import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";
import { Box } from "native-base";

const ProductScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SliverAppBar
        leftItem={
          <Box
            style={{
              paddingLeft: 5,
              paddingVertical: 3,
              borderRadius: 10,
              backgroundColor: "rgba(245,158,11, 0)",
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Colors.blackColor}
              onPress={() => navigation.goBack()}
            />
          </Box>
        }
        rightItem={
          <View style={{ flexDirection: "row" }}>
            <ActionButtonFilter />
            <View style={{ width: 15 }} />
            {Platform.OS === "android" && <ActionButtonCart />}
          </View>
        }
        element={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={Fonts.black25Bold}>Produk Kami</Text>
          </View>
        }
        toolbarColor={Colors.primaryColor}
        toolBarMinHeight={40}
        toolbarMaxHeight={230}
        src={require("../../../assets/Images/appbar_bg.png")}
      >
        <ProductContent />
        <StatusBar backgroundColor={Colors.primaryColor} />
      </SliverAppBar>
    </SafeAreaView>
  );
};

export default ProductScreen;

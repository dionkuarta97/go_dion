import React from "react";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import Fonts from "../Theme/Fonts";
import Sizes from "../Theme/Sizes";
import Colors from "../Theme/Colors";

const dummyProductData = {
  _id: "6167e3732d4fb95908691d2a",
  category: "tryout",
  desc: "Tryout UNBK 2021",
  details: {
    attr1: "Lorem ipsum 1",
    attr2: "Lorem ipsum 2",
    attr3: "Lorem ipsum 3",
    category: "Tryout 2",
    level: "9 SMP",
    wilayah: "Jawa Tengah",
  },
  includes: ["6167e2052d4fb95908691d28"],
  is_active: true,
  price: 87000,
  price_discount: 67000,
  purchased: false,
  thumbnail: "http://yrama-widya.co.id/wp-content/uploads/2018/08/Sonar-Maestro-USBN-SMP-2019.jpg",
  title: "Tryout UNBK 2021",
};

const ProductCard = (props) => {
  const navigation = useNavigation();
  const item = !props.data ? dummyProductData : props.data;

  const { newStyle } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("ProductDetailScreen", {
          item: item,
          section: props.section,
        })
      }
      style={newStyle?.card ? newStyle?.card : styles.card}
    >
      <View style={{ position: "relative" }}>
        <Image source={{ uri: item.thumbnail }} resizeMode="cover" style={newStyle?.image ? newStyle?.image : styles.image} />

        {item.purchased && (
          <View style={styles.purchasedCircle}>
            <MaterialIcons name="check" size={20} color="white" />
          </View>
        )}
      </View>
      <View style={newStyle?.infoContainer ? newStyle?.infoContainer : styles.infoContainer}>
        <Text style={{ ...Fonts.gray15Regular }}>{item.title}</Text>
        <Text
          style={{
            ...Fonts.black17Bold,
            marginVertical: Sizes.fixPadding - 5.0,
          }}
        >
          {props.section}
        </Text>
        {item.price_discount !== 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: Sizes.fixPadding - 5.0,
            }}
          >
            <NumberFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator="."
              decimalSeparator=","
              prefix={"IDR "}
              renderText={(value, props) => (
                <Text
                  style={{
                    color: Colors.orangeColor,
                    textDecorationLine: "line-through",
                  }}
                >
                  {value}
                </Text>
              )}
            />
          </View>
        )}

        <NumberFormat
          value={item.price_discount !== 0 ? item.price_discount : item.price}
          displayType={"text"}
          thousandSeparator="."
          decimalSeparator=","
          prefix={"IDR "}
          renderText={(value, props) => (
            <Text
              style={{
                ...Fonts.black19Bold,
                marginTop: Sizes.fixPadding,
              }}
            >
              {value}
            </Text>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
  section: PropTypes.string,
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    elevation: 1.0,
    width: 220.0,
    borderRadius: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    overflow: "hidden",
    marginRight: Sizes.fixPadding * 2.0,
  },
  image: {
    width: 220.0,
    height: 150.0,
    borderTopRightRadius: Sizes.fixPadding * 2.0,
    borderTopLeftRadius: Sizes.fixPadding * 2.0,
  },
  infoContainer: {
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
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
});

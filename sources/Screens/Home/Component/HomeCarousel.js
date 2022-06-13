import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import Sizes from "../../../Theme/Sizes";
import { useSelector } from "react-redux";

const width = Dimensions.get("window").width;

const carouselItems = [
  {
    image: require("../../../../assets/Images/slider/image-1.png"),
  },
  {
    image: require("../../../../assets/Images/slider/image-2.png"),
  },
  {
    image: require("../../../../assets/Images/slider/image-3.png"),
  },
];

const HomeCarousel = () => {
  const itemWidth = Math.round(width * 0.8);
  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      style={{
        width: itemWidth - 10,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
      }}
      borderRadius={Sizes.fixPadding - 5.0}
    ></ImageBackground>
  );

  return (
    <View style={{ paddingVertical: Sizes.fixPadding * 3 }}>
      <Carousel
        layout={"default"}
        data={carouselItems}
        sliderWidth={width}
        itemWidth={itemWidth}
        renderItem={renderItem}
        autoplay={true}
        loop={true}
        lockScrollWhileSnapping={true}
        autoplayInterval={4000}
      />
    </View>
  );
};

export default HomeCarousel;

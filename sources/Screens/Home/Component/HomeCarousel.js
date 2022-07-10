import React, { useState } from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

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
  const [activeSlide, setActiveSlide] = useState(0);
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
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay={true}
        loop={true}
        lockScrollWhileSnapping={true}
        autoplayInterval={4000}
      />
      <Pagination
        dotsLength={carouselItems.length} // also based on number of sildes you want
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "black",
        }}
        inactiveDotStyle={{
          backgroundColor: "#fb923c",
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.7}
      />
    </View>
  );
};

export default HomeCarousel;

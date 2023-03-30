import React, { useCallback, useEffect, useState } from "react";
import {
   Dimensions,
   ImageBackground,
   View,
   TouchableOpacity,
   Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import Sizes from "../../../Theme/Sizes";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getBanner } from "../../../Redux/Data/dataActions";

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
   const dispatch = useDispatch();
   const { listBanner } = useSelector((state) => state.dataReducer);
   const itemWidth = Math.round(width * 0.94);
   const [activeSlide, setActiveSlide] = useState(0);
   const OpenWEB = (url) => {
      Linking.openURL(url);
   };

   useFocusEffect(
      useCallback(() => {
         setActiveSlide(0);
         dispatch(getBanner());
      }, [])
   );

   const renderItem = ({ item }) => (
      <TouchableOpacity
         onPress={async () => {
            if (item.target[0] === "e") {
               OpenWEB(item.target.replace("external:", ""));
            }
         }}
      >
         <ImageBackground
            source={{ uri: item.image_url }}
            style={{
               width: itemWidth,
               height: itemWidth / 2,
               alignItems: "center",
               justifyContent: "center",
            }}
            borderRadius={Sizes.fixPadding - 5.0}
         />
      </TouchableOpacity>
   );

   return (
      <View style={{ paddingVertical: Sizes.fixPadding * 1 }}>
         {!listBanner.loading && listBanner.data !== null && (
            <>
               <Carousel
                  layout={"default"}
                  data={listBanner.data}
                  sliderWidth={width}
                  itemWidth={itemWidth}
                  renderItem={renderItem}
                  onSnapToItem={(index) => setActiveSlide(index)}
                  autoplay={true}
                  enableMomentum={true}
                  lockScrollWhileSnapping={true}
                  autoplayInterval={4000}
                  decelerationRate={"fast"}
               />
               <Pagination
                  dotsLength={listBanner.data?.length} // also based on number of sildes you want
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
            </>
         )}
      </View>
   );
};

export default HomeCarousel;

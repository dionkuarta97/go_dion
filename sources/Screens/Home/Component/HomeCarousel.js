import React from "react";
import {Dimensions, ImageBackground, Text, View} from "react-native";
import Carousel from "react-native-snap-carousel";

import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";

const width = Dimensions.get("window").width;

const carouselItems = [
    {
        image: require("../../../../assets/Images/new_course/new_course_4.png"),
    },
    {
        image: require("../../../../assets/Images/new_course/new_course_2.png"),
    },
    {
        image: require("../../../../assets/Images/new_course/new_course_3.png"),
    },
];

const HomeCarousel = () => {
    const itemWidth = Math.round(width * 0.8);
    const renderItem = ({item}) => (
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
        <View style={{paddingVertical: Sizes.fixPadding * 3}}>
            <Carousel
                ref={(ref) => (this.carousel = ref)}
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
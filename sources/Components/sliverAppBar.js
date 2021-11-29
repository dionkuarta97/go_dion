import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    Animated,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Colors from "../Theme/Colors";

const propTypes = {
    children: PropTypes.node.isRequired,
    src: PropTypes.any,
    element: PropTypes.element,
    titleColor: PropTypes.string,
    leftItem: PropTypes.element,
    leftItemPress: PropTypes.func,
    rightItem: PropTypes.element,
    rightItemPress: PropTypes.func,
    toolbarColor: PropTypes.string,
    toolbarMaxHeight: PropTypes.number,
    toolbarMinHeight: PropTypes.number,
    borderBottomRadius: PropTypes.number,
    isImageBlur: PropTypes.bool,
    childrenMinHeight: PropTypes.number,
    isImage: PropTypes.bool,
};

const defaultProps = {
    leftItem: null,
    leftItemPress: null,
    rightItem: null,
    rightItemPress: null,
    element: null,
    titleColor: "#fff",
    toolbarColor: Colors.primaryColor,
    toolbarMaxHeight: 300,
    toolbarMinHeight: 55,
    borderBottomRadius: 0,
    isImageBlur: false,
    childrenMinHeight: 700,
    isImage: true,
};

const SliverAppBar = (props) => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const {
        children,
        src,
        leftItem,
        leftItemPress,
        rightItem,
        rightItemPress,
        element,
        toolbarColor,
        toolbarMaxHeight,
        toolbarMinHeight,
        borderBottomRadius,
        isImageBlur,
        childrenMinHeight,
        isImage,
    } = props;

    const scrollDistance = toolbarMaxHeight - toolbarMinHeight;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [0, -scrollDistance],
        extrapolate: "clamp",
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, scrollDistance / 2, scrollDistance],
        outputRange: [1, 1, 0],
        extrapolate: "clamp",
    });

    const videoOpacity = scrollY.interpolate({
        inputRange: [0, scrollDistance / 2, scrollDistance],
        outputRange: [1, 1, 0],
        extrapolate: "clamp",
    });

    const imageTranslate = scrollY.interpolate({
        inputRange: [0, scrollDistance],
        outputRange: [0, 100],
        extrapolate: "clamp",
    });

    const elementScale = scrollY.interpolate({
        inputRange: [0, 50, 100],
        outputRange: [1, 1, 0],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.fill}>
            <StatusBar translucent={false} backgroundColor="transparent" />
            <Animated.ScrollView
                style={styles.fill}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                <View
                    style={{
                        marginTop: toolbarMaxHeight,
                        minHeight: childrenMinHeight,
                    }}
                >
                    {children}
                </View>
            </Animated.ScrollView>
            <Animated.View
                style={[
                    styles.header,
                    {
                        backgroundColor: toolbarColor,
                        height: toolbarMaxHeight,
                        transform: [{ translateY: headerTranslate }],
                    },
                ]}
            >
                {isImage ? (
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                height: toolbarMaxHeight,
                                backgroundColor: toolbarColor,
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        borderBottomLeftRadius={borderBottomRadius}
                        borderBottomRightRadius={borderBottomRadius}
                        source={src}
                    />
                ) : (
                    <Animated.View
                        style={[
                            {
                                height: toolbarMaxHeight,
                                backgroundColor: "white",
                                opacity: videoOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                    ></Animated.View>
                )}
                {isImageBlur ? (
                    <Animated.View
                        style={[
                            styles.backgroundImage,
                            {
                                height: toolbarMaxHeight,
                                backgroundColor: "rgba(0, 0, 0, 0.70)",
                                opacity: imageOpacity,
                                borderBottomLeftRadius: borderBottomRadius,
                                borderBottomRightRadius: borderBottomRadius,
                            },
                        ]}
                    ></Animated.View>
                ) : null}

                <Animated.View
                    style={[
                        styles.action,
                        {
                            backgroundColor: "transparent",
                            transform: [{ scale: elementScale }],
                            bottom: isImage ? 20 : 0.0,
                            paddingHorizontal: isImage ? 20 : 0.0,
                        },
                    ]}
                >
                    {element}
                </Animated.View>
            </Animated.View>

            <Animated.View style={styles.bar}>
                <View style={styles.left}>{leftItem}</View>
                <View style={styles.right}>{rightItem}</View>
            </Animated.View>
        </View>
    );
};

SliverAppBar.propTypes = propTypes;
SliverAppBar.defaultProps = defaultProps;

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        top: 0,
        left: 0,
        right: 0,
        overflow: "hidden",
        position: "absolute",
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: "cover",
    },
    action: {
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
    },
    bar: {
        top: 0,
        left: 0,
        right: 20,
        height: 56,
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
    },
    left: {
        top: 0,
        left: 0,
        width: 50,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    right: {
        top: 0,
        right: 0,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default SliverAppBar;

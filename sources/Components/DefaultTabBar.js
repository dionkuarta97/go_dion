import React, {useState} from "react";
import {Text, Dimensions, StyleSheet, View} from "react-native";
import {TabView, TabBar} from "react-native-tab-view";
import PropTypes from "prop-types";

import Fonts from "../Theme/Fonts";
import Colors from "../Theme/Colors";
import Sizes from "../Theme/Sizes";

const proptype = {
    routes: PropTypes.array.isRequired,
    screen: PropTypes.array.isRequired,
};

const DefaultTabBar = (props) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState(props.routes);

    console.log(routes);

    const renderScene = ({route, jumpTo}) => {
        return props.screen[index];
    };

    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(item) => (
                <TabBar
                    {...item}
                    indicatorStyle={{backgroundColor: Colors.orangeColor}}
                    tabStyle={{
                        width: Dimensions.get("window").width / routes.length,
                    }}
                    style={{backgroundColor: Colors.whiteColor}}
                    renderLabel={({route, focused, color}) => (
                        <Text style={{...Fonts.black17Bold}}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    );
};

DefaultTabBar.propTypes = proptype;

export default DefaultTabBar;

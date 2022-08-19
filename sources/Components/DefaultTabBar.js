import React, { useState } from "react";
import { Text, Dimensions, StyleSheet, View } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
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

  const renderScene = ({ route, jumpTo }) => {
    return props.screen[index];
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(val) => {
        if (props.onChange) {
          props.onChange(val);
        }
        setIndex(val);
      }}
      renderTabBar={(item) => (
        <TabBar
          {...item}
          indicatorStyle={{ backgroundColor: Colors.orangeColor }}
          tabStyle={{
            width: Dimensions.get("window").width / routes.length,
          }}
          style={{ backgroundColor: Colors.whiteColor }}
          renderLabel={({ route, focused, color }) => (
            <Text
              style={{
                fontSize: Dimensions.get("screen").width / 36,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {route.title}
              {route.tryout && route.tryout > 0 ? (
                <Text
                  style={{
                    fontSize: Dimensions.get("screen").width / 31,
                    color: "red",
                  }}
                >
                  {" " + `(${route.tryout})`}
                </Text>
              ) : null}
            </Text>
          )}
        />
      )}
    />
  );
};

DefaultTabBar.propTypes = proptype;

export default DefaultTabBar;

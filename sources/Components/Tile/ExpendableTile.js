import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Sizes from "../../Theme/Sizes";
import Fonts from "../../Theme/Fonts";
import Colors from "../../Theme/Colors";

const proptype = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

const ExpandableTile = (props) => {
  const { onIcon } = props;
  const [isExpand, setIsExpand] = useState(false);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setIsExpand(!isExpand);
        }}
      >
        {props.header}
        {onIcon && (
          <View
            style={{
              borderColor: Colors.ligthGreyColor,
              backgroundColor: !isExpand ? "rgb(242, 242, 242)" : "white",
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
              borderTopEndRadius: 5,
              borderTopStartRadius: 5,
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name={!isExpand ? "keyboard-arrow-down" : "keyboard-arrow-up"}
              size={24}
              color="black"
            />
          </View>
        )}
      </TouchableOpacity>
      {isExpand && (
        <Animated.View style={{ height: isExpand ? null : 0 }}>
          {props.children}
        </Animated.View>
      )}
    </View>
  );
};

ExpandableTile.propTypes = proptype;

export default ExpandableTile;

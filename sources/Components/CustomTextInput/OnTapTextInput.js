import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const OnTapTextInput = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => props.onTap()}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 15,
          borderBottomColor: "#898989",
          borderBottomWidth: 1,
        }}
      >
        <View pointerEvents="none" style={{ flex: 1 }}>
          <TextInput
            autoCapitalize="none"
            multiline={true}
            placeholder={props.placeholder}
            value={props.value}
            style={{
              flex: 1,
              ...Fonts.black17Regular,
              paddingVertical: Sizes.fixPadding / 2,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: Sizes.fixPadding }}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OnTapTextInput;

OnTapTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onTap: PropTypes.func,
};

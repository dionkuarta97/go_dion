import React, { useState } from "react";
import { TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { Entypo } from "@expo/vector-icons";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const PasswordTextInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 15,
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 5,
        borderColor:
          props.value === "" || !props.value
            ? Colors.neutralRedColor
            : Colors.neutralGreenColor,
      }}
    >
      <TextInput
        autoCapitalize="none"
        placeholder={props.placeholder}
        secureTextEntry={passwordVisible}
        style={{
          ...Fonts.black17Regular,
          paddingVertical: Sizes.fixPadding / 2,
          flex: 1,
        }}
        onFocus={() => {
          setFocused(true);
          if (props.onFocus) {
            props.onFocus(true);
          }
        }}
        onBlur={() => setFocused(false)}
        onChangeText={props.onChangeText}
      />
      <View style={{ paddingHorizontal: Sizes.fixPadding }}>
        <Entypo
          name={passwordVisible ? "eye" : "eye-with-line"}
          size={24}
          color={focused ? Colors.primaryColor : "#898989"}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </View>
    </View>
  );
};

export default PasswordTextInput;

PasswordTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

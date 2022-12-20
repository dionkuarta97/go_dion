import React, { useState } from "react";
import { TextInput, View } from "react-native";
import PropTypes from "prop-types";

import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";

const DefaultTextInput = (props) => {
  const { keyboardType, autoCapitalize } = props;
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 5,
        borderColor: !props.nomor
          ? props.value === "" || !props.value
            ? Colors.neutralRedColor
            : Colors.neutralGreenColor
          : !props.valid
          ? Colors.neutralRedColor
          : Colors.neutralGreenColor,
      }}
    >
      <TextInput
        editable={props.disable === false ? props.disable : true}
        keyboardType={keyboardType ? keyboardType : "default"}
        autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
        value={props.value}
        placeholder={props.placeholder}
        style={{
          flex: 1,
          ...Fonts.black17Regular,
          paddingVertical: Sizes.fixPadding / 2,
          color: props.disable === false ? "grey" : "black",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default DefaultTextInput;

DefaultTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func,
};

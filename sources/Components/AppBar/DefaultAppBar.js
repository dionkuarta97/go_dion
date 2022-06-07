import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../Theme/Colors";
import Sizes from "../../Theme/Sizes";
import { Text } from "native-base";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box } from "native-base";

const propTypes = {
  title: PropTypes.string,
  rightItem: PropTypes.node,
  backEnabled: PropTypes.bool,
  backPressed: PropTypes.func,
};

const DefaultAppBar = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.appBar}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {props.backEnabled && (
          <Box
            style={{
              paddingLeft: 5,
              paddingVertical: 3,
              borderRadius: 10,
              backgroundColor: "rgba(245,158,11, 0)",
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="black"
              onPress={
                props.backPressed != null
                  ? props.backPressed
                  : () => navigation.goBack()
              }
            />
          </Box>
        )}
        <Text bold marginY={1} marginLeft={2} fontSize={16}>
          {props.title}
        </Text>
      </View>
      {props.rightItem}
    </View>
  );
};

export default DefaultAppBar;

DefaultAppBar.propTypes = propTypes;

const styles = StyleSheet.create({
  appBar: {
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    elevation: 10.0,
  },
});

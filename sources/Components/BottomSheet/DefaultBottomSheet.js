import React from "react";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";

const DefaultBottomSheet = (props) => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.dimBackground} />
        <View style={styles.dialog}>
          <View style={styles.contentHeader}>
            <Text style={{ flex: 1, ...Fonts.black17Bold }}>{props.title}</Text>
            <TouchableOpacity onPress={() => props.onClose()}>
              <View style={styles.closeContainer}>
                <MaterialIcons name="close" size={20} color="grey" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ padding: Sizes.fixPadding * 2 }}>
            {props.children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

DefaultBottomSheet.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default DefaultBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    position: "relative",
  },
  dimBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.3,
  },
  dialog: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("screen").width,
    maxHeight: Dimensions.get("screen").height * 0.8,
    backgroundColor: "white",
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
  },
  contentHeader: {
    flexDirection: "row",
    padding: Sizes.fixPadding * 2,
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  closeContainer: {
    borderRadius: 100,
    width: 30,
    height: 30,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
  },
});

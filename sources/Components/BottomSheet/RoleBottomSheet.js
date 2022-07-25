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
  TextInput,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import DefaultBottomSheet from "./DefaultBottomSheet";

const RoleBottomSheet = (props) => {
  return (
    <DefaultBottomSheet title="Pilih Peran" onClose={() => props.onClose()}>
      {["Siswa", "Orang Tua"].map((val, idx) => {
        return (
          <TouchableOpacity
            key={`role-${idx}`}
            onPress={() => props.onSelect(val)}
          >
            <View style={styles.tile}>
              <Text>{val}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </DefaultBottomSheet>
  );
};

RoleBottomSheet.propTypes = {
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

export default RoleBottomSheet;

const styles = StyleSheet.create({
  tile: {
    borderRadius: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding * 1.5,
    paddingVertical: Sizes.fixPadding * 1.5,
    marginVertical: Sizes.fixPadding / 2,
    backgroundColor: Colors.primaryColor,
  },
});

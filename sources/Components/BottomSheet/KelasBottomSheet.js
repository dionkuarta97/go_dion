import React, { useLayoutEffect, useState } from "react";
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
import { FlatGrid } from "react-native-super-grid";
import { useDispatch, useSelector } from "react-redux";
import { getListGrades } from "../../Redux/Data/dataActions";

const KelasBottomSheet = (props) => {
  const dispatch = useDispatch();
  const listGrades = useSelector((state) => state.dataReducer.listGrades);
  const [idx, setIdx] = useState(0);
  console.log(JSON.stringify(listGrades, null, 2));

  useLayoutEffect(() => {
    dispatch(getListGrades());
  }, []);
  return (
    <DefaultBottomSheet
      title="Select Class Level"
      onClose={() => props.onClose()}
    >
      {listGrades.loading && (
        <ActivityIndicator color={Colors.orangeColor} size={25} />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {listGrades.data !== null &&
          listGrades.data.map((val, index) => {
            return (
              <TouchableOpacity onPress={() => setIdx(index)}>
                <Text
                  style={{
                    borderWidth: 2,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    margin: 10,
                    borderRadius: 8,
                    backgroundColor:
                      idx === index ? Colors.primaryColor : "white",
                    borderColor: Colors.primaryColor,
                  }}
                >
                  {val.title}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      {listGrades.data !== null && (
        <FlatGrid
          data={listGrades.data[idx].grade}
          renderItem={({ item, idx }) => {
            return (
              <TouchableOpacity onPress={() => props.onSelect(item)}>
                <View style={styles.tile}>
                  <Text style={{ alignSelf: "center" }}>{`Kelas ${item}`}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </DefaultBottomSheet>
  );
};

KelasBottomSheet.propTypes = {
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

export default KelasBottomSheet;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding / 2,
  },
});

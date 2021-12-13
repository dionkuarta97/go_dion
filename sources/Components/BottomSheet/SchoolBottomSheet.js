import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

import { Dimensions, Modal, ScrollView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, FlatList } from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import DefaultBottomSheet from "./DefaultBottomSheet";
import { getListSekolah } from "../../Redux/Data/dataActions";
import { useDispatch, useSelector } from "react-redux";

const SchoolBottomSheet = (props) => {
  const dispatch = useDispatch();
  const listSekolah = useSelector((state) => state.dataReducer.listSekolah);

  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    dispatch(getListSekolah(props.idkabkota));
  }, []);
  return (
    <DefaultBottomSheet title="School Name" onClose={() => props.onClose()}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            paddingVertical: Sizes.fixPadding,
          }}
          onChangeText={setSearch}
        />
        <View style={{ paddingHorizontal: Sizes.fixPadding }}>
          <MaterialIcons name="search" size={24} color="grey" />
        </View>
      </View>
      {listSekolah.loading && <ActivityIndicator color={Colors.orangeColor} />}
      {listSekolah.data !== null && (
        <FlatList
          style={{ marginBottom: 140 }}
          keyExtractor={(item, index) => index + ""}
          data={listSekolah.data.filter((value) => value.namasekolah.toLowerCase().includes(search.toLowerCase()))}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity key={`sekolah-${item.idsekolah}`} onPress={() => props.onSelect(item.namasekolah)}>
                <View style={styles.tile}>
                  <Text style={{ flex: 1 }}>{item.namasekolah}</Text>
                  <View
                    style={{
                      paddingHorizontal: Sizes.fixPadding / 2,
                    }}
                  >
                    <MaterialIcons name="keyboard-arrow-right" size={30} color={Colors.orangeColor} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </DefaultBottomSheet>
  );
};

SchoolBottomSheet.propTypes = {
  idkabkota: PropTypes.string,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

export default SchoolBottomSheet;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    paddingHorizontal: Sizes.fixPadding * 2,
    backgroundColor: "whitesmoke",
    borderRadius: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  tile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Sizes.fixPadding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
});

import React, { useEffect, useLayoutEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import Sizes from "../../Theme/Sizes";
import Colors from "../../Theme/Colors";
import Fonts from "../../Theme/Fonts";
import DefaultBottomSheet from "./DefaultBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { getListProvince } from "../../Redux/Data/dataActions";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../ToastErrorContent";

const ProvinceBottomSheet = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const listProvince = useSelector((state) => state.dataReducer.listProvince);

  const [search, setSearch] = useState("");

  useLayoutEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getListProvince());
      } else {
        props.onClose();
        toast.show({
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
          duration: null,
          render: () => {
            return (
              <ToastErrorContent
                content="Kamu tidak terhubung ke intenet"
                onPress={() => {
                  toast.closeAll();
                  navigation.goBack();
                }}
              />
            );
          },
        });
      }
    });
  }, []);
  return (
    <DefaultBottomSheet title="Province" onClose={() => props.onClose()}>
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
      {listProvince.loading && <ActivityIndicator color={Colors.orangeColor} />}
      {listProvince.data !== null && (
        <FlatList
          style={{ marginBottom: 50 }}
          keyExtractor={(item, index) => item.idprovinsi + ""}
          data={listProvince.data.filter((value) =>
            value.provinsi.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={`province-${item.idprovinsi}`}
                onPress={() => props.onSelect(item)}
              >
                <View style={styles.tile}>
                  <Text style={{ flex: 1 }}>{item.provinsi}</Text>
                  <View
                    style={{
                      paddingHorizontal: Sizes.fixPadding / 2,
                    }}
                  >
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={30}
                      color={Colors.orangeColor}
                    />
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

ProvinceBottomSheet.propTypes = {
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

export default ProvinceBottomSheet;

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

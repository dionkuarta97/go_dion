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
import DefaultBottomSheet from "../../../Components/BottomSheet/DefaultBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { getUniversitas } from "../../../Redux/Data/dataActions";
import Colors from "../../../Theme/Colors";

const SelectUniversitasDua = (props) => {
  const dispatch = useDispatch();
  const { listUniversitas } = useSelector((state) => state.dataReducer);
  const { onClose, onSelect } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUniversitas());
  }, []);
  return (
    <>
      <DefaultBottomSheet onClose={() => onClose()} title="Pilih Universitas">
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            backgroundColor: "whitesmoke",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Search"
            style={{
              flex: 1,
              padding: 10,
            }}
            onChangeText={(val) => {
              setSearch(val);
            }}
          />
          <View>
            <MaterialIcons name="search" size={24} color="grey" />
          </View>
        </View>
        {listUniversitas.loading ? (
          <ActivityIndicator color={Colors.orangeColor} />
        ) : (
          <FlatList
            style={{
              marginBottom: 20,
              height: Dimensions.get("screen").height / 3,
            }}
            keyExtractor={(item, index) => item.id + "univ"}
            data={listUniversitas.data?.filter((value) =>
              value.title.toLowerCase().includes(search.toLowerCase())
            )}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={`universitas-${item.id}`}
                  onPress={() => onSelect(item)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "lightgrey",
                    }}
                  >
                    <Text style={{ flex: 1 }}>{item.title}</Text>
                    <View
                      style={{
                        paddingHorizontal: 2,
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
    </>
  );
};

export default SelectUniversitasDua;

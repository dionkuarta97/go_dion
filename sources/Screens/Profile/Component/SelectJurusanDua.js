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
  Platform,
} from "react-native";
import DefaultBottomSheet from "../../../Components/BottomSheet/DefaultBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import { getJurusan } from "../../../Redux/Data/dataActions";
import Colors from "../../../Theme/Colors";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import checkInternet from "../../../Services/CheckInternet";
import ToastErrorContent from "../../../Components/ToastErrorContent";

const SelectJurusanDua = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { listJurusan } = useSelector((state) => state.dataReducer);
  const { onClose, onSelect, idUniversitas, kelompok } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getJurusan(idUniversitas, kelompok));
      } else {
        props.onClose();
        toast.show({
          placement: "top",
          width: Dimensions.get("screen").width / 1.3,
          duration: null,
          render: () => {
            return (
              <ToastErrorContent
                content="Kamu tidak terhubung ke internet"
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
  console.log(kelompok);
  return (
    <>
      <DefaultBottomSheet onClose={() => onClose()} title="Pilih Jurusan">
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
        {listJurusan.loading ? (
          <ActivityIndicator color={Colors.orangeColor} />
        ) : (
          <FlatList
            style={{
              marginBottom: 50,
              maxHeight:
                Platform.OS === "ios"
                  ? Dimensions.get("screen").height / 2.2
                  : Dimensions.get("screen").height / 4,
              minHeight:
                Platform.OS === "ios"
                  ? Dimensions.get("screen").height / 2.2
                  : Dimensions.get("screen").height / 4,
            }}
            keyExtractor={(item, index) => item.id + "univ"}
            data={listJurusan.data?.filter((value) =>
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

export default SelectJurusanDua;

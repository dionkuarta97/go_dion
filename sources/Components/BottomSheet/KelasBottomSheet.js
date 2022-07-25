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
import { Box, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../ToastErrorContent";

const KelasBottomSheet = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const listGrades = useSelector((state) => state.dataReducer.listGrades);
  const [idx, setIdx] = useState(0);

  useLayoutEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getListGrades());
      } else {
        props.onClose();
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
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
  return (
    <DefaultBottomSheet title="Tingkatan Kelas" onClose={() => props.onClose()}>
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
                  key={index}
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
          key={idx}
          data={listGrades.data[idx].grade}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => props.onSelect(item)}>
                <Box
                  bg={item.substring(3, 10) === "IPA" ? "red.300" : "amber.400"}
                  borderRadius={5}
                >
                  <Text style={{ alignSelf: "center" }}>{`Kelas ${item}`}</Text>
                </Box>
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

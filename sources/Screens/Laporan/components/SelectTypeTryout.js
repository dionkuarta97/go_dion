import { useNavigation } from "@react-navigation/native";
import { Box, Select, CheckIcon, Spinner, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import { getTypeTryout } from "../../../Redux/Laporan/LaporanAction";
import checkInternet from "../../../Services/CheckInternet";

const SelectTypeTryout = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const { select, onChange } = props;
  const { typeTryout } = useSelector((state) => state.laporanReducer);

  useEffect(() => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(getTypeTryout());
      } else {
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
  }, [select]);

  return (
    <Box
      padding={5}
      shadow={3}
      mb={5}
      bg={"white"}
      style={{
        borderRadius: 10,
      }}
    >
      {typeTryout.loading && <Spinner size={30} color={"amber.400"} />}
      {typeTryout.data !== null && (
        <Select
          _selectedItem={{
            bg: "amber.400",
            endIcon: <CheckIcon size="5" />,
          }}
          accessibilityLabel="--PILIH TIPE TRYOUT--"
          placeholder="--PILIH TIPE TRYOUT--"
          onValueChange={(val) => {
            onChange(val);
          }}
          selectedValue={select}
        >
          {typeTryout.data?.map((el) => (
            <Select.Item key={el._id} label={el.title} value={el.key} />
          ))}
        </Select>
      )}
    </Box>
  );
};

export default SelectTypeTryout;

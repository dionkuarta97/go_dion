import { Box, Select, CheckIcon, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypeTryout } from "../../../Redux/Laporan/LaporanAction";

const SelectTypeTryout = (props) => {
  const dispatch = useDispatch();
  const { select, onChange } = props;
  const { typeTryout } = useSelector((state) => state.laporanReducer);

  useEffect(() => {
    dispatch(getTypeTryout());
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

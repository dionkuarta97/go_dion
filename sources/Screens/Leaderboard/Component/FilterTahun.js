import React from "react";
import { HStack, Text, Input, Button } from "native-base";
import { Keyboard } from "react-native";

const FilterTahun = (props) => {
  const { tahunAwal, tahunAkhir, onChangeTahunAwal, onChangeTahunAkhir, cari } =
    props;
  return (
    <>
      <Text bold>Tahun Ajaran</Text>
      <HStack marginTop={3} space={5} alignItems={"center"}>
        <Input
          value={tahunAwal.toString()}
          onChangeText={(val) => onChangeTahunAwal(val)}
          width={70}
          size={"10"}
        />
        <Text bold fontSize={18}>
          {" "}
          /{" "}
        </Text>
        <Input
          width={70}
          onChangeText={(val) => onChangeTahunAkhir(val)}
          value={tahunAkhir.toString()}
          size={"10"}
          marginRight={"auto"}
        />
        <Button
          onPress={() => {
            Keyboard.dismiss();
            cari();
          }}
          colorScheme="success"
        >
          Cari
        </Button>
      </HStack>
    </>
  );
};

export default FilterTahun;

import React from "react";
import { Button, Modal, Center, Text, Box, VStack, HStack } from "native-base";
import { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { AntDesign } from "@expo/vector-icons";
const options = ["A", "B", "C", "D", "E", "F"];
const LihatSoal = (props) => {
  const { quiz, tipe, idx, setIndex, allJawab, loadingBawah, loading } = props;
  const [showModal, setShowModal] = useState(false);

  const cekJawab = (arr) => {
    for (const key in arr) {
      if (arr[key] !== -1) {
        return true;
      }
    }
    return false;
  };

  return (
    <Center>
      <Button
        bg={"amber.400"}
        disabled={loading || loadingBawah ? true : false}
        opacity={loading || loadingBawah ? 0.3 : 1}
        _pressed={{
          bg: "amber.300",
        }}
        shadow={2}
        borderRadius={10}
        size={"sm"}
        onPress={() => setShowModal(true)}
      >
        <Text fontSize={12} bold>
          Lihat Status
        </Text>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text bold fontSize={17}>
              Lihat Status
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack ml={2} space={2} mb={5}>
              <HStack>
                <Box borderRadius={3} width={5} height={5} bg={"success.200"} />
                <Text> : Sudah dijawab</Text>
              </HStack>
              <HStack>
                <Box borderRadius={3} width={5} height={5} bg={"red.200"} />
                <Text> : Belum dijawab</Text>
              </HStack>
            </VStack>

            <FlatGrid
              itemDimension={Dimensions.get("screen").width / 5}
              spacing={5}
              itemContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              data={quiz}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    alignItems: "center",
                    backgroundColor:
                      index === idx &&
                      cekJawab(allJawab[index].user_answer) === true
                        ? "#16a34a"
                        : index === idx &&
                          cekJawab(allJawab[index].user_answer) === false
                        ? "#b91c1c"
                        : cekJawab(allJawab[index].user_answer) === false
                        ? "#f87171"
                        : "#4ade80",
                    width: Dimensions.get("screen").width / 4.8,
                    borderRadius: 10,
                  }}
                  disabled={index === idx ? true : false}
                  // bg={
                  //   index === idx && allJawab[index].user_answer[0] !== -1
                  //     ? "success.400"
                  //     : index === idx && allJawab[index].user_answer[0] === -1
                  //     ? "red.400"
                  //     : allJawab[index].user_answer[0] === -1
                  //     ? "red.200"
                  //     : "success.200"
                  // }
                  // _pressed={{
                  //   bg:
                  //     index === idx && allJawab[index].user_answer[0] !== -1
                  //       ? "success.300"
                  //       : index === idx && allJawab[index].user_answer[0] === -1
                  //       ? "red.300"
                  //       : allJawab[index].user_answer[0] === -1
                  //       ? "red.100"
                  //       : "success.100",
                  // }}

                  onPress={() => {
                    setIndex(index);

                    setShowModal(false);
                  }}
                >
                  <Text
                    color={
                      index === idx &&
                      cekJawab(allJawab[index].user_answer) === true
                        ? "success.100"
                        : index === idx &&
                          cekJawab(allJawab[index].user_answer) === false
                        ? "red.100"
                        : cekJawab(allJawab[index].user_answer) === false
                        ? "red.100"
                        : "success.100"
                    }
                  >
                    {index + 1}.{" "}
                    {cekJawab(allJawab[index].user_answer) === true &&
                    item.tipe === "PBS" ? (
                      options[allJawab[index].user_answer[0]]
                    ) : cekJawab(allJawab[index].user_answer) === true &&
                      item.tipe !== "PBS" ? (
                      <AntDesign name="check" color="white" />
                    ) : (
                      "-"
                    )}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Tutup
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default LihatSoal;

import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Text,
  NativeBaseProvider,
  View,
} from "native-base";
import { useState } from "react";
import { FlatGrid } from "react-native-super-grid";

const LihatSoal = (props) => {
  const { quiz, idx, setIndex } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      <Button
        bg={"amber.400"}
        borderRadius={15}
        size={"sm"}
        padding={3}
        onPress={() => setShowModal(true)}
      >
        <Text bold>Lihat Soal</Text>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text bold fontSize={17}>
              Lihat Soal
            </Text>
          </Modal.Header>
          <Modal.Body>
            <FlatGrid
              itemDimension={75}
              spacing={4}
              itemContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              item
              data={quiz}
              renderItem={({ item, index }) => (
                <Button
                  disabled={index === idx ? true : false}
                  colorScheme={index === idx ? "success" : "gray"}
                  width={20}
                  onPress={() => {
                    setIndex(index);
                    setShowModal(false);
                  }}
                >
                  {index + 1}
                </Button>
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

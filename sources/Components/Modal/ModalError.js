import React from "react";
import { Button, Modal, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import serverDown from "../../../assets/Images/helper/server_down.png";
import { Image } from "react-native";
export const ModalError = (props) => {
  const navigation = useNavigation();
  const { showModal, onClose, title } = props;
  return (
    <>
      <Modal avoidKeyboard isOpen={showModal} onClose={() => onClose(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body
            bg={"white"}
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 250,
                height: 180,
                marginBottom: 10,
                borderRadius: 15,
              }}
              source={serverDown}
            />
            <Text>Terjadi kesalahan saat memproses data</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onClose(false);
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ModalError;

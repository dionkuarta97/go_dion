import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  HStack,
  Text,
  Box,
  Image,
  Modal,
  Button,
  Center,
  View,
  VStack,
} from "native-base";
import { Dimensions } from "react-native";
const LeaderboardCard = (props) => {
  const { data, from, position } = props;
  const [showModal, setShowModal] = useState(false);
  const checkMyPostion = (satu, dua) => {
    if (satu === dua) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Detail</Modal.Header>
          <Modal.Body>
            <Center>
              <Image
                size={50}
                borderRadius={500}
                source={{
                  uri: "https://corbetonreadymix.com/wp-content/uploads/2021/09/2-1.jpg",
                }}
                alt="Alternate Text"
              />
              <Box paddingX={5}>
                <Text textAlign={"center"}>{data.name}</Text>
              </Box>
            </Center>
            <View
              borderBottomWidth={1}
              marginTop={2}
              borderBottomColor={"gray.400"}
            />
            <VStack marginTop={5} space={1} alignItems="center">
              <Center>
                <Text>{data.provinsi}</Text>
              </Center>
              <Center>
                <Text>{data.kota}</Text>
              </Center>
              <Center>
                <Text>{data.sekolah}</Text>
              </Center>
            </VStack>
            ;
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
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Box
          bg={
            !from && data.position === 1
              ? "amber.100"
              : !from && data.position === 2
              ? "success.100"
              : !from && data.position === 3
              ? "info.200"
              : from && checkMyPostion(position, data.position)
              ? "error.400"
              : "white"
          }
          marginBottom={4}
          borderRadius={5}
          shadow={2}
          padding={5}
        >
          <HStack alignItems={"center"}>
            <Text marginRight={Dimensions.get("screen").width / 13} bold>
              {data.position}
            </Text>
            <Image
              marginRight={Dimensions.get("screen").width / 15}
              size={50}
              borderRadius={500}
              source={{
                uri: "https://corbetonreadymix.com/wp-content/uploads/2021/09/2-1.jpg",
              }}
              alt="Alternate Text"
            />
            <Box
              marginRight={"auto"}
              maxWidth={Dimensions.get("screen").width / 3}
            >
              <Text>{data.name}</Text>
            </Box>

            <Text bold>{data.point}</Text>
          </HStack>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default LeaderboardCard;

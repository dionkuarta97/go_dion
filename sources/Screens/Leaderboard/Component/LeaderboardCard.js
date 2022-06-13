import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  HStack,
  Text,
  Box,
  Modal,
  Button,
  Center,
  View,
  VStack,
} from "native-base";
import { Dimensions, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import ImageView from "react-native-image-viewing";
import defaultImage from "../../../../assets/Images/user_profile/no-user.jpg";
import Colors from "../../../Theme/Colors";
const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;
const LeaderboardCard = (props) => {
  const [visible, setIsVisible] = useState(false);
  const { data, from, position, length, idx, loading } = props;
  const [showModal, setShowModal] = useState(false);
  const checkMyPostion = (satu, dua) => {
    if (satu === dua) {
      return true;
    }
    return false;
  };

  const singkatNama = (str) => {
    if (str !== undefined) {
      if (str.length > 13) {
        return str.substr(0, 13) + "...";
      }
    }

    return str;
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Detail</Modal.Header>
          <Modal.Body>
            <Center>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image
                  style={{
                    height: 80.0,
                    width: 80.0,
                    borderRadius: 100.0,
                  }}
                  source={{ uri: data.avatar ? data.avatar : DEFAULT_IMAGE }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <ImageView
                images={[
                  {
                    uri: data.avatar ? data.avatar : DEFAULT_IMAGE,
                  },
                ]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
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
              style={{
                marginRight: Dimensions.get("screen").width / 15,
                height: 50.0,
                width: 50.0,
                borderRadius: 100.0,
              }}
              source={{ uri: data.avatar ? data.avatar : DEFAULT_IMAGE }}
              resizeMode="contain"
            />
            <Box
              marginRight={"auto"}
              maxWidth={Dimensions.get("screen").width / 2.8}
            >
              <Text>{singkatNama(data.name)}</Text>
            </Box>

            <Text bold>
              {Number(data.point)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>
          </HStack>
        </Box>
      </TouchableOpacity>
      {length - 1 === idx && (
        <View
          style={{
            maxHeight: 120,
            minHeight: 120,
            marginBottom: 200,
            paddingTop: 20,
            width: Dimensions.get("screen").width,
          }}
        >
          {loading && (
            <ActivityIndicator color={Colors.orangeColor} size={30} />
          )}
        </View>
      )}
    </>
  );
};

export default LeaderboardCard;

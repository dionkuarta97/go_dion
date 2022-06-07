import { Button, Center, VStack, Text, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import { uploadFoto } from "../../../Redux/Auth/authActions";
import { Platform, Image, TouchableOpacity } from "react-native";

import ImageView from "react-native-image-viewing";
import defaultImage from "../../../../assets/Images/user_profile/no-user.jpg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;

const GantiFotoContent = (props) => {
  const bawaan = props.poto;
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [poto, setPoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      cropping: true,
    }).then((image) => {
      console.log(JSON.stringify(image, null, 2));
      setPoto({
        uri: Platform.OS === "ios" ? `file:///${image.path}` : image.path,
        type: image.mime,
        name: "dion.jpg",
      });
      setImage(image);
    });
  };

  useEffect(() => {
    if (!loading && success) {
      navigation.navigate("MainScreen", {
        from: "gantiFoto",
      });
    }
  }, [loading]);

  return (
    <Center>
      {loading ? (
        <View marginTop={150}>
          <Text>Loading. . . .</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              style={{
                marginTop: 50,
                height: 150.0,
                width: 150.0,
                borderRadius: 150.0,
              }}
              source={{ uri: !poto ? bawaan : poto.uri }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ImageView
            images={[
              {
                uri: !poto ? bawaan : poto.uri,
              },
            ]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <VStack marginTop={10} space={2}>
            <Button colorScheme="success" onPress={handleChoosePhoto}>
              Pilih Foto
            </Button>
            <Button
              variant={"solid"}
              isDisabled={!image ? true : false}
              colorScheme="amber"
              onPress={() => {
                const date = new Date();
                const data = new FormData();

                data.append("avatar", {
                  uri:
                    Platform.OS === "ios"
                      ? `file:///${image.path}`
                      : image.path,
                  type: image.mime,
                  name: date + ".jpg",
                });

                setLoading(true);
                dispatch(uploadFoto(data))
                  .then((data) => {
                    setSuccess(data);
                    console.log(JSON.stringify(data, null, 2));
                    setLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(err.message);
                  });
              }}
            >
              Simpan Foto
            </Button>
          </VStack>
        </>
      )}
    </Center>
  );
};

export default GantiFotoContent;

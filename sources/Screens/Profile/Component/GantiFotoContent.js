import { Button, Center, VStack, Text, View, useToast } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch } from "react-redux";
import { uploadFoto } from "../../../Redux/Auth/authActions";
import { Platform, Image, TouchableOpacity, Dimensions } from "react-native";

import ImageView from "react-native-image-viewing";
import defaultImage from "../../../../assets/Images/user_profile/no-user.jpg";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
const DEFAULT_IMAGE = Image.resolveAssetSource(defaultImage).uri;

const GantiFotoContent = (props) => {
   const bawaan = props.poto;
   const toast = useToast();
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
         navigation.navigate("ProfileScreen");
         toast.show({
            title: "Berhasil",
            status: "success",
            description: "Avatar berhasil diganti",
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
         });
      }
      if (!loading && error) {
         navigation.navigate("ProfileScreen");
         toast.show({
            title: "Gagal",
            status: "error",
            description: "Terjadi keselahan dari server",
            placement: "top",
            width: Dimensions.get("screen").width / 1.3,
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
                        height: 200.0,
                        width: 200.0,
                        borderRadius: 200.0,
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
               <VStack
                  marginTop={10}
                  space={2}
               >
                  <Button
                     colorScheme="success"
                     width={150}
                     onPress={handleChoosePhoto}
                  >
                     Pilih Foto
                  </Button>
                  {image && (
                     <Button
                        width={150}
                        variant={"solid"}
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
                              })
                              .catch((err) => {
                                 setError(err.message);
                              })
                              .finally(() => setLoading(false));
                        }}
                     >
                        Gunakan Foto
                     </Button>
                  )}
               </VStack>
            </>
         )}
      </Center>
   );
};

export default GantiFotoContent;

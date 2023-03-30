import React, { useState, useRef } from "react";
import {
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";
import { Center, Heading, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

const MateriVideoScreen = (props) => {
   const [selectedVideo, setselectedVideo] = useState(0);
   const navigation = useNavigation();
   const videos = props.route.params.videos;

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultAppBar
            title="Video List"
            backEnabled={true}
         />
         {videos.length > 0 ? (
            <View style={{ flex: 1 }}>
               <Center marginTop={5}>
                  <Heading>List Video</Heading>
               </Center>

               <VStack
                  paddingX={20}
                  paddingTop={10}
               >
                  {videos.map((video, index) => (
                     <TouchableOpacity
                        style={{
                           borderBottomWidth: 1,
                           marginBottom: 10,
                        }}
                        key={`video${index}`}
                        onPress={() => {
                           navigation.navigate("TestVideo", {
                              video: videos[index],
                           });
                        }}
                     >
                        <Text style={{ fontSize: 18 }}>{`Video ${
                           index + 1
                        }`}</Text>
                     </TouchableOpacity>
                  ))}
               </VStack>
            </View>
         ) : (
            <EmptyIndicator />
         )}
      </SafeAreaView>
   );
};

export default MateriVideoScreen;

const styles = StyleSheet.create({
   videoFrame: {
      aspectRatio: 16 / 9,
      backgroundColor: "black",
   },
});

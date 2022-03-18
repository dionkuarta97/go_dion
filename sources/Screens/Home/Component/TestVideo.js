import { Center, Heading } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import { Video } from "expo-av";
const TestVideo = () => {
  return (
    <>
      <Center>
        <Heading>Testing</Heading>
      </Center>
      <Video
        useNativeControls={true}
        style={styles.videoFrame}
        useNativeControls
        source={{
          uri: "https://videodelivery.net/e70c304f701e6edd557ed928a5dd827a/manifest/video.m3u8",
        }}
        isLooping={true}
        resizeMode="contain"
      />
    </>
  );
};

const styles = StyleSheet.create({
  videoFrame: {
    aspectRatio: 16 / 9,
    backgroundColor: "black",
  },
});

export default TestVideo;

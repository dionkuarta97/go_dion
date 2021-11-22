import React, {useState, useRef} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {Video} from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import EmptyIndicator from "../../Components/Indicator/EmptyIndicator";

const MateriVideoScreen = (props) => {
    const [selectedVideo, setselectedVideo] = useState(0);
    const videos = props.route.params.videos;
    const videoRef = useRef(null);

    console.log(videos[selectedVideo]);

    const onFullscreenUpdate = async ({fullscreenUpdate}) => {
        switch (fullscreenUpdate) {
            case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
                await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.LANDSCAPE
                );
                // await ScreenOrientation.unlockAsync();
                break;
            case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
                // await ScreenOrientation.unlockAsync();

                await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT
                );
                break;
        }
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar title="Video List" backEnabled={true} />
            {videos.length > 0 ? (
                <View style={{flex: 1}}>
                    <View>
                        <Video
                            useNativeControls={true}
                            ref={videoRef}
                            style={styles.videoFrame}
                            source={{
                                uri: videos[selectedVideo],
                            }}
                            isLooping={true}
                            resizeMode="contain"
                            onFullscreenUpdate={onFullscreenUpdate}
                        />
                        <View
                            style={{
                                paddingHorizontal: Sizes.fixPadding,
                                paddingVertical: Sizes.fixPadding * 2,
                            }}
                        >
                            <Text
                                style={{...Fonts.black15Bold}}
                            >{`Playing Video ${selectedVideo + 1}`}</Text>
                        </View>
                    </View>
                    <View>
                        {videos.map((video, index) => (
                            <TouchableOpacity
                                key={`video${index}`}
                                onPress={() => setselectedVideo(index)}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        padding: Sizes.fixPadding,
                                    }}
                                >
                                    <Text>{`Video ${index + 1}`}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
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

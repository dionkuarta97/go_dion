import React from "react";
import {View, Text, TouchableOpacity, SafeAreaView, Image} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";

const ProfileEditScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <DefaultAppBar
                title="Edit Profile"
                backEnabled={true}
                rightItem={
                    <TouchableOpacity>
                        <MaterialIcons name="save" size={28} color="black" />
                    </TouchableOpacity>
                }
            />
            <View
                style={{
                    flex: 1,
                    paddingVertical: Sizes.fixPadding * 3,
                    paddingHorizontal: Sizes.fixPadding * 2,
                }}
            >
                <View style={{width: "100%", flex: 1}}>
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding,
                        }}
                    >
                        <Image
                            style={{width: 120, height: 120, borderRadius: 60}}
                            source={require("../../../assets/Images/user_profile/user_2.jpg")}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={{...Fonts.black17Bold}}>Detail Info</Text>
                    <DefaultTextInput
                        placeholder="Email"
                        onChangeText={(value) => {}}
                    />
                    <DefaultTextInput
                        placeholder="Full Name"
                        onChangeText={(value) => {}}
                    />
                    <DefaultTextInput
                        placeholder="Phone Number"
                        onChangeText={(value) => {}}
                    />
                    <DefaultTextInput
                        placeholder="Class Level"
                        onChangeText={(value) => {}}
                    />
                    <Text style={{...Fonts.black17Bold}}>Wali Info</Text>
                    <DefaultTextInput
                        placeholder="Wali Email"
                        onChangeText={(value) => {}}
                    />
                    <DefaultTextInput
                        placeholder="Wali Full Name"
                        onChangeText={(value) => {}}
                    />
                    <DefaultTextInput
                        placeholder="Wali Phone Number"
                        onChangeText={(value) => {}}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileEditScreen;

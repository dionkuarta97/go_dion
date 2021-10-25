import React from "react";
import {Image, Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/core";

const ProfileContent = () => {
    const navigation = useNavigation();
    const renderInfoTile = (lable, value, icon) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: Sizes.fixPadding * 2,
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{...Fonts.black17Bold}}>{lable}</Text>
                    <Text
                        style={{
                            ...Fonts.gray15Bold,
                            marginTop: Sizes.fixPadding / 2,
                        }}
                    >
                        {value}
                    </Text>
                </View>
                <MaterialIcons name={icon} size={28} color="gray" />
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: Sizes.fixPadding * 2,
                paddingVertical: Sizes.fixPadding * 3,
                alignItems: "center",
            }}
        >
            <Image
                style={{width: 120, height: 120, borderRadius: 60}}
                source={require("../../../../assets/Images/user_profile/user_2.jpg")}
                resizeMode="contain"
            />
            <Text style={{...Fonts.black19Bold, marginTop: Sizes.fixPadding}}>
                Rifqi Radifan
            </Text>

            <View
                style={{
                    alignItems: "flex-start",
                    marginTop: Sizes.fixPadding * 3,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate("ProfileEditScreen")}
                >
                    <Text
                        style={{
                            ...Fonts.gray18Bold,
                            marginBottom: Sizes.fixPadding * 2,
                        }}
                    >
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                {renderInfoTile("Email", "emailku@gmail.com", "email")}
                {renderInfoTile("Phone Number", "081341377912", "phone")}
                {renderInfoTile("Class Level", "7", "class")}
                {renderInfoTile("Wali Name", "Michael Boston", "person")}
                {renderInfoTile(
                    "Wali Email",
                    "michaelboston@email.com",
                    "email"
                )}
                {renderInfoTile("Wali Phone Number", "0813213123", "phone")}
            </View>
        </View>
    );
};

export default ProfileContent;

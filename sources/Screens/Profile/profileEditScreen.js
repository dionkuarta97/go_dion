import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import OnTapTextInput from "../../Components/CustomTextInput/OnTapTextInput";
import RoleBottomSheet from "../../Components/BottomSheet/RoleBottomSheet";
import KelasBottomSheet from "../../Components/BottomSheet/KelasBottomSheet";
import CityBottomSheet from "../../Components/BottomSheet/CityBottomSheet";
import ProvinceBottomSheet from "../../Components/BottomSheet/ProvinceBottomSheet";
import SchoolBottomSheet from "../../Components/BottomSheet/SchoolBottomSheet";
import {
    getUpdateProfile,
    setUpdateProfile,
} from "../../Redux/Profile/profileActions";
import LoadingModal from "../../Components/Modal/LoadingModal";
import DefaultModal from "../../Components/Modal/DefaultModal";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";

const ProfileEditScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const profile = props.route.params.profile;
    const update = useSelector((state) => state.profileReducer.updateProfile);

    const [classBottomSheetVisible, setClassBottomSheetVisible] =
        useState(false);
    const [roleBottomeSheetVisible, setRoleBottomeSheetVisible] =
        useState(false);
    const [provinceBottomSheetVisible, setProvinceBottomSheetVisible] =
        useState(false);
    const [cityBottomSheetVisible, setCityBottomSheetVisible] = useState(false);
    const [
        schoolProvinceBottomSheetVisible,
        setSchoolProvinceBottomSheetVisible,
    ] = useState(false);
    const [schoolCityBottomSheetVisible, setSchoolCityBottomSheetVisible] =
        useState(false);
    const [schoolNameBottomSheetVisible, setSchoolNameBottomSheetVisible] =
        useState(false);

    //Start: State for Form
    const [email, setEmail] = useState(profile.email);
    const [name, setName] = useState(profile.full_name);
    const [phone, setPhone] = useState(profile.phone);
    const [role, setRole] = useState(profile.role);
    const [kelas, setKelas] = useState(profile.kelas);

    const [province, setProvince] = useState({
        idprovinsi: null,
        provinsi: profile.provinsi,
    });
    const [city, setCity] = useState({
        idkabkota: null,
        kabkota: profile.kota,
    });
    const [address, setAddress] = useState(profile.alamat);

    const [schoolProvince, setSchoolProvince] = useState({
        idprovinsi: null,
        provinsi: profile.provinsi_sekolah,
    });
    const [schoolCity, setSchoolCity] = useState({
        idkabkota: null,
        kabkota: profile.kota_sekolah,
    });
    const [schoolName, setSchoolName] = useState(profile.sekolah);

    const [waliName, setWaliName] = useState(profile.nama_wali);
    const [waliPhone, setWaliPhone] = useState(profile.phone_wali);
    const [waliEmail, setWaliEmail] = useState(profile.email_wali);
    //End: State for Form

    useLayoutEffect(() => {
        dispatch(setUpdateProfile({ loading: false, data: null, error: null }));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultAppBar
                title="Edit Profile"
                backEnabled={true}
                rightItem={
                    <TouchableOpacity
                        onPress={() => {
                            const bodyParams = JSON.stringify({
                                email: email,
                                full_name: name,
                                kelas: kelas,
                                role: role,
                                phone: phone,
                                provinsi:
                                    province !== null ? province.provinsi : "",
                                kota: city !== null ? city.kabkota : "",
                                alamat: address,
                                provinsi_sekolah:
                                    schoolProvince !== null
                                        ? schoolProvince.provinsi
                                        : "",
                                kota_sekolah:
                                    schoolCity !== null
                                        ? schoolCity.kabkota
                                        : "",
                                sekolah: schoolName,
                                nama_wali: waliName,
                                email_wali: waliEmail,
                                phone_wali: waliPhone,
                            });
                            console.log(bodyParams);
                            dispatch(getUpdateProfile(bodyParams));
                        }}
                    >
                        <MaterialIcons name="save" size={28} color="black" />
                    </TouchableOpacity>
                }
            />
            <ScrollView
                style={{
                    flex: 1,
                    paddingVertical: Sizes.fixPadding * 3,
                    paddingHorizontal: Sizes.fixPadding * 2,
                }}
            >
                <View style={{ width: "100%", flex: 1 }}>
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: Sizes.fixPadding,
                        }}
                    >
                        {/* <Image
                            style={{width: 120, height: 120, borderRadius: 60}}
                            source={require("../../../assets/Images/user_profile/user_2.jpg")}
                            resizeMode="contain"
                        /> */}
                    </View>
                    <Text style={{ ...Fonts.black17Bold }}>Detail Info</Text>
                    <DefaultTextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <DefaultTextInput
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <DefaultTextInput
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <OnTapTextInput
                        placeholder="Role"
                        value={role}
                        onTap={() => setRoleBottomeSheetVisible(true)}
                    />

                    {roleBottomeSheetVisible && (
                        <RoleBottomSheet
                            onClose={() => setRoleBottomeSheetVisible(false)}
                            onSelect={(val) => {
                                setRole(val);
                                setRoleBottomeSheetVisible(false);
                            }}
                        />
                    )}

                    <OnTapTextInput
                        placeholder="Class Level"
                        value={kelas}
                        onTap={() => {
                            console.log("Tap Kelas");
                            setClassBottomSheetVisible(true);
                        }}
                    />

                    {classBottomSheetVisible && (
                        <KelasBottomSheet
                            onClose={() => setClassBottomSheetVisible(false)}
                            onSelect={(val) => {
                                setKelas(val);
                                setClassBottomSheetVisible(false);
                            }}
                        />
                    )}

                    <Text
                        style={{
                            ...Fonts.black17Bold,
                            marginTop: Sizes.fixPadding,
                        }}
                    >
                        Address Info
                    </Text>
                    <OnTapTextInput
                        placeholder="Province"
                        value={province !== null ? province.provinsi : ""}
                        onTap={() => {
                            console.log("Tap Kelas");
                            setProvinceBottomSheetVisible(true);
                        }}
                    />
                    {provinceBottomSheetVisible && (
                        <ProvinceBottomSheet
                            onClose={() => setProvinceBottomSheetVisible(false)}
                            onSelect={(value) => {
                                setProvinceBottomSheetVisible(false);
                                setProvince(value);
                            }}
                        />
                    )}

                    <OnTapTextInput
                        placeholder="City"
                        value={city !== null ? city.kabkota : ""}
                        onTap={() => {
                            console.log("Tap Kelas");
                            setCityBottomSheetVisible(true);
                        }}
                    />
                    {cityBottomSheetVisible && (
                        <CityBottomSheet
                            idProvinsi={
                                province !== null &&
                                province.idprovinsi !== null
                                    ? province.idprovinsi.toString()
                                    : null
                            }
                            onClose={() => setCityBottomSheetVisible(false)}
                            onSelect={(value) => {
                                setCityBottomSheetVisible(false);
                                setCity(value);
                            }}
                        />
                    )}
                    <DefaultTextInput
                        placeholder="Address"
                        onChangeText={setAddress}
                    />

                    <Text
                        style={{
                            ...Fonts.black17Bold,
                            marginTop: Sizes.fixPadding,
                        }}
                    >
                        School Info
                    </Text>
                    <OnTapTextInput
                        placeholder="School Province"
                        value={
                            schoolProvince !== null
                                ? schoolProvince.provinsi
                                : ""
                        }
                        onTap={() => {
                            setSchoolProvinceBottomSheetVisible(true);
                        }}
                    />
                    {schoolProvinceBottomSheetVisible && (
                        <ProvinceBottomSheet
                            onClose={() =>
                                setSchoolProvinceBottomSheetVisible(false)
                            }
                            onSelect={(value) => {
                                setSchoolProvinceBottomSheetVisible(false);
                                setSchoolProvince(value);
                            }}
                        />
                    )}

                    <OnTapTextInput
                        placeholder="School City"
                        value={schoolCity !== null ? schoolCity.kabkota : ""}
                        onTap={() => {
                            setSchoolCityBottomSheetVisible(true);
                        }}
                    />
                    {schoolCityBottomSheetVisible && (
                        <CityBottomSheet
                            idProvinsi={
                                schoolProvince !== null &&
                                schoolProvince.idprovinsi !== null
                                    ? schoolProvince.idprovinsi.toString()
                                    : null
                            }
                            onClose={() =>
                                setSchoolCityBottomSheetVisible(false)
                            }
                            onSelect={(value) => {
                                setSchoolCityBottomSheetVisible(false);
                                setSchoolCity(value);
                            }}
                        />
                    )}

                    <OnTapTextInput
                        placeholder="School Name"
                        value={schoolName}
                        onTap={() => {
                            setSchoolNameBottomSheetVisible(true);
                        }}
                    />
                    {schoolNameBottomSheetVisible && (
                        <SchoolBottomSheet
                            idkabkota={
                                schoolCity !== null &&
                                schoolCity.idkabkota !== null
                                    ? schoolCity.idkabkota.toString()
                                    : null
                            }
                            onClose={() =>
                                setSchoolNameBottomSheetVisible(false)
                            }
                            onSelect={(value) => {
                                setSchoolNameBottomSheetVisible(false);
                                setSchoolName(value);
                            }}
                        />
                    )}

                    <Text
                        style={{
                            ...Fonts.black17Bold,
                            marginTop: Sizes.fixPadding,
                        }}
                    >
                        Wali Info
                    </Text>
                    <DefaultTextInput
                        placeholder="Wali Name"
                        value={waliEmail}
                        onChangeText={setWaliName}
                    />

                    <DefaultTextInput
                        placeholder="Wali Phone Number"
                        value={waliPhone}
                        onChangeText={setWaliPhone}
                    />

                    <DefaultTextInput
                        placeholder="Wali Email"
                        value={waliEmail}
                        onChangeText={setWaliEmail}
                    />
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>
            {update.loading && <LoadingModal />}
            {update.data !== null && (
                <DefaultModal>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2 }}>
                        Berhasil memperbarui data profile.
                    </Text>
                    <DefaultPrimaryButton
                        text="Kembali ke Halaman Profile"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </DefaultModal>
            )}
        </SafeAreaView>
    );
};

export default ProfileEditScreen;

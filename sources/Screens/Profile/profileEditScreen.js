import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultTextInput from "../../Components/CustomTextInput/DefaultTextInput";
import Fonts from "../../Theme/Fonts";
import Sizes from "../../Theme/Sizes";
import { useNavigation, useFocusEffect } from "@react-navigation/core";
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
import PasswordTextInput from "../../Components/CustomTextInput/PasswordTextInput";
import Colors from "../../Theme/Colors";
import {
  getCheckPassword,
  setCheckPassword,
} from "../../Redux/Auth/authActions";
import NewModalLoading from "../../Components/Modal/NewLoadingModal";
import { useToast } from "native-base";
import checkInternet from "../../Services/CheckInternet";
import ToastErrorContent from "../../Components/ToastErrorContent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { checkNomor, formatEmail } from "../../Services/helper";
import Analytics from "../../Services/goAnalytics";
import { EventAnalytic } from "../../Utils/event_analytic";

const ProfileEditScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const profile = props.route.params.profile;
  const update = useSelector((state) => state.profileReducer.updateProfile);
  const { checkPassword } = useSelector((state) => state.authReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [classBottomSheetVisible, setClassBottomSheetVisible] = useState(false);
  const [roleBottomeSheetVisible, setRoleBottomeSheetVisible] = useState(false);
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
  const listProvince = useSelector((state) => state.dataReducer.listProvince);
  const listCity = useSelector((state) => state.dataReducer.listCity);
  //Start: State for Form
  const [email, setEmail] = useState(profile.email);
  const [name, setName] = useState(profile.full_name);
  const [phone, setPhone] = useState(profile.phone);
  const [role, setRole] = useState(profile.role);
  const [kelas, setKelas] = useState(profile.kelas);

  const getIdProfinsi = (provinsi) => {
    const id = listProvince.data?.filter(
      (value) => value.provinsi === provinsi
    );
    if (id !== undefined) return id[0]?.idprovinsi;
  };

  const getIdProfinsiSchool = (provinsi) => {
    const id = listProvince.data?.filter(
      (value) => value.provinsi === provinsi
    );
    if (id !== undefined) return id[0]?.idprovinsi;
  };

  const getIdKabKota = (city) => {
    const id = listCity.data?.filter((value) => value.kabkota === city);

    if (id !== undefined) return id[0]?.idkabkota;
  };

  const getIdKabKotaSchool = (city) => {
    const id = listCity.data?.filter((value) => value.kabkota === city);
    if (id !== undefined) return id[0]?.idkabkota;
  };

  const [province, setProvince] = useState({});
  const [city, setCity] = useState({});

  const [address, setAddress] = useState(profile.alamat);

  const [schoolProvince, setSchoolProvince] = useState({});
  const [schoolCity, setSchoolCity] = useState({});
  const [schoolName, setSchoolName] = useState(profile.sekolah);

  const [waliName, setWaliName] = useState(profile.nama_wali);
  const [waliPhone, setWaliPhone] = useState(profile.phone_wali);
  const [waliEmail, setWaliEmail] = useState(profile.email_wali);
  const [oldPassword, setOldpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  //End: State for Form

  function passwordValidation(text) {
    if (text.length < 8)
      return "Password minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka";
    if (!text.match(new RegExp("[A-Z]")))
      return "Password harus mengandung huruf besar, huruf kecil, dan angka";
    if (!text.match(new RegExp("[a-z]")))
      return "Password harus mengandung huruf kecil dan angka";
    if (text.search(/[0-9]/) < 0) {
      return "Password harus mengandung angka";
    }
    return null;
  }

  function phoneNumberValidation(int) {
    if (isNaN(int)) {
      return "Nomor telepon harus angka";
    }
    return null;
  }

  const handlePress = () => {
    checkInternet().then((data) => {
      if (data) {
        dispatch(
          getCheckPassword({ username: profile.email, password: oldPassword })
        );
      } else {
        toast.show({
          placement: "top",
          duration: null,
          width: Dimensions.get("screen").width / 1.3,
          render: () => {
            return (
              <ToastErrorContent
                content="Kamu tidak terhubung ke internet"
                onPress={() => {
                  toast.closeAll();
                  navigation.goBack();
                }}
              />
            );
          },
        });
      }
    });
  };

  const emailValidate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return "Format email kamu salah";
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (checkPassword.loading === true) {
      setModalVisible(true);
    } else {
      setTimeout(() => setModalVisible(false), 1000);
    }
  }, [checkPassword]);
  useFocusEffect(
    useCallback(() => {
      dispatch(setCheckPassword({ valid: false, loading: false, error: null }));
    }, [])
  );
  useLayoutEffect(() => {
    dispatch(setUpdateProfile({ loading: false, data: null, error: null }));
    setProvince({
      idprovinsi: getIdProfinsi(profile.provinsi),
      provinsi: profile.provinsi,
    });
    setSchoolProvince({
      idprovinsi: getIdProfinsiSchool(profile.provinsi_sekolah),
      provinsi: profile.provinsi_sekolah,
    });
    setCity({
      idkabkota: getIdKabKota(profile.kota),
      kabkota: profile.kota,
    });

    setSchoolCity({
      idkabkota: getIdKabKotaSchool(profile.kota_sekolah),
      kabkota: profile.kota_sekolah,
    });
  }, []);

  useEffect(() => {
    if (update.data) {

      /** send analytic: update profile */
      Analytics.logCustomEvent(EventAnalytic.GoProfileEdit)
      
      dispatch(setUpdateProfile({ data: null, loading: false, error: null }));
      toast.show({
        title: "Berhasil",
        status: "success",
        description: "Berhasil memperbarui profil",
        placement: "top",
        width: Dimensions.get("screen").width / 1.3,
      });
      navigation.goBack();
    }
    if (update.error) {
      Alert.alert("error", update.error, [
        {
          text: "OKE",
          onPress: () => {
            dispatch(
              setUpdateProfile({ data: null, loading: false, error: null })
            );
            navigation.goBack();
          },
        },
      ]);
    }
  }, [update]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DefaultAppBar
        title="Ubah Profil"
        backEnabled={true}
        rightItem={
          <TouchableOpacity
            onPress={() => {
              checkInternet().then((data) => {
                if (data) {
                  if (
                    email !== "" &&
                    name !== "" &&
                    checkNomor(phone) &&
                    address !== "" &&
                    waliName !== "" &&
                    kelas !== null &&
                    province !== null &&
                    city !== null &&
                    schoolProvince !== null &&
                    schoolCity !== null &&
                    schoolName !== null &&
                    formatEmail(waliEmail) &&
                    checkNomor(waliPhone)
                  ) {
                    let data = {
                      email: email,
                      full_name: name,
                      kelas: kelas,
                      role: role,
                      phone: phone,
                      provinsi: province !== null ? province.provinsi : "",
                      kota: city !== null ? city.kabkota : "",
                      alamat: address,
                      provinsi_sekolah:
                        schoolProvince !== null ? schoolProvince.provinsi : "",
                      kota_sekolah:
                        schoolCity !== null ? schoolCity.kabkota : "",
                      sekolah: schoolName,
                      nama_wali: waliName,
                      email_wali: waliEmail,
                      phone_wali: waliPhone,
                      program_studi: profile.program_studi,
                    };

                    const bodyParams = JSON.stringify(data);
                    dispatch(getUpdateProfile(bodyParams));
                  } else {
                    Alert.alert(
                      "Peringatan",
                      "Masih ada informasi salah format/atau kosong. Silakan periksa kembali informasi anda"
                    );
                  }
                } else {
                  toast.show({
                    placement: "top",
                    duration: null,
                    width: Dimensions.get("screen").width / 1.3,
                    render: () => {
                      return (
                        <ToastErrorContent
                          content="Kamu tidak terhubung ke internet"
                          onPress={() => {
                            toast.closeAll();
                            navigation.goBack();
                          }}
                        />
                      );
                    },
                  });
                }
              });
            }}
          >
            <MaterialIcons name="save" size={28} color="black" />
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView>
        <ScrollView
          style={{
            flex: 1,
            paddingVertical: Sizes.fixPadding * 3,
            paddingHorizontal: Sizes.fixPadding * 2,
          }}
        >
          <NewModalLoading modalVisible={modalVisible} />
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
            <Text style={{ ...Fonts.black17Bold }}>
              Informasi Peserta Didik
            </Text>
            <DefaultTextInput
              disable={false}
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
              keyboardType="phone-pad"
              value={phone}
              nomor={true}
              valid={checkNomor(phone)}
              onChangeText={setPhone}
            />

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
                value={kelas}
                onSelect={(val) => {
                  setKelas(val);
                  console.log(val);
                  setSchoolName(null);
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
              Informasi Alamat
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
                  setCity(null);
                }}
              />
            )}

            <OnTapTextInput
              placeholder="City"
              value={city !== null ? city.kabkota : ""}
              onTap={() => {
                setCityBottomSheetVisible(true);
              }}
            />
            {cityBottomSheetVisible && (
              <CityBottomSheet
                idProvinsi={
                  province !== null && province?.idprovinsi !== null
                    ? province?.idprovinsi
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
              value={address}
              onChangeText={setAddress}
            />

            <Text
              style={{
                ...Fonts.black17Bold,
                marginTop: Sizes.fixPadding,
              }}
            >
              Informasi Sekolah
            </Text>
            <OnTapTextInput
              placeholder="School Province"
              value={schoolProvince !== null ? schoolProvince.provinsi : ""}
              onTap={() => {
                setSchoolProvinceBottomSheetVisible(true);
              }}
            />
            {schoolProvinceBottomSheetVisible && (
              <ProvinceBottomSheet
                onClose={() => setSchoolProvinceBottomSheetVisible(false)}
                onSelect={(value) => {
                  setSchoolProvinceBottomSheetVisible(false);
                  setSchoolProvince(value);
                  setSchoolCity(null);
                  setSchoolName(null);
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
                  schoolProvince !== null && schoolProvince?.idprovinsi !== null
                    ? schoolProvince?.idprovinsi
                    : null
                }
                onClose={() => setSchoolCityBottomSheetVisible(false)}
                onSelect={(value) => {
                  setSchoolCityBottomSheetVisible(false);
                  setSchoolCity(value);
                  setSchoolName(null);
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
                kelas={
                  Number(kelas.split(" ")[0] > 0 && kelas.split(" ")[0] < 7)
                    ? "SD"
                    : kelas.split(" ")[0] > 9
                    ? "SMA"
                    : "SMP"
                }
                idkabkota={
                  schoolCity !== null && schoolCity?.idkabkota !== null
                    ? schoolCity?.idkabkota
                    : null
                }
                onClose={() => setSchoolNameBottomSheetVisible(false)}
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
              Informasi Wali
            </Text>
            <DefaultTextInput
              placeholder="Wali Name"
              autoCapitalize="words"
              value={waliName}
              onChangeText={setWaliName}
            />

            <DefaultTextInput
              placeholder="Wali Phone Number"
              keyboardType="phone-pad"
              value={waliPhone}
              nomor={true}
              valid={checkNomor(waliPhone)}
              onChangeText={setWaliPhone}
            />

            <DefaultTextInput
              placeholder="Wali Email"
              nomor={true}
              valid={formatEmail(waliEmail)}
              value={waliEmail}
              onChangeText={setWaliEmail}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      {update.loading && <LoadingModal />}
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: Dimensions.get("screen").width / 1.7,
    backgroundColor: Colors.ligthGreyColor,
    paddingVertical: Sizes.fixPadding + 5.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import Colors from "../../../Theme/Colors";
import OnTapTextInput from "../../../Components/CustomTextInput/OnTapTextInput";
import DefaultBottomSheet from "../../../Components/BottomSheet/DefaultBottomSheet";
import { TextInput } from "react-native-gesture-handler";
import { FlatGrid } from "react-native-super-grid";
import ProvinceBottomSheet from "../../../Components/BottomSheet/ProvinceBottomSheet";
import CityBottomSheet from "../../../Components/BottomSheet/CityBottomSheet";
import RoleBottomSheet from "../../../Components/BottomSheet/RoleBottomSheet";
import KelasBottomSheet from "../../../Components/BottomSheet/KelasBottomSheet";
import SchoolBottomSheet from "../../../Components/BottomSheet/SchoolBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import { getRegister, setRegister } from "../../../Redux/Auth/authActions";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import checkInternet from "../../../Services/CheckInternet";

const RegisterContent = ({ sendedEmail }) => {
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

  //Start: State for Form
  const [email, setEmail] = useState(sendedEmail);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [kelas, setKelas] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState("");

  const [schoolProvince, setSchoolProvince] = useState(null);
  const [schoolCity, setSchoolCity] = useState(null);
  const [schoolName, setSchoolName] = useState("");

  const [waliName, setWaliName] = useState("");
  const [waliPhone, setWaliPhone] = useState("");
  const [waliEmail, setWaliEmail] = useState("");
  //End: State for Form

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const register = useSelector((state) => state.authReducer.register);
  const toast = useToast();
  useEffect(() => {
    dispatch(setRegister({ loading: false, data: null, error: null }));
  }, []);

  console.log(JSON.stringify(register, null, 2));
  const emailValidate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return "Format Email Anda Salah";
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (register.error) {
      toast.show({
        placement: "top",
        duration: 3000,
        width: Dimensions.get("screen").width / 1.2,
        render: () => {
          return <ToastErrorContent content={register.error} />;
        },
      });
    }
  }, [register]);

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
      return "Phone Number Must Numeric";
    }
    return null;
  }

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          paddingVertical: Sizes.fixPadding * 7.0,
          paddingHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View>
          <Text style={{ ...Fonts.black20Bold }}>Informasi Pendaftar</Text>

          <DefaultTextInput
            placeholder="Email"
            disable={false}
            value={email}
            onChangeText={setEmail}
          />

          <DefaultTextInput placeholder="Nama Lengkap" onChangeText={setName} />

          <DefaultTextInput
            keyboardType="numeric"
            placeholder="Nomor Telepon/HP"
            onChangeText={setPhone}
          />

          <OnTapTextInput
            placeholder="Peran"
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
            placeholder="Tingkatan Kelas"
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
                setSchoolName("--PILIH SEKOLAH--");
                setClassBottomSheetVisible(false);
              }}
            />
          )}

          <PasswordTextInput
            placeholder="Password"
            onChangeText={setPassword}
          />
          {passwordValidation(password) != null && (
            <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
              {passwordValidation(password)}
            </Text>
          )}
          <PasswordTextInput
            placeholder="Password (Ulangi)"
            onChangeText={setRepeatPassword}
          />
          {password !== repeatPassword && (
            <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
              Password tidak sama
            </Text>
          )}
        </View>

        <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
          <Text style={{ ...Fonts.black20Bold }}>Informasi Alamat</Text>

          <OnTapTextInput
            placeholder="Propinsi"
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
            placeholder="Kab/Kota"
            value={city !== null ? city.kabkota : ""}
            onTap={() => {
              console.log("Tap Kelas");
              setCityBottomSheetVisible(true);
            }}
          />
          {cityBottomSheetVisible && (
            <CityBottomSheet
              idProvinsi={
                province !== null ? province.idprovinsi.toString() : null
              }
              onClose={() => setCityBottomSheetVisible(false)}
              onSelect={(value) => {
                setCityBottomSheetVisible(false);
                setCity(value);
              }}
            />
          )}

          <DefaultTextInput placeholder="Alamat" onChangeText={setAddress} />
        </View>

        <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
          <Text style={{ ...Fonts.black20Bold }}>Alamat Sekolah</Text>

          <OnTapTextInput
            placeholder="Propinsi"
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
              }}
            />
          )}

          <OnTapTextInput
            placeholder="Kab/Kota"
            value={schoolCity !== null ? schoolCity.kabkota : ""}
            onTap={() => {
              setSchoolCityBottomSheetVisible(true);
            }}
          />
          {schoolCityBottomSheetVisible && (
            <CityBottomSheet
              idProvinsi={
                schoolProvince !== null
                  ? schoolProvince.idprovinsi.toString()
                  : null
              }
              onClose={() => setSchoolCityBottomSheetVisible(false)}
              onSelect={(value) => {
                setSchoolCityBottomSheetVisible(false);
                setSchoolCity(value);
              }}
            />
          )}

          <OnTapTextInput
            placeholder="Nama Sekolah"
            value={schoolName}
            onTap={() => {
              if (kelas === "") {
                toast.show({
                  title: "Peringatan",
                  status: "danger",
                  description: "Silahkan pilih kelas terlebih dahulu",
                  placement: "top",
                  width: Dimensions.get("screen").width / 1.3,
                });
              } else {
                setSchoolNameBottomSheetVisible(true);
              }
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
                schoolCity !== null ? schoolCity.idkabkota.toString() : null
              }
              onClose={() => setSchoolNameBottomSheetVisible(false)}
              onSelect={(value) => {
                setSchoolNameBottomSheetVisible(false);
                setSchoolName(value);
              }}
            />
          )}
        </View>

        <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
          <Text style={{ ...Fonts.black20Bold }}>Informasi Wali </Text>

          <DefaultTextInput
            placeholder="Nama Wali"
            autoCapitalize="words"
            onChangeText={setWaliName}
          />

          <DefaultTextInput
            placeholder="Nomor Telepon/HP Wali"
            keyboardType="numeric"
            onChangeText={setWaliPhone}
          />

          <DefaultTextInput
            placeholder="Email Wali"
            onChangeText={setWaliEmail}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <DefaultPrimaryButton
              text="Daftar"
              onPress={() => {
                checkInternet().then((connection) => {
                  if (connection) {
                    const bodyParams = JSON.stringify({
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
                      password: password,
                      password_comparison: repeatPassword,
                      nama_wali: waliName,
                      email_wali: waliEmail,
                      phone_wali: waliPhone,
                    });

                    dispatch(getRegister(bodyParams));
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
            />
          </View>
        </View>

        {register.loading && <LoadingModal />}
        {register.data !== null && (
          <DefaultModal>
            <Text style={{ marginBottom: Sizes.fixPadding * 2 }}>
              Berhasil Regitrasi.
            </Text>
            <Text style={{ marginBottom: Sizes.fixPadding * 2 }}>
              Cek email kamu untuk verikasi ya :)
            </Text>
            <DefaultPrimaryButton
              text="Kembali ke Halaman Login"
              onPress={() => {
                navigation.goBack();
                navigation.goBack();
              }}
            />
          </DefaultModal>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterContent;

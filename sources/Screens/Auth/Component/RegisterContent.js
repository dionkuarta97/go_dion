import React, { useEffect, useState } from "react";
import { Text, View, Alert, Dimensions } from "react-native";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fonts from "../../../Theme/Fonts";
import Sizes from "../../../Theme/Sizes";
import OnTapTextInput from "../../../Components/CustomTextInput/OnTapTextInput";

import ProvinceBottomSheet from "../../../Components/BottomSheet/ProvinceBottomSheet";
import CityBottomSheet from "../../../Components/BottomSheet/CityBottomSheet";
import KelasBottomSheet from "../../../Components/BottomSheet/KelasBottomSheet";
import SchoolBottomSheet from "../../../Components/BottomSheet/SchoolBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../../../Components/Modal/LoadingModal";
import DefaultModal from "../../../Components/Modal/DefaultModal";
import { getRegister, setRegister } from "../../../Redux/Auth/authActions";
import { useNavigation } from "@react-navigation/core";
import { Button, useToast } from "native-base";
import ToastErrorContent from "../../../Components/ToastErrorContent";
import checkInternet from "../../../Services/CheckInternet";
import { checkNomor, passwordValidations } from "../../../Services/helper";

const RegisterContent = ({ sendedEmail }) => {
  const [classBottomSheetVisible, setClassBottomSheetVisible] = useState(false);
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
  const [role, setRole] = useState("Siswa");
  const [kelas, setKelas] = useState(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState("");

  const [schoolProvince, setSchoolProvince] = useState(null);
  const [schoolCity, setSchoolCity] = useState(null);
  const [schoolName, setSchoolName] = useState(null);

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

  const formatEmail = (email) => {
    const emailReg = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.){1,2}[a-zA-Z]{2,}))$/
    );
    if (emailReg.test(email)) {
      return true;
    } else {
      return false;
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

  console.log(checkNomor(phone));

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

          <DefaultTextInput
            placeholder="Nama Lengkap"
            value={name}
            onChangeText={setName}
          />

          <DefaultTextInput
            keyboardType="numeric"
            placeholder="Nomor Telepon/HP"
            value={phone}
            nomor={true}
            valid={checkNomor(phone)}
            onChangeText={setPhone}
          />

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
              value={kelas}
              onSelect={(val) => {
                setKelas(val);
                setSchoolName(null);
                setClassBottomSheetVisible(false);
              }}
            />
          )}

          <PasswordTextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={passwordValidations(password).valid}
          />
          {passwordValidations(password).valid === false &&
            passwordValidations(password).error.map((val, idx) => (
              <Text
                key={idx}
                style={{ fontSize: 12, color: "red", opacity: 0.5 }}
              >
                - {val}
              </Text>
            ))}
          <PasswordTextInput
            placeholder="Password (Ulangi)"
            onChangeText={setRepeatPassword}
            value={
              password !== repeatPassword || repeatPassword === ""
                ? false
                : true
            }
          />
          {password !== repeatPassword && (
            <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
              - Password tidak sama
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
                setCity(null);
              }}
            />
          )}

          <OnTapTextInput
            placeholder="Kab/Kota"
            value={city !== null ? city.kabkota : ""}
            onTap={() => {
              console.log("Tap Kelas");
              if (province === null) {
                Alert.alert(
                  "Peringatan",
                  "Silakan memlih Propinsi terlebih dahulu"
                );
              } else {
                setCityBottomSheetVisible(true);
              }
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

          <DefaultTextInput
            value={address}
            placeholder="Alamat"
            onChangeText={setAddress}
          />
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
                setSchoolCity(null);
                setSchoolName(null);
              }}
            />
          )}

          <OnTapTextInput
            placeholder="Kab/Kota"
            value={schoolCity !== null ? schoolCity.kabkota : ""}
            onTap={() => {
              if (schoolProvince === null) {
                Alert.alert(
                  "Peringatan",
                  "Silakan memilih Propinsi terlebih dahulu"
                );
              } else {
                setSchoolCityBottomSheetVisible(true);
                setSchoolName(null);
              }
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
                if (schoolCity === null) {
                  Alert.alert(
                    "Peringatan",
                    "Silakan memilih Kab/Kota terlebih dahulu"
                  );
                } else {
                  setSchoolNameBottomSheetVisible(true);
                }
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
            value={waliName}
            onChangeText={setWaliName}
          />

          <DefaultTextInput
            placeholder="Nomor Telepon/HP Wali"
            keyboardType="numeric"
            value={waliPhone}
            nomor={true}
            valid={checkNomor(waliPhone)}
            onChangeText={setWaliPhone}
          />

          <DefaultTextInput
            placeholder="Email Wali"
            nomor={true}
            valid={formatEmail(waliEmail)}
            value={waliEmail}
            onChangeText={setWaliEmail}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Button
              bg={
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
                passwordValidations(password).valid &&
                password === repeatPassword &&
                formatEmail(waliEmail) &&
                checkNomor(waliPhone)
                  ? "amber.400"
                  : "amber.200"
              }
              _pressed={{ bg: "amber.300" }}
              disabled={
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
                passwordValidations(password).valid &&
                password === repeatPassword &&
                formatEmail(waliEmail) &&
                checkNomor(waliPhone)
                  ? false
                  : true
              }
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
            >
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: 8,
                  fontWeight: "bold",
                }}
              >
                Daftar
              </Text>
            </Button>
          </View>
        </View>

        {register.loading && <LoadingModal />}
        {register.data !== null && (
          <DefaultModal>
            <Text
              style={{
                marginBottom: Sizes.fixPadding * 0.2,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Berhasil Registrasi
            </Text>
            <Text
              style={{
                marginBottom: Sizes.fixPadding * 1,
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Cek email kamu untuk verifikasi ya :)
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

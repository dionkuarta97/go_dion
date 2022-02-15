import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";

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
        width: Dimensions.get("screen").width / 1.3,
        render: () => {
          return <ToastErrorContent content={register.error} />;
        },
      });
    }
  }, [register]);

  function passwordValidation(text) {
    if (text.length < 8)
      return "Password Harus Lebih Dari 8 Karakter, Mengandung Huruf Besar, Huruf Kecil & Angka";
    if (!text.match(new RegExp("[A-Z]")))
      return "Password Harus Mengandung Huruf Besar, Huruf Kecil & Angka";
    if (!text.match(new RegExp("[a-z]")))
      return "Password Harus Mengandung Huruf Kecil & Angka";
    if (text.search(/[0-9]/) < 0) {
      return "Password Harus Mengandung Angka";
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
    <View
      style={{
        paddingVertical: Sizes.fixPadding * 7.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
      }}
    >
      <View>
        <Text style={{ ...Fonts.black20Bold }}>Account Form</Text>

        <DefaultTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <DefaultTextInput placeholder="Full Name" onChangeText={setName} />

        <DefaultTextInput placeholder="Phone Number" onChangeText={setPhone} />

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

        <PasswordTextInput placeholder="Password" onChangeText={setPassword} />
        {passwordValidation(password) != null && (
          <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
            {passwordValidation(password)}
          </Text>
        )}
        <PasswordTextInput
          placeholder="Password Repeat"
          onChangeText={setRepeatPassword}
        />
        {password !== repeatPassword && (
          <Text style={{ fontSize: 12, color: "red", opacity: 0.5 }}>
            Password tidak sama
          </Text>
        )}
      </View>

      <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
        <Text style={{ ...Fonts.black20Bold }}>Address Form</Text>

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
              province !== null ? province.idprovinsi.toString() : null
            }
            onClose={() => setCityBottomSheetVisible(false)}
            onSelect={(value) => {
              setCityBottomSheetVisible(false);
              setCity(value);
            }}
          />
        )}

        <DefaultTextInput placeholder="Address" onChangeText={setAddress} />
      </View>

      <View style={{ marginTop: Sizes.fixPadding * 3.0 }}>
        <Text style={{ ...Fonts.black20Bold }}>School Form</Text>

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
          placeholder="School Name"
          value={schoolName}
          onTap={() => {
            setSchoolNameBottomSheetVisible(true);
          }}
        />
        {schoolNameBottomSheetVisible && (
          <SchoolBottomSheet
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
        <Text style={{ ...Fonts.black20Bold }}>Wali Info Form</Text>

        <DefaultTextInput placeholder="Wali Name" onChangeText={setWaliName} />

        <DefaultTextInput
          placeholder="Wali Phone Number"
          onChangeText={setWaliPhone}
        />

        <DefaultTextInput
          placeholder="Wali Email"
          onChangeText={setWaliEmail}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <DefaultPrimaryButton
            text="Submit"
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
                    kota_sekolah: schoolCity !== null ? schoolCity.kabkota : "",
                    sekolah: schoolName,
                    password: password,
                    nama_wali: waliName,
                    email_wali: waliEmail,
                    phone_wali: waliPhone,
                  });
                  if (waliEmail) {
                    if (emailValidate(waliEmail) !== null) {
                      toast.show({
                        placement: "top",
                        duration: 3000,
                        width: Dimensions.get("screen").width / 1.3,
                        render: () => {
                          return (
                            <ToastErrorContent
                              content={emailValidate(waliEmail)}
                            />
                          );
                        },
                      });
                    }
                  }
                  if (phoneNumberValidation(phone) !== null) {
                    toast.show({
                      placement: "top",
                      duration: 3000,
                      width: Dimensions.get("screen").width / 1.3,
                      render: () => {
                        return (
                          <ToastErrorContent
                            content={phoneNumberValidation(phone)}
                          />
                        );
                      },
                    });
                  } else if (emailValidate(email) !== null) {
                    toast.show({
                      placement: "top",
                      duration: 3000,
                      width: Dimensions.get("screen").width / 1.3,
                      render: () => {
                        return (
                          <ToastErrorContent content={emailValidate(email)} />
                        );
                      },
                    });
                  } else if (passwordValidation(password) !== null) {
                    toast.show({
                      placement: "top",
                      duration: 3000,
                      width: Dimensions.get("screen").width / 1.3,
                      render: () => {
                        return (
                          <ToastErrorContent
                            content={passwordValidation(password)}
                          />
                        );
                      },
                    });
                  } else if (waliPhone) {
                    if (phoneNumberValidation(waliPhone) !== null) {
                      toast.show({
                        placement: "top",
                        duration: 3000,
                        width: Dimensions.get("screen").width / 1.3,
                        render: () => {
                          return (
                            <ToastErrorContent
                              content={phoneNumberValidation(waliPhone)}
                            />
                          );
                        },
                      });
                    } else {
                      dispatch(getRegister(bodyParams));
                    }
                  } else {
                    dispatch(getRegister(bodyParams));
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
          />
        </View>
      </View>

      {register.loading && <LoadingModal />}
      {register.data !== null && (
        <DefaultModal>
          <Text style={{ marginBottom: Sizes.fixPadding * 2 }}>
            Berhasil Regitrasi, Cek email kamu untuk memverifikasi pembuatan
            akun.
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
  );
};

export default RegisterContent;

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import DefaultPrimaryButton from "../../Components/Button/DefaultPrimaryButton";
import OnTapTextInput from "../../Components/CustomTextInput/OnTapTextInput";
import NewModalLoading from "../../Components/Modal/NewLoadingModal";
import {
  getUpdateProfile,
  setUpdateProfile,
} from "../../Redux/Profile/profileActions";
import Fonts from "../../Theme/Fonts";
import SelectJurusan from "./Component/SelectJurusan";
import SelectJurusanDua from "./Component/SelectJurusanDua";
import SelectUniversitas from "./Component/SelectUniversitas";
import SelectUniversitasDua from "./Component/SelectUniversitasDua";

const PilihProdiScreen = (props) => {
  const navigation = useNavigation();
  const { profile } = props.route.params;
  const dispatch = useDispatch();
  const update = useSelector((state) => state.profileReducer.updateProfile);
  const [showShetUniversitas, setShowShetUniversitas] = useState(false);
  const [showShetUniversitasDua, setShowShetUniversitasDua] = useState(false);
  const [pilihanSatu, setPilihanSatu] = useState({
    universitas: null,
    jurusan: null,
    passing_grade: null,
  });
  const [pilihanDua, setPilihanDua] = useState({
    universitas: null,
    jurusan: null,
    passing_grade: null,
  });
  const [showJurusanDua, setShowJurusanDua] = useState(false);
  const [showShetJurusanDua, setShowShetJurusanDua] = useState(false);
  const [idUniversitasDua, setIdUniversitasDua] = useState(null);
  const [showJurusan, setShowJurusan] = useState(false);
  const [showShetJurusan, setShowShetJurusan] = useState(false);
  const [idUniversitas, setIdUniversitas] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (update.data) {
      navigation.popToTop();
      navigation.navigate("ProfileScreen");
      dispatch(setUpdateProfile({ data: null, loading: false, error: null }));
    }
  }, [update.data]);
  useEffect(() => {
    if (update.data !== null) {
      if (update.loading) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [update.loading]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <DefaultAppBar title="Pilih Prodi" backEnabled={true} />
        <ScrollView>
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              padding: 20,
              backgroundColor: "white",
              elevation: 3,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                ...Fonts.black17Bold,
                alignSelf: "center",
              }}
            >
              Pilihan Satu
            </Text>
            <OnTapTextInput
              value={
                pilihanSatu.universitas
                  ? pilihanSatu.universitas
                  : "--UNIVERSITAS--"
              }
              onTap={() => setShowShetUniversitas(true)}
            />
            {showJurusan && (
              <OnTapTextInput
                value={
                  pilihanSatu.jurusan ? pilihanSatu.jurusan : "--JURUSAN--"
                }
                onTap={() => setShowShetJurusan(true)}
              />
            )}
            {pilihanSatu.passing_grade && (
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginHorizontal: 60,
                }}
              >
                <Text style={{ ...Fonts.black15Bold }}>Passing Grade</Text>
                <Text style={{ ...Fonts.black15Bold }}>
                  {pilihanSatu.passing_grade}
                </Text>
              </View>
            )}
          </View>

          {pilihanSatu.passing_grade && (
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 20,
                padding: 20,
                backgroundColor: "white",
                elevation: 3,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...Fonts.black17Bold,
                  alignSelf: "center",
                }}
              >
                Pilihan Dua
              </Text>
              <OnTapTextInput
                value={
                  pilihanDua.universitas
                    ? pilihanDua.universitas
                    : "--UNIVERSITAS--"
                }
                onTap={() => setShowShetUniversitasDua(true)}
              />
              {showJurusanDua && (
                <OnTapTextInput
                  value={
                    pilihanDua.jurusan ? pilihanDua.jurusan : "--JURUSAN--"
                  }
                  onTap={() => setShowShetJurusanDua(true)}
                />
              )}
              {pilihanDua.passing_grade && (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginHorizontal: 60,
                  }}
                >
                  <Text style={{ ...Fonts.black15Bold }}>Passing Grade</Text>
                  <Text style={{ ...Fonts.black15Bold }}>
                    {pilihanDua.passing_grade}
                  </Text>
                </View>
              )}
            </View>
          )}
          {pilihanDua.passing_grade && (
            <View
              style={{
                marginTop: 20,
                padding: 25,
              }}
            >
              <DefaultPrimaryButton
                text="SIMPAN PILIHAN"
                onPress={() => {
                  Alert.alert(
                    "Peringatan",
                    "Untuk sementara pemilihan prodi tidak dapat di robah. Apakah anda sudah yakin dengan pilihan sekarang ?",
                    [
                      { text: "Cancel", onPress: () => {} },
                      {
                        text: "Yakin",
                        onPress: () => {
                          let program_studi = [pilihanSatu, pilihanDua];
                          let data = { ...profile, program_studi };
                          dispatch(getUpdateProfile(JSON.stringify(data)));
                        },
                      },
                    ]
                  );
                }}
              />
            </View>
          )}
        </ScrollView>

        {showShetUniversitas && (
          <SelectUniversitas
            onClose={() => setShowShetUniversitas(false)}
            onSelect={(val) => {
              setPilihanSatu({ ...pilihanSatu, universitas: val.title });
              setIdUniversitas(val.id);
              setShowShetUniversitas(false);
              setShowJurusan(true);
            }}
          />
        )}
        {showShetJurusan && (
          <SelectJurusan
            idUniversitas={idUniversitas}
            onClose={() => setShowShetJurusan(false)}
            onSelect={(val) => {
              setPilihanSatu({
                ...pilihanSatu,
                jurusan: val.title,
                passing_grade: val.passing_grade,
              });
              setShowShetJurusan(false);
            }}
          />
        )}
        {showShetUniversitasDua && (
          <SelectUniversitasDua
            onClose={() => setShowShetUniversitasDua(false)}
            onSelect={(val) => {
              setPilihanDua({ ...pilihanDua, universitas: val.title });
              setIdUniversitasDua(val.id);
              setShowShetUniversitasDua(false);
              setShowJurusanDua(true);
            }}
          />
        )}
        {showShetJurusanDua && (
          <SelectJurusanDua
            idUniversitas={idUniversitasDua}
            onClose={() => setShowShetJurusanDua(false)}
            onSelect={(val) => {
              setPilihanDua({
                ...pilihanDua,
                jurusan: val.title,
                passing_grade: val.passing_grade,
              });
              setShowShetJurusanDua(false);
            }}
          />
        )}
        <NewModalLoading modalVisible={showModal} />
      </SafeAreaView>
    </>
  );
};

export default PilihProdiScreen;

import { HStack, ScrollView } from "native-base";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import DefaultAppBar from "../../Components/AppBar/DefaultAppBar";
import Fonts from "../../Theme/Fonts";
import { Ionicons } from "@expo/vector-icons";

const LihatProdiScreen = (props) => {
  const { prodi } = props.route.params;
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <DefaultAppBar title="Lihat Prodi" backEnabled={true} />
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <HStack
            space={1}
            style={{
              alignItems: "center",
            }}
          >
            <Ionicons name="information-circle" size={18} color="red" />
            <Text
              style={{
                color: "red",
              }}
            >
              Saat ini pilihan prodi tidak dapat diubah
            </Text>
          </HStack>
        </View>
        <ScrollView
          style={{
            padding: 20,
          }}
        >
          <View
            style={{
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ ...Fonts.orangeColor20Bold }}>Pilihan Satu</Text>
          </View>
          <View>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Universitas
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 10 }}>
              {prodi[0].universitas}
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Jurusan
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 10 }}>
              {prodi[0].jurusan}
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Passing Grade
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 50 }}>
              {prodi[0].passing_grade}
            </Text>
          </View>
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Text style={{ ...Fonts.orangeColor20Bold }}>Pilihan Dua</Text>
          </View>
          <View>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Universitas
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 10 }}>
              {prodi[1].universitas}
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Jurusan
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 10 }}>
              {prodi[1].jurusan}
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginBottom: 5 }}>
              Passing Grade
            </Text>
            <Text style={{ ...Fonts.lightGrayColor21Bold, marginBottom: 50 }}>
              {prodi[1].passing_grade}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LihatProdiScreen;

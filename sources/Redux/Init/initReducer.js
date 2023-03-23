import { urlBase } from "../../Services/ApiUrl";
import { SET_BASEURL, SET_TRANS_IOS } from "./initTypes";

const initialState = {
  baseUrl: urlBase,
  newTransIos: [
    {
      item: {
        _id: "",
        title: "",
        desc: "",
        category: "",
        price: 0,
        price_ios: 0,
        price_discount: 0,
        thumbnail: "",
        details: {
          apple_id: "",
          category: "",
          level: "",
          level_kelas: "",
          tingkat_kelas: "",
          tanggal_rilis_solusi: "2022-01-01 00:00:00",
          tahun_ajaran: "2022/2023",
          hashtag: "#PTS",
          is_anbk: false,
          tanggal_awal: "2022-01-01 00:00:00",
          tanggal_akhir: "2022-01-31 23:59:59",
          is_random: false,
          tanggal_awal_display: "2022-01-01 00:00:00",
          tanggal_akhir_display: "2022-01-23 23:59:59",
        },
        includes: ["61e528689d7f0000e8000fb4"],
        is_active: true,
        purchased: false,
      },
      user_id: "adasdasljdnaksjndka",
    },
  ],
  transIos: [
    {
      item: {
        _id: "",
        title: "",
        desc: "",
        category: "",
        price: 0,
        price_ios: 0,
        price_discount: 0,
        thumbnail: "",
        details: {
          apple_id: "",
          category: "",
          level: "",
          level_kelas: "",
          tingkat_kelas: "",
          tanggal_rilis_solusi: "2022-01-01 00:00:00",
          tahun_ajaran: "2022/2023",
          hashtag: "#PTS",
          is_anbk: false,
          tanggal_awal: "2022-01-01 00:00:00",
          tanggal_akhir: "2022-01-31 23:59:59",
          is_random: false,
          tanggal_awal_display: "2022-01-01 00:00:00",
          tanggal_akhir_display: "2022-01-23 23:59:59",
        },
        includes: ["61e528689d7f0000e8000fb4"],
        is_active: true,
        purchased: false,
      },
      user_id: "adasdasljdnaksjndka",
    },
  ],
};

export function initReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BASEURL:
      return {
        ...state,
        baseUrl: action.payload,
      };
    case SET_TRANS_IOS: {
      return {
        ...state,
        newTransIos: action.payload,
      };
    }
    default:
      return state;
  }
}

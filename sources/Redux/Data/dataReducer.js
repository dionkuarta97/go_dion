import {
  SET_JURUSAN,
  SET_LIST_CITY,
  SET_LIST_GRADES,
  SET_LIST_PROVINCE,
  SET_LIST_SEKOLAH,
  SET_UNIVERSITAS,
} from "./dataTypes";

const initialState = {
  listProvince: {
    loading: false,
    error: null,
    data: null,
  },
  listCity: {
    loading: false,
    error: null,
    data: null,
  },
  listSekolah: {
    loading: false,
    error: null,
    data: null,
  },
  listGrades: {
    loading: false,
    error: null,
    data: null,
  },
  listUniversitas: {
    loading: false,
    error: null,
    data: null,
  },
  listJurusan: {
    loading: false,
    error: null,
    data: null,
  },
};

export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIST_PROVINCE:
      return {
        ...state,
        listProvince: action.payload,
      };
    case SET_LIST_CITY:
      return {
        ...state,
        listCity: action.payload,
      };
    case SET_LIST_SEKOLAH:
      return {
        ...state,
        listSekolah: action.payload,
      };
    case SET_LIST_GRADES:
      return {
        ...state,
        listGrades: action.payload,
      };
    case SET_UNIVERSITAS: {
      return {
        ...state,
        listUniversitas: action.payload,
      };
    }
    case SET_JURUSAN: {
      return {
        ...state,
        listJurusan: action.payload,
      };
    }
    default:
      return state;
  }
}

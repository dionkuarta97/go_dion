import {
  urlCommon,
  urlKelas,
  urlProvinsi,
  urlUniversitas,
  urlWilayah,
} from "../../Services/ApiUrl";
import {
  defaultDoneState,
  defaultErrorState,
  defaultFailedState,
  defaultInitState,
} from "../helper";
import {
  SET_JURUSAN,
  SET_LIST_CITY,
  SET_LIST_GRADES,
  SET_LIST_PROVINCE,
  SET_LIST_SEKOLAH,
  SET_TAHUN_AJARAN,
  SET_UNIVERSITAS,
} from "./dataTypes";

export function setListProvince(state) {
  return {
    type: SET_LIST_PROVINCE,
    payload: state,
  };
}

export function getListProvince() {
  return async (dispatch, getState) => {
    dispatch(setListProvince(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlProvinsi + "?limit=-1")
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setListProvince(defaultDoneState(json.data)));
          } else dispatch(setListProvince(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setListProvince(defaultErrorState));
        });
    } catch (err) {
      dispatch(setListProvince(defaultErrorState));
    }
  };
}

export function setListCity(state) {
  return {
    type: SET_LIST_CITY,
    payload: state,
  };
}

export function getListCity(idprovinsi) {
  const url =
    idprovinsi !== null
      ? urlWilayah + `/${idprovinsi}/kabkota?limit=-1`
      : urlWilayah + "/kabkota?limit=-1";

  return async (dispatch, getState) => {
    dispatch(setListCity(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + url)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setListCity(defaultDoneState(json.data)));
          } else dispatch(setListCity(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setListCity(defaultErrorState));
        });
    } catch (err) {
      dispatch(setListCity(defaultErrorState));
    }
  };
}

export function setListSekolah(state) {
  return {
    type: SET_LIST_SEKOLAH,
    payload: state,
  };
}

export function getListSekolah(idkabkota, kelas) {
  const url =
    idkabkota !== null && kelas !== null
      ? urlCommon + `/sekolah?jenjang=${kelas}&kota_id=${idkabkota}&limit=-1`
      : urlCommon + "/sekolah?limit=20";

  return async (dispatch, getState) => {
    dispatch(setListSekolah(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + url)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setListSekolah(defaultDoneState(json.data)));
          } else dispatch(setListSekolah(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setListSekolah(defaultErrorState));
        });
    } catch (err) {
      dispatch(setListSekolah(defaultErrorState));
    }
  };
}

export function setListGrades(state) {
  return {
    type: SET_LIST_GRADES,
    payload: state,
  };
}

export function getListGrades() {
  return async (dispatch, getState) => {
    dispatch(setListGrades(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      fetch(urlBase + urlKelas)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            dispatch(setListGrades(defaultDoneState(json.data)));
          } else dispatch(setListGrades(defaultFailedState(json.message)));
        })
        .catch((err) => {
          dispatch(setListGrades(defaultErrorState));
        });
    } catch (err) {
      dispatch(setListGrades(defaultErrorState));
    }
  };
}

export const setUniversitas = (payload) => {
  return {
    type: SET_UNIVERSITAS,
    payload,
  };
};

export const getUniversitas = () => {
  return async (dispatch, getState) => {
    dispatch(setUniversitas(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;

      const response = await fetch(urlBase + urlUniversitas);
      const json = await response.json();
      if (json.status) {
        dispatch(setUniversitas(defaultDoneState(json.data)));
      } else {
        dispatch(setUniversitas(defaultFailedState(json.message)));
      }
    } catch (err) {
      dispatch(setUniversitas(defaultErrorState));
    }
  };
};

export const setJurusan = (payload) => {
  return {
    type: SET_JURUSAN,
    payload,
  };
};

export const getJurusan = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setJurusan(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;

      const response = await fetch(
        urlBase + urlUniversitas + "/" + payload + "/jurusan"
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setJurusan(defaultDoneState(json.data)));
      } else {
        dispatch(setJurusan(defaultFailedState(json.message)));
      }
    } catch (err) {
      dispatch(setJurusan(defaultErrorState));
    }
  };
};

export const setTahunAjaran = (payload) => {
  return {
    type: SET_TAHUN_AJARAN,
    payload,
  };
};

export const getTahunAjaran = () => {
  return async (dispatch, getState) => {
    dispatch(setTahunAjaran(defaultInitState));
    try {
      const urlBase = getState().initReducer.baseUrl;
      const response = await fetch(
        urlBase + "/masterdata/v1/master/tahun-ajaran"
      );
      const json = await response.json();
      if (json.status) {
        dispatch(setTahunAjaran(defaultDoneState(json.data)));
      } else {
        dispatch(setTahunAjaran(defaultFailedState(json.message)));
      }
    } catch (err) {
      dispatch(setTahunAjaran(defaultErrorState));
    }
  };
};

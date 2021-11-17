import {
    urlCommon,
    urlKelas,
    urlProvinsi,
    urlWilayah,
} from "../../Services/ApiUrl";
import {
    defaultDoneState,
    defaultErrorState,
    defaultFailedState,
    defaultInitState,
} from "../helper";
import {
    SET_LIST_CITY,
    SET_LIST_GRADES,
    SET_LIST_PROVINCE,
    SET_LIST_SEKOLAH,
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
            fetch(urlProvinsi)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        console.log(json);
                        dispatch(setListProvince(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setListProvince(defaultFailedState(json.message))
                        );
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
            ? urlWilayah + `/${idprovinsi}/kabkota`
            : urlWilayah + "/kabkota";

    console.log(url);
    return async (dispatch, getState) => {
        dispatch(setListCity(defaultInitState));
        try {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        console.log(json);
                        dispatch(setListCity(defaultDoneState(json.data)));
                    } else
                        dispatch(setListCity(defaultFailedState(json.message)));
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

export function getListSekolah(idkabkota) {
    const url =
        idkabkota !== null
            ? urlCommon + `/${idkabkota}/sekolah`
            : urlCommon + "/sekolah";

    console.log(url);
    return async (dispatch, getState) => {
        dispatch(setListSekolah(defaultInitState));
        try {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        console.log(json);
                        dispatch(setListSekolah(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setListSekolah(defaultFailedState(json.message))
                        );
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
            fetch(urlKelas)
                .then((response) => response.json())
                .then((json) => {
                    if (json.status) {
                        console.log(json);
                        dispatch(setListGrades(defaultDoneState(json.data)));
                    } else
                        dispatch(
                            setListGrades(defaultFailedState(json.message))
                        );
                })
                .catch((err) => {
                    dispatch(setListGrades(defaultErrorState));
                });
        } catch (err) {
            dispatch(setListGrades(defaultErrorState));
        }
    };
}
